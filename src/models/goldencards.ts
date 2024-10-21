var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
  
const GoldenCardsSchema = new Schema({
  cardId: { type: Number, required: true },
});

module.exports = mongoose.model(
  "GoldenCards",
  GoldenCardsSchema,
  "goldencards"
);