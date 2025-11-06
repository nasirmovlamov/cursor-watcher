# Cursor Watcher

A Node.js file watcher that monitors changes to a `cursor.lock` file and sends notifications to Telegram when the file content is updated.

## Overview

This tool watches a specified directory for changes to a `cursor.lock` file. When the file is modified with new content, it automatically sends a notification to a Telegram chat with the updated content.

## Features

- 🔍 Monitors a target directory for file changes
- 📝 Watches specifically for `cursor.lock` file updates
- 📱 Sends Telegram notifications when content changes
- 🔄 Tracks content changes to avoid duplicate notifications
- 📂 Automatically creates target directory if it doesn't exist

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- A Telegram Bot Token and Chat ID

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

2. Update the target file and directory paths in `cursor-watcher.js`:

```javascript
const targetFile = "path-of-project-i-want-to-watch/cursor.lock";
const targetDir = "path-of-project-i-want-to-watch/";
```

### Getting Telegram Credentials

1. **Bot Token**:

   - Create a bot by messaging [@BotFather](https://t.me/botfather) on Telegram
   - Use `/newbot` command and follow the instructions
   - Copy the bot token provided

2. **Chat ID**:
   - Start a chat with your bot
   - Send a message to [@userinfobot](https://t.me/userinfobot) to get your chat ID
   - Or use the chat ID from the group/channel where you want to receive notifications

## Usage

Run the watcher:

```bash
npm run watcher
```

Or directly with Node.js:

```bash
node cursor-watcher.js
```

The watcher will:

- Monitor the specified directory for changes
- Detect when `cursor.lock` is modified
- Send a formatted message to Telegram with the file content
- Continue running until stopped (Ctrl+C)

## Project Structure

```
cursor-watcher/
├── cursor-watcher.js      # Main watcher script
├── config.js              # Configuration module for environment variables
├── sendMessageToTelegram.js  # Telegram notification module
├── package.json           # Project dependencies
├── .env                   # Environment variables (create this)
└── README.md              # This file
```

## How It Works

1. The watcher uses Node.js `fs.watch()` to monitor the target directory
2. When a "change" event is detected, it reads the `cursor.lock` file
3. It compares the new content with the previously read content
4. If the content is different and not empty, it sends a notification to Telegram
5. The notification includes the updated content in a formatted message

## Dependencies

- `dotenv` - Loads environment variables from `.env` file
- `node-telegram-bot-api` - Telegram bot API client

## Error Handling

- The watcher gracefully handles errors when reading files
- Telegram send failures are logged but don't stop the watcher
- Missing directories are automatically created

## Notes

- The watcher must be running continuously to monitor file changes
- Empty or whitespace-only content is ignored
- The watcher tracks the last content to avoid duplicate notifications

## License

ISC
