import { Composer, Context, Scenes, } from "telegraf";
require('mongoose').connect("mongodb://localhost:27017/nwscoindev");
var Tasks = require("../models/task");
import { BASE_URL } from '../config';
var Axios = require('axios');
var listCmds = ["/addtask", "/help", "/viewtask", "/edittask", "/deletetask"];

interface MySession extends Scenes.WizardSession {
  // will be available globally under `ctx.session.mySessionProp`
  title:      string;
  category:   string;
  content:    string;
  link:       string;
  pointAward: number;
  coinAward:  number;
  step:       number;
}
interface MyContext extends Context {
  // will be available globally under `ctx.myContextProp`
  myContextProp: string;
  session:       MySession;
  scene:         Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
  wizard:        Scenes.WizardContextWizard<MyContext>;
}

export class DeleteScene {
  // Properties
  private taskId:     number
  private taskInfo:   { title: string; category: string; content: string; link: string; points: number };
  private stepHandler = new Composer<MyContext>();
  private validation  = async () => {return true;}

  // Constructor
  constructor() {
    this.taskId = 0;
    this.taskInfo = {title: "", category: "", content: "", link: "", points: 0};
    this.stepHandler.command('confirm', async ctx => {
      ctx.reply("great! congrate of deleting the task!");
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
      await Axios.delete(`${BASE_URL}/admin/delete/task/${this.taskId}`);
      return true;
    } catch (error) {
      console.error("API call failed:", error);
      return false;
    }
  }

  public getTaskById = async () => {
    const res = await Axios.get(`${BASE_URL}/admin/get-tasks`);
    let tasks = res.data;
    // let task = await Tasks.findOne({ id: this.taskId }); // Ensure 'id' is the correct field
    let task = await tasks.find((item:any)=>item.id == this.taskId);
    if (!task) return false;
    else {
      this.taskInfo.title = task.title;
      this.taskInfo.content = task.content;
      this.taskInfo.link = task.link;
      this.taskInfo.points = task.points;
      return true;
    }
}

  public main = new Scenes.WizardScene<MyContext>("deleteScene",
    async ctx => {
      await ctx.reply(`Step ${ctx.wizard.cursor}. Plz enter Id of the Task:`);
      ctx.wizard.next();
    },
    async ctx => {
      if (ctx.message && 'text' in ctx.message) {
        if(listCmds.includes(ctx.message.text)){ctx.scene.leave();return ctx.reply("If you want to invoke another Command, Please Retry.");}
        this.taskId = Number(ctx.message.text);
      }
      await this.getTaskById();
      await ctx.reply(`<pre>Please Confirm!
Title:         ${this.taskInfo.title}
Content:       ${this.taskInfo.content}
Link:          ${this.taskInfo.link}
Point:         ${this.taskInfo.points}</pre>
      `, {parse_mode: 'HTML'});
      ctx.wizard.next();
      await ctx.reply("If you confirmed deleting the task, Plz enter /confirm to complete deleting task\nIf you want to cancel, Plz enter /cancel");
    },
    this.stepHandler
  );
}
