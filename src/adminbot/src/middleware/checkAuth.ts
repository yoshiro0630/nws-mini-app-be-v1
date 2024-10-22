import { Context, Scenes, session, Telegraf } from "telegraf";
const ALLOWED_ADMINS = [
  6689237945, 
  7916248551
]

async function checkAuth(ctx:Context, next:any) {
  const userId = ctx.from?.id || 0;
  if (ALLOWED_ADMINS.includes(userId)) {
      return next();
  } else {
      ctx.reply('You are not authorized to use this bot.');
  }
}

export default checkAuth;
