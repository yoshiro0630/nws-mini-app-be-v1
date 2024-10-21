import { Request, Response } from 'express';

const BaseDB = require("../models/basedb");

export class AdminCtr {
  private BASEDB: any;
  private getBaseDb = async () => {
    this.BASEDB = await BaseDB.findOne({});
  }

  constructor() {
    this.getBaseDb();
  }

  public getTest = async (req: Request, res: Response) => {
    const user = { message: 'GET adminsCtr successfuly!' };
    res.json(user);
  };
  public updateCards = async (req: Request, res: Response) => {
    const index = Number(req.params.id);
    const newData = req.body;
    try {
      if (isNaN(index) || index < 1) res.status(400).json({ error: "Invalid card ID" });
      if (!this.BASEDB || !this.BASEDB.cards) res.status(500).json({ error: "Database not initialized or cards not found" });
      if (index > this.BASEDB.cards.length) res.status(404).json({ error: "Card not found" });
      this.BASEDB.cards[index - 1] = { id: index, ...newData };
      await this.BASEDB.save();
      res.status(200).json({ success: "Card updated successfully" });
    } catch (error) {
      console.error("Error updating card:", error);
      res.status(500).json({ error: "An error occurred while updating the card" });
    }
  };
  public deleteCard = async (req: Request, res: Response) => {
    let index = Number(req.params.id);
    try {
      if (isNaN(index) || index < 1 || index > this.BASEDB.cards.length) {
        res.status(404).json({ error: "Card not found" });
      }
      this.BASEDB.cards.splice(index - 1, 1);
      await this.BASEDB.save();
      res.status(200).json({ success: "Card Deleted Successfully" });
    } catch (err) {
      res.status(500).json({ error: "An error occurred", details: err });
    }
  };
  public updateTasks = async (req: Request, res: Response) => {
    const index = Number(req.params.id);
    const newData = req.body;
    try {
      if (isNaN(index) || index < 1) res.status(400).json({ error: "Invalid task ID" });
      if (!this.BASEDB || !this.BASEDB.tasks) res.status(500).json({ error: "Database not initialized or tasks not found" });
      if (index > this.BASEDB.tasks.length) res.status(404).json({ error: "Task not found" });
      this.BASEDB.tasks[index - 1] = { id: index, ...newData };
      await this.BASEDB.save();
      res.status(200).json({ success: "Task updated successfully" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "An error occurred while updating the task" });
    }
  };
  public deleteTask = async (req: Request, res: Response) => {
    let index = Number(req.params.id);
    try {
      if (isNaN(index) || index < 1 || index > this.BASEDB.cards.length) {
        res.status(404).json({ error: "Task not found" });
      }
      this.BASEDB.tasks.splice(index - 1, 1);
      await this.BASEDB.save();
      res.status(200).json({ success: "Task Deleted Successfully" });
    } catch (err) {
      res.status(500).json({ error: "An error occurred", details: err });
    }
  };
  public getCards = async (req: Request, res: Response) => {
    try {
      if (!this.BASEDB || !this.BASEDB.cards || this.BASEDB.cards.length === 0) {
        res.status(404).json({ message: "No cards found" });
      }
      res.status(200).json(this.BASEDB.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).json({ error: "An error occurred while fetching cards" });
    }
  };
  public getTasks = async (req: Request, res: Response) => {
    try {
      if (!this.BASEDB || !this.BASEDB.tasks || this.BASEDB.tasks.length === 0) {
        res.status(404).json({ message: "No tasks found" });
      }
      res.status(200).json(this.BASEDB.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "An error occurred while fetching tasks" });
    }
  };
  public getBaseDB = async (req: Request, res: Response) => {
    if (!this.BASEDB) res.status(500).json({ error: "Database not initialized" });
    res.status(200).json(this.BASEDB);
  };
}