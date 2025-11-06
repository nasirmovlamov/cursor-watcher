const TelegramBot = require("node-telegram-bot-api");
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require("./config.js");
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

const sendMessageToTelegram = async (markdown) => {
  await bot.sendMessage(TELEGRAM_CHAT_ID, markdown, {
    parse_mode: "Markdown",
  });
};

module.exports = { sendMessageToTelegram };
