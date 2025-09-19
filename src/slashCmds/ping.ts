import { PERMISSION_LEVELS } from 'configs';
import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import type { SlashCmd } from 'types';

export const run: SlashCmd['run'] = async (client, interaction: ChatInputCommandInteraction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log('interaction', interaction);

  await interaction.deferReply();
  const reply = await interaction.editReply('Ping?');
  await interaction.editReply(
    `Poing! Latency is ${
      reply.createdTimestamp - interaction.createdTimestamp
    }ms. API Latency is ${Math.round(client.ws.ping)}ms.`
  );
};

export const data: SlashCmd['data'] = {
  name: 'ping',
  description: 'Pongs when pinged',
  options: [
    {
      name: 'channel',
      description: 'Pings the bot',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
};

export const conf: SlashCmd['conf'] = {
  permLevel: PERMISSION_LEVELS.User,
  guildOnly: false,
};
