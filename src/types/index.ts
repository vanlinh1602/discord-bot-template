import { PERMISSION_LEVELS } from 'configs';
import type {
  ApplicationCommandData,
  ChatInputCommandInteraction,
  Client,
  Message,
} from 'discord.js';
import type { Settings } from 'models';

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
    permLevel: string;
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
