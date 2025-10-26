import { Client, Events } from 'discord.js';
import type { EventConfig } from 'types';

type Event = EventConfig<Events.ClientReady>;

export const conf: Event['conf'] = {
  key: Events.ClientReady,
  enabled: true,
};

export const handler: Event['handler'] = (client: Client) => {
  Logger.info(`Ready! Logged in as ${client.user?.tag}`);
};
