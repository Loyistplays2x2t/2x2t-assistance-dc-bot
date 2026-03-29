/**
 * Status command module.
 * Fetches and displays a detailed status overview of the Minecraft server.
 *
 * @module commands/status
 */

const { SlashCommandBuilder } = require('discord.js');
const { getServerStatus, getUptime } = require('../utils/mcServer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Displays a detailed live overview of the Minecraft server status.'),
  /**
   * Executes the /status command.
   *
   * @param {import('discord.js').ChatInputCommandInteraction} interaction - The interaction object.
   */
  async execute(interaction) {
    await interaction.deferReply();

    const ip = process.env.SERVER_IP || '159.195.69.206';
    const port = parseInt(process.env.SERVER_PORT || '25565', 10);

    const status = await getServerStatus(ip, port);
    const uptime = getUptime();

    if (!status || !status.online) {
      return interaction.editReply('🔴 Server is offline or unreachable.');
    }

    const playersCount = `${status.players}/${status.maxPlayers}`;
    const playerNames = status.sample.length > 0
      ? `👥 ${status.sample.map(p => p.name).join(', ')}`
      : '👥 No players online';

    const motd = status.motd && status.motd.clean ? status.motd.clean : 'No MOTD available';

    const statusMessage = `📊 Server Status
🟢 **Players:** ${playersCount}
${playerNames}

📝 **MOTD:** ${motd}
⏱ **Uptime:** ${uptime}`;

    await interaction.editReply(statusMessage);
  },
};
