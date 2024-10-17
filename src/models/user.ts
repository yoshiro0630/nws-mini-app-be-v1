var mongoose   = require("mongoose"),
    Schema     = mongoose.Schema;
var UserSchema = new Schema(
  {
    tgId: { type: String, required: [true, "Insert Tg Id."], },
    userName:  { type: String, default: "", },
    firstName: { type: String, default: "", },
    lastName:  { type: String, default: "", },
    points:{
      total:   { type: Number, default: 0.00, },
      current: { type: Number, default: 0.00, },
      hourInc: { type: Number, default: 0, },
      curUpdatedAt: { type: Date, default: Date.now(), },
      rank:    { type: Number, default: 99, },
    },
    curCoin: { type: Number, default: 0.00, },
    rewards: { 
      cards: { type: Number, default: 0.00, },
      tasks: { type: Number, default: 0.00, },
      daily: { type: Number, default: 0.00, },
    },
    energy: {
      maxLvl:       { type: Number, default: 0, },
      secondIncLvl: { type: Number, default: 0, },
      tap2PointLvl: { type: Number, default: 0, },
      curEnergy:    { type: Number, default: 600, },
      curEnergyUpdatedAt: { type: Date, default: Date.now(), },
    },
    dailyData: { 
      cardChance: { type: Number, default: 3 },
      boostCount: { type: Number, default: 3 },
      dayCount:   { type: Number, default: 0 },
      isDayCountEnable:   { type: Boolean, default: true },
    },  // daily updated automatically
    lastLogin: { type: Date, default: Date.now(), },
    inviteLink: { type: String, default: "", },
    isInvited: { type: Boolean, default: false },
    friends: [{ type: String, required: true }],
    tasks: [{ type: Number, required: true }],
    cards: [{ type: Number, default: 0 }], // card level
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "User",
  UserSchema,
  "users"
);