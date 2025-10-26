import { Channel } from 'models/channel';
import { Settings } from 'models/settings';

Settings.hasMany(Channel, {
  foreignKey: 'guildId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
