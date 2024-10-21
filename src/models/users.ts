var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
    tgId: { type: String, required: [true, "Insert Tg Id."], },
    username: { type: String, default: "", },
    firstname: { type: String, default: "", },
    lastname: { type: String, default: "", },
    points: {
      total: { type: Number, default: 0.00, },
      current: { type: Number, default: 0.00, },
      hour: { type: Number, default: 0, },
    },
    coins: { type: Number, default: 0.00, },
    rewards: {
      cards: { type: Number, default: 0.00, },
      tasks: { type: Number, default: 0.00, },
      daily: { type: Number, default: 0.00, },
    },
    energy: {
      max: { type: Number, default: 0, },
      current: { type: Number, default: 200, },
      regen: { type: Number, default: 0, },
      tap: { type: Number, default: 0, },
    },
    dailydb: {
      goldencards: { type: Number, default: 3 },
      fullbooster: { type: Number, default: 3 },
      curdaycount: { type: Number, default: 0 },
      enabledaycount: { type: Boolean, default: true },
    },  // daily updated automatically
    timemanager: {
      lastLogin: { type: Date, default: Date.now(), },
      points: { type: Date, default: Date.now(), },
      energy: { type: Date, default: Date.now(), },
    },
    invitelink: { type: String, default: "", },
    isinvited: { type: Boolean, default: false },
    acctasks: {
      nodewave: { type: Boolean, default: false },
      tweeter: { type: Boolean, default: false },
      instagram: { type: Boolean, default: false },
    },
    rank: { 
      points: { type: Number, default: 99 },
      invites: { type: Number, default: 99 },
     },
    friends: [{ type: String, required: true }],
    tasks: [{ type: Number, required: true }],
    cards: [{ type: Number, default: 0 }],
  }
);

module.exports = mongoose.model(
  "User",
  UserSchema,
  "users"
);