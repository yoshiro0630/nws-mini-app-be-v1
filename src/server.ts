import app from './app';
import bot from './bot';
import { PORT, DB } from './config';
const BaseDB = require("./models/basedb");
const GoldenCards = require("./models/goldencards");
const Constants = require("./config/constants");

require("mongoose").connect(DB)
  .then(() => {
    console.log("MongoDB Connected!");
    initDB();
  })

bot.launch()
  .then(() => console.log('Bot started'))
  .catch((err:any) => console.error('Error starting bot:', err));

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

async function initDB() {
  try {
    let basedb = await BaseDB.findOne({});
    let goldencards = await GoldenCards.findOne({});
    if(!basedb) {
      const db = new BaseDB(Constants.basedb);
      await db.save().then(console.log("📘: BaseDB registered"));
    } else { console.log("✅: BaseDB already exists!"); }
    if(!goldencards) {
      let myCards = [
        { id: 0, cardId: 6 },
        { id: 1, cardId: 3 },
        { id: 2, cardId: 9 },
      ];
      myCards.map(async (card: Object) => {
        await new GoldenCards(card).save();
      });
      console.log("📘: GoldenCards registered");
    } else { console.log("✅: GoldenCards already exists!"); }

  } catch (err) {
    console.log( "🥶: Error ensuring default Setting", err );
  }
}