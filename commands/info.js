/**
 * Info command module.
 * Provides static information about the server specifications.
 *
 * @module commands/info
 */

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays information about the 2x2t server.'),
  /**
   * Executes the /info command.
   *
   * @param {import('discord.js').ChatInputCommandInteraction} interaction - The interaction object.
   */
  async execute(interaction) {
    const infoMessage = `
# ℹ️ Server Information
- **IP:** 2x2t.org
- **Version:** 1.21.8
- **Platform:** Folia
- **Supported Versions:** 1.7.10 - 1.21.11
- **Server Specs:** AMD EPYC 9845 16C, 32GB DDR5 RAM, 1TB NVME SSD
- **Website:** https://2x2t.org
    `;
    await interaction.reply({ content: infoMessage });
  },
};
