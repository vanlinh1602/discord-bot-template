import { Client, Events } from 'discord.js';
import type { EventConfig } from 'types';

type Event = EventConfig<Events.Error>;

export const conf: Event['conf'] = {
  key: Events.Error,
  enabled: true,
};

// Emitted when the client encounters an error.
export const handler: Event['handler'] = (client: Client, error: Error) => {
  Logger.error(`${error.name}: ${error.message}`);
};
