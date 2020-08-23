
import discord from "discord.js";
import mongoose from "mongoose";

// The highest value we can get for random number generation
let high: number = 0;

// TODO - move these to a model
// Type for Egotisms
interface IEgotism {
  saying: string,
  low: number,
  high: number
}

// Schema for accessing egotism
const egotismSchema = new mongoose.Schema({
  saying: String,
  low: Number,
  high: Number
});

const egotism = mongoose.model('egotism', egotismSchema);

/**
 * Initializes ego commands for the given bot
 * @param bot The bot Ego is initialized for
 */
export default async function initializeEgo(bot: discord.Client) {
  const prefix = '!';
  reloadEgo()
  bot.on('message', async (msg: discord.Message) => {
    //if our message doesnt start with our defined prefix, dont go any further into function
    if(!msg.content.startsWith(prefix)) {
      return
    }
    
    //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
    const args = msg.content.slice(prefix.length).trim().split(' ')
    
    //splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase()

    switch(command) {
      case "ego":
        ego(msg);
        break;
    }
  });
}

/**
 * Reloads cached information
 */
export function reloadEgo() {
  egotism.findOne({}).sort({high: -1}).exec((_, res: IEgotism) => {
    high = res.high;
  })
}

/**
 * Finds a random ego message and replies to the given message
 * @param msg The message containing the command
 */
function ego(msg: discord.Message) {
  const value = Math.floor(Math.random() * (high + 1));
  egotism.findOne({
    low: {$lte: value},
    high: {$gt: value},
  })
  .exec((_, res: IEgotism) => {
    msg.reply(res.saying);
  })
  msg.react("😀")
}