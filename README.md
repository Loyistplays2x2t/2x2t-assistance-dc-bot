# 2x2t Assistance Discord Bot

A fully modularized, robust Node.js Discord bot designed to provide real-time status, player lists, and general information about the **2x2t Minecraft Server**.

## Features

- **Real-Time Polling**: Connects to the Minecraft server to query live player counts and online states without maintaining heavy TCP streams.
- **Smart Logging**: Custom logger (`utils/logger.js`) ensures errors and warnings are formatted properly, preventing log spamming during downtime or timeout phases.
- **Modular Architecture**: Commands (`/info`, `/playerlist`, `/status`) and event listeners (`ready`, `interactionCreate`) are neatly separated into individual modules for high scalability.
- **Graceful Error Handling**: Automatically suppresses connection spam when the Minecraft server restarts or drops offline, ensuring clean console output and robust uptime calculations.

## Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **NPM**
- A **Discord Bot Token** and its **Client ID**.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DeanBeanBEER-WARE/2x2t-discord-bot.git
   cd 2x2t-discord-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename the `.env.example` to `.env` and fill in your confidential Discord API details alongside the target Minecraft Server parameters:
   ```env
   TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   SERVER_IP=159.195.69.206
   SERVER_PORT=25565
   ```

## Usage

### Deploying Slash Commands
Before running the bot for the first time or when you add new commands, you need to register the slash commands to your Discord Guild:
```bash
node deploy-commands.js
```

### Starting the Bot
Run the following command to start the bot. It will automatically load the configured events and commands, then connect to Discord.
```bash
node index.js
```

## Available Commands

- `/info` - Displays static information about the 2x2t server specifications.
- `/playerlist` - Shows a detailed list of currently online players on the server.
- `/status` - Presents an overview including live MOTD, uptime, and player count.

## Project Structure

```
├── .env                  # Environment configurations (ignored in git)
├── .gitignore            # Ignored files, including sensitive agents & data
├── package.json          # Node project dependencies
├── index.js              # Main entry point for the bot
├── deploy-commands.js    # Script to register slash commands to Discord
├── commands/             # Individual slash command logic
│   ├── info.js
│   ├── playerlist.js
│   └── status.js
├── events/               # Event handlers logic
│   ├── ready.js
│   └── interactionCreate.js
└── utils/                # Reusable utilities
    ├── logger.js         # Custom console logger
    └── mcServer.js       # Minecraft server polling module
```

## Security Notice

Please ensure that `.env` is never committed to a public repository, as it contains sensitive Discord Bot credentials.

---
*Developed for the 2x2t community.*
