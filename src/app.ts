import { Request, Response } from 'express';
import apiRoutes from './routes/apiRoutes';
import adminRoutes from './routes/adminRoutes';

var express     = require("express");
var morgan      = require("morgan");
var cors        = require("cors");
var cron = require("node-cron");
const User = require("./models/users");
const GoldenCards = require("./models/goldencards");

cron.schedule('2 8 * * *', async () => {// 24hr
  try {
    const goldencards = await GoldenCards.find({});
    const uniqueCardIds = new Set();
    while (uniqueCardIds.size < goldencards.length) {
      uniqueCardIds.add(Math.floor(Math.random() * 21));
    }
    await Promise.all(goldencards.map((card:any, index:any) => {
      // GoldenCards.updateOne({ _id: card._id }, { cardId: Array.from(uniqueCardIds)[index] });
      card.cardId = Array.from(uniqueCardIds)[index];
      card.save();
    }));
    console.log(uniqueCardIds)
    const users = await User.find({});
    users.map(async (user: any) => {
      if (user.dailydb.enabledaycount) {
        user.dailydb = {
          goldencards: 3,
          fullbooster: 3,
          curdaycount: 0,
          enabledaycount: true,
        }
      } else {
        user.dailydb.goldencards = 3;
        user.dailydb.fullbooster = 3;
        user.dailydb.enabledaycount = true;
      }
      await user.save();
    });
    const now = new Date(); // Create a new Date object
    console.log("updated all users' dailyData successfuly");
    console.log(`Updated cardIds at ${now.getHours()}h:${now.getMinutes()}m:${now.getSeconds()}s`);
  } catch (error) {
    console.error('Error:', error);
  }
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
// Routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.all(/.*/, (req:Request, res:Response) => {
  res.status(404).json({error: "Invalid Endpoint."});
});

export default app;
