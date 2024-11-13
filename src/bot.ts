import { Telegraf, Context, Markup } from 'telegraf';
import { BOT_TOKEN, WEB_APP_URL } from './config';

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx:Context) => {
  const imageUrl = 'https://nodewaves.com/images/nws-token-banner.png'; // Replace with your image URL
  const description = 
  'NodeWaves — Play to get NWS rewards.\n' +
  '🦸‍♂️Get $NWS for every friend you refer and every day you login.\n' +
  "⬆️$NWS is already listed on MEXC and QuickSwap.\n"+
  "💰200M NWS Reward pool won't last long!\n"+
  "Are you ready to become the member of top notch WEB 3 community?\n"+
  "Click 🎮 “Play” button to start your journey!\n";

  const keyboard = Markup.inlineKeyboard([
    [{text: "🎮 Play", web_app: { url: WEB_APP_URL || "" }}],
  ]);

  ctx.replyWithPhoto(imageUrl, {
    caption: `${description}`,
    reply_markup: keyboard.reply_markup,
  });
});

console.log("TelegramBot Ready!");
export default bot;