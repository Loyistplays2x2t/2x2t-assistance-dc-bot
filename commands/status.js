/**
 * Status command module.
 * Fetches and displays a detailed status overview of the Minecraft server.
 *
 * @module commands/status
 */

const { SlashCommandBuilder } = require('discord.js');
const { getServerStatus, getUptime } = require('../utils/mcServer');

function stripMotdPrefix(motd) {
  if (typeof motd !== 'string') return motd;
  return motd.replace(/^\s*2X2T\s*/i, '').trim();
}

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
      ? `**👥 Online Players:** ${status.sample.map(p => p.name).join(', ')}`
      : '**👥 Online Players:** No players online';

    let motd = 'No MOTD available';
    if (status.motd) {
      if (typeof status.motd === 'string') {
        motd = stripMotdPrefix(status.motd);
      } else if (status.motd.clean) {
        motd = stripMotdPrefix(status.motd.clean);
      } else if (status.motd.raw) {
        // Strip out Minecraft color codes (e.g. §c, §l) from raw string if clean isn't available
        motd = stripMotdPrefix(status.motd.raw.replace(/§[0-9a-fk-or]/g, '').trim());
      }
    }

    const statusMessage = `📊 Server Status
**🟢 Players:** ${playersCount}
${playerNames}

**📝 MOTD:** ${motd}
**⏱️ Uptime:** ${uptime}`;

    await interaction.editReply(statusMessage);
  },
};
