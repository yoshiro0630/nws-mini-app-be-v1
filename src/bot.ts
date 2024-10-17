import { Telegraf, Context, Markup } from 'telegraf';
import { BOT_TOKEN, WEB_APP_URL, BOT_CERTIFICATION } from './config';
const Cmds = require('./commands');
console.log("Commands:\n",Cmds);

const bot = new Telegraf(BOT_TOKEN);

bot.use(async (ctx: Context, next) => {
  console.time(`Processing update ${ctx.update.update_id}`);
  ctx.state.userData = {};
  await next() // runs next middleware
  // runs after next middleware finishes
  console.timeEnd(`Processing update ${ctx.update.update_id}`);
});

// The /start Command handlers
bot.start(( ctx: Context )=>{
  // Send an Image
  const IMG_URL = "https://nodewaves.com/images/nws-token-banner.png";
  const DESCRIPTION = 
    'NWSCoin — Play to to get $NWS and NWSChain rewards.\n' +
    'Get $NWS for every friend you refer and every day you login, and extra rewards on NWSChain.\n' +
    "$NWS is already listed on 40+ exchanges. 4M NWS Reward pool won't last long!.\n" +
    'Choose an option below:';
  const KEYBOARD = Markup.inlineKeyboard([
    [{text: "🎮 Play", web_app: { url: `${WEB_APP_URL}` }}, Markup.button.callback('📝 Chat', 'chat')],
    [Markup.button.callback('👥Community', 'community'), Markup.button.callback('🤔How to get more $NWS?', 'earn')],
    [Markup.button.callback('Invite friends', 'friends')],
  ]);
  ctx.replyWithPhoto(IMG_URL, {
    caption: `${DESCRIPTION}\n`,
    reply_markup: KEYBOARD.reply_markup,
  });
});

// Command handlers
bot.command('start', Cmds.start);
bot.command('viewtask', Cmds.viewTask);
bot.command('addtask', Cmds.addTask);
bot.command('deltask', Cmds.removeTask);
bot.command('help', Cmds.help);
bot.command('test', (ctx) => {
  ctx.reply('Plz enter title');
  bot.on('text', (ctx) => {
      const title = ctx.message.text;
      ctx.reply('Plz enter content');
      bot.on('text', (ctx) => {
        ctx.reply('Article created successfully!');
        const content = ctx.message.text;
        return;
      });
  });
});

console.log("TelegramBot Ready!");
export default bot;
