/**
 * Main entry point for the 2x2t Assistance Discord Bot.
 * Loads configuration, sets up commands and events, and logs into Discord.
 *
 * @module index
 */

require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const logger = require('./utils/logger');

// Initialize a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Setup a collection for commands
client.commands = new Collection();

// Dynamically load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    logger.info(`Loaded command: ${command.data.name}`);
  } else {
    logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Dynamically load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  logger.info(`Loaded event: ${event.name}`);
}

// Global unhandled rejection handler to prevent crashes
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
});

// Login to Discord with the token
if (!process.env.TOKEN) {
  logger.error('No DISCORD_TOKEN found in .env file!');
  process.exit(1);
}

client.login(process.env.TOKEN).catch(err => {
  logger.error('Failed to log in to Discord', err);
});
