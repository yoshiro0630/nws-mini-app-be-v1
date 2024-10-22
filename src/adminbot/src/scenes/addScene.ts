import { Composer, Context, Scenes, } from "telegraf";
require('mongoose').connect("mongodb://localhost:27017/nwscoindev");
import { BASE_URL } from '../config';
var Axios = require('axios');
var listCmds = ["/addtask", "/help", "/viewtask", "/edittask", "/deletetask"];

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

export class AddScene {
  // Properties
  private taskId: string
  private taskInfo: { title: string; content: string; link: string; points: number };
  private stepHandler = new Composer<MyContext>();
  private validation = async () => {return true;}

  // Constructor
  constructor() {
    this.taskId = "";
    this.taskInfo = {title: "", content: "", link: "", points: 0};
    this.stepHandler.command('confirm', async ctx => {
      ctx.reply("great! congrate of adding new task!");
      this.invokeAPI();
      return ctx.scene.leave();
    });
    this.stepHandler.command('cancel', async ctx => {
      return ctx.scene.leave();
    });
  }

  // Method
  public invokeAPI = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/admin/get-tasks`);
      let tasks = res.data;
      await Axios.put(`${BASE_URL}/admin/update/tasks/${tasks.length+1}`, this.taskInfo);
      return true;
    } catch (error) {
      console.error("API call failed:");
      return false;
    }
  }

  public main = new Scenes.WizardScene<MyContext>("addScene",
    async ctx => {
      await ctx.reply(`Step ${ctx.wizard.cursor}. Plz enter Title of the Task:`);
      ctx.wizard.next();
    },
    async ctx => {
      if (ctx.message && 'text' in ctx.message) {
        if(listCmds.includes(ctx.message.text)){ctx.scene.leave();return ctx.reply("If you want to invoke another Command, Please Retry.");}
        this.taskInfo.title = ctx.message.text;
      }
      await ctx.reply(`Step ${ctx.wizard.cursor}. Plz enter the Content of the Task:`);
      ctx.wizard.next();
    },
    async ctx => {
      if (ctx.message && 'text' in ctx.message) {
        if(listCmds.includes(ctx.message.text)){ctx.scene.leave();return ctx.reply("If you want to invoke another Command, Please Retry.");}
        this.taskInfo.content = ctx.message.text;
      }
      await ctx.reply(`Step ${ctx.wizard.cursor}. Plz enter the Link of the Task:`);
      ctx.wizard.next();
    },
    async ctx => {
      if (ctx.message && 'text' in ctx.message) {
        if(listCmds.includes(ctx.message.text)){ctx.scene.leave();return ctx.reply("If you want to invoke another Command, Please Retry.");}
        this.taskInfo.link = ctx.message.text;
      }
      await ctx.reply(`Step ${ctx.wizard.cursor}. Plz enter the Points of the Task:`);
      ctx.wizard.next();
    },
    async ctx => {
      if (ctx.message && 'text' in ctx.message) {
        if(listCmds.includes(ctx.message.text)){ctx.scene.leave();return ctx.reply("If you want to invoke another Command, Please Retry.");}
        this.taskInfo.points = Number(ctx.message.text);
      }
      await ctx.reply(`<pre>Please Confirm!
Title:         ${this.taskInfo.title}
Content:       ${this.taskInfo.content}
Link:          ${this.taskInfo.link}
Points:        ${this.taskInfo.points}</pre>
      `, {parse_mode: 'HTML'});
      ctx.wizard.next();
      await ctx.reply("If you confirmed all data for new task, Plz enter /confirm to complete add task\nIf you want to cancel, Plz enter /cancel");
    },
    this.stepHandler
  );
}
