import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

const getData = async () => {
  const res = await axios.get("https://simplon-msg.herokuapp.com/api/user");
  return res.data;
};

// replace the value below with the Telegram token you receive from @BotFather
const token = "5502724351:AAEbNhOBCeO8WVYvclfs1GuDnVUWfJVKZc0";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;
  const text = msg.text;
  if (text === "/start") {
    bot.sendMessage(
      chatId,
      "Bonjour " +
        name +
        "! Je suis le bot du syteme de payment awa creer par Aphro."
    );
  }
  if (text === "/users") {
    getData().then((data) => {
      const msg = data.data
        .map((user) => {
          return user.nom + " " + user.prenom;
        })
        .join("\n");
      console.log(msg);
      bot.sendMessage(chatId, msg);
    });
  }
});
