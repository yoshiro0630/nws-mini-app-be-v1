var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const BaseDBSchema = new Schema({
  test: { type: String, default: "hello" },
  rewards: {
    dayCounts: [{ value: { type: Number, default: 1000 } }],
    friends: [{
      count: { type: Number, default: 1 },
      value: { type: Number, default: 10000 }
    }]
  },
  energy: {
    max: [{
      value: { type: Number, default: 500 },
      cost: { type: Number, default: 1000 },
    }],
    regen: [{
      value: { type: Number, default: 1 },
      cost: { type: Number, default: 1000 },
    }],
    tap: [{
      value: { type: Number, default: 1 },
      cost: { type: Number, default: 1000 },
    }],
  },
  cards: [{
    id: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    info: [{
      lvl: { type: Number, required: true },
      hourlyIncome: { type: Number, default: 0 },
      nextLvlCost: { type: Number, default: 1000 },
    }],
  }],
  tasks: [{
    id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    points: { type: Number, default: 5000 },
  }]
});

module.exports = mongoose.model("BaseDB", BaseDBSchema, "basedb");