import { INTENTS, PARTIALS } from 'configs';
import { Client, Collection } from 'discord.js';
import { glob } from 'glob';
import path from 'path';
import setupDatabase from 'services/database';
import setupLogger from 'services/logger';
import type { Command, SlashCmd } from 'types';

require('dotenv-flow').config();

global.Logger = setupLogger();
global.Database = setupDatabase();

// Aliases, commands and slash commands are put in collections where they can be read from,
// catalogued, listed, etc. To reduce client pollution we'll create a single container property
// that we can attach everything we need to.
global.Container = {
  commands: new Collection<string, Command>(),
  slashcmds: new Collection<string, SlashCmd>(),
  aliases: new Collection<string, string>(),
};

const client = new Client({
  intents: INTENTS,
  partials: PARTIALS,
});

(async () => {
  await Database.authenticate();
  await import('models');
  await Database.sync();
  Logger.info('Database connected successfully');

  // Here we load **commands** into memory, as a collection, so they're accessible here and everywhere else.
  await Promise.all(
    glob.sync(`${__dirname}/commands/**/*.ts`).map(async (file: string) => {
      const command: Command = await import(file.replace(__dirname, '.'));
      Logger.info(`Loading Command: ${command.help.name}`);
      Container.commands.set(command.help.name, command);
    })
  );

  // Now we load any **slash** commands you may have in the ./slashCmds directory.
  await Promise.all(
    glob.sync(`${__dirname}/slashCmds/**/*.ts`).map(async (file: string) => {
      const command: SlashCmd = await import(file.replace(__dirname, '.'));
      Logger.info(`Loading Slash Command: ${command.data.name}`);
      Container.slashcmds.set(command.data.name, command);
    })
  );

  // Then we load events, which will include our message and ready event.
  await Promise.all(
    glob.sync(`${__dirname}/events/**/*.ts`).map(async (file: string) => {
      const eventName = path.basename(file, '.ts');
      Logger.info(`Loading Event: ${eventName}`);

      const { handler } = await import(file.replace(__dirname, '.'));
      // Bind the client to any event, before the existing arguments provided by the discord.js event.
      client.on(eventName, handler.bind(null, client));
    })
  );

  client.login(process.env.BOT_TOKEN);
})();

process.on('SIGTERM', async () => {
  client.destroy();
  await Database.close();
});
process.on('SIGINT', async () => {
  client.destroy();
  await Database.close();
});
process.on('SIGQUIT', async () => {
  client.destroy();
  await Database.close();
});
process.once('SIGUSR2', async () => {
  client.destroy();
  await Database.close();
});
