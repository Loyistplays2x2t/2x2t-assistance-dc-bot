/**
 * Playerlist command module.
 * Fetches and displays the currently online players on the Minecraft server.
 *
 * @module commands/playerlist
 */

const { SlashCommandBuilder } = require('discord.js');
const { getServerStatus } = require('../utils/mcServer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playerlist')
    .setDescription('Displays the currently connected players on the Minecraft server.'),
  /**
   * Executes the /playerlist command.
   *
   * @param {import('discord.js').ChatInputCommandInteraction} interaction - The interaction object.
   */
  async execute(interaction) {
    await interaction.deferReply();

    const ip = process.env.SERVER_IP || '159.195.69.206';
    const port = parseInt(process.env.SERVER_PORT || '25565', 10);

    const status = await getServerStatus(ip, port);

    if (!status || !status.online) {
      return interaction.editReply('🔴 Server is offline or unreachable.');
    }

    const playersCount = `${status.players}/${status.maxPlayers}`;
    const playerNames = status.sample.length > 0
      ? `**👥 Online Players:** ${status.sample.map(p => p.name).join(', ')}`
      : '**👥 Online Players:** No players online';

    const replyMessage = `**🟢 Players:** ${playersCount}\n${playerNames}`;
    await interaction.editReply(replyMessage);
  },
};
