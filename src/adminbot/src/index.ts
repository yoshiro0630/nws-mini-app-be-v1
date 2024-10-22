import { Context, Scenes, session, Telegraf } from "telegraf";
import { BOT_TOKEN } from './config';
import { AddScene } from "./scenes/addScene";
import { EditScene } from "./scenes/editScene";
import { DeleteScene } from "./scenes/deleteScene";
import { ViewScene } from "./scenes/viewScene";
import checkAuth from "./middleware/checkAuth";
require('mongoose').connect("mongodb://localhost:27017/nwscoindev");

interface MySession extends Scenes.WizardSession {
  // will be available globally under `ctx.session.mySessionProp`
  title: string;
  category: string;
  content: string;
  link: string;
  pointAward: number;
  coinAward: number;
  step: number;
}
interface MyContext extends Context {
  // will be available globally under `ctx.myContextProp`
  myContextProp: string;
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
  wizard: Scenes.WizardContextWizard<MyContext>;
}

const addTask = new AddScene();
const editTask = new EditScene();
const deleteTask = new DeleteScene();
const viewTask = new ViewScene();

const stage = new Scenes.Stage<MyContext>([addTask.main, editTask.main, deleteTask.main, viewTask.main]);
const bot = new Telegraf<MyContext>(BOT_TOKEN);

bot.use(session());
bot.use(stage.middleware());
bot.use(checkAuth);

bot.start(async (ctx) => {
  ctx.reply('Here are all Commands you can use\n- /addtask: Admin can add new Task with this Command\n- /edittask: Admin can edit Task with Id\n- /deletetask: Admin can delete any Task by Id using this Command\n- /viewtask: Admin can see all Tasks with this Command');
  console.log(ctx.message.chat)
});

bot.command("addtask", async (ctx) => await ctx.scene.enter("addScene"));
bot.command("edittask", async (ctx) => await ctx.scene.enter("editScene"));
bot.command("deletetask", async (ctx) => await ctx.scene.enter("deleteScene"));
bot.command("viewtask", async (ctx) => await ctx.scene.enter("viewScene"));

bot.launch();