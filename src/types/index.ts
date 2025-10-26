import { PERMISSION_LEVELS } from 'configs';
import type {
  ApplicationCommandData,
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  Message,
} from 'discord.js';
import type { Settings } from 'models';

export type EventConfig<Event extends keyof ClientEvents> = {
  conf: {
    key: Event;
    enabled: boolean;
  };
  handler: (client: Client, ...args: ClientEvents[Event]) => Promise<void> | void;
};

export type SlashCmd = {
  conf: {
    permLevel: PERMISSION_LEVELS;
    guildOnly: boolean;
  };
  data: ApplicationCommandData;
  run: (
    client: Client,
    interaction: ChatInputCommandInteraction,
    options: { settings?: Settings | null }
  ) => Promise<void>;
};

export type Command = {
  conf: {
    enabled: boolean;
    guildOnly: boolean;
    aliases: string[];
    permLevel: PERMISSION_LEVELS;
  };
  help: {
    name: string;
    category: string;
    description: string;
    usage: string;
  };
  run: (
    client: Client,
    message: Message,
    args: string[],
    level: number,
    options: { settings?: Settings | null; flags?: string[] }
  ) => Promise<void>;
};

export type InteractionHandler<T extends BaseInteraction> = {
  conf: {
    permLevel: PERMISSION_LEVELS;
    guildOnly: boolean;
  };
  run: (client: Client, interaction: T) => Promise<void>;
};
