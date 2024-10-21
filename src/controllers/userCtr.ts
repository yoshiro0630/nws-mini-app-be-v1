import { Request, response, Response } from 'express';
import Web3 from 'web3';

const { v4: uuidv4 } = require('uuid');
const BaseDB = require("../models/basedb");
const User = require("../models/users");
const GoldenCards = require("../models/goldencards");
const Constants = require("../config/constants");
// var cron = require("node-cron");

import { Telegraf } from 'telegraf';
import { BOT_TOKEN, PRIVATE_KEY, FROM_ADDRESS, TO_ADDRESS, AMOUNT } from '../config';

const bot = new Telegraf(BOT_TOKEN);

// cron.schedule('0 0 * * *', async () => {// 24hr
//   try {
//     const users = await User.find({});
//     users.map((user: any) => {
//       if(user.dailyData.isDayCountEnable){
//         user.dailyData = {
//           cardChance: 3,
//           boostCount: 3,
//           dayCount: 0,
//           isDayCountEnable: true,
//         }
//       } else {
//         user.dailyData.cardChance = 3;
//         user.dailyData.boostCount = 3;
//         user.dailyData.isDayCountEnable = true;
//       }
//     });
//     console.log("updated all users' dailyData successfuly");
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });
export class UserCtr {
  private BASEDB: any;
  private getBaseDb = async () => {
    this.BASEDB = await BaseDB.findOne({});
  }

  constructor() {
    this.getBaseDb();
  }

  public getTest = async (req: Request, res: Response) => {
    const user = { message: 'GET userCtr successfuly!' };
    res.json(user);
  };
  public getUser = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const { userName, firstName, lastName, start_param } = req.body;
    try {
      const user = await User.findOne({ tgId: tgId });
      if (user) {
        user.timemanager.lastLogin = Date.now();
        user.save();
        // bot.telegram.sendMessage(tgId,"You launched MiniApp RIght now");
        res.status(200).json(user);
      } else {
        const invitelink = uuidv4();
        const inviteReward = 10000;
        if (start_param) {
          const owner = await User.findOne({ invitelink: start_param });
          if (owner) {
            console.log("invited")
            User.create({ tgId, username: userName, firstname: firstName, lastname: lastName, isinvited: true, invitelink, cards: Array(30).fill(0) })
              .then(async (user: any) => {
                if (!owner.friends.includes(tgId)) {
                  owner.friends.push(tgId);
                  owner.points.total += inviteReward;
                  owner.points.current += inviteReward;
                  let matchedfriendCountInfo = await this.BASEDB.rewards.friends.find(
                    (item: any) => item.count === owner.friends.length
                  );
                  if (matchedfriendCountInfo) {
                    owner.points.total += matchedfriendCountInfo.value;
                    owner.points.current += matchedfriendCountInfo.value;
                  }
                  await owner.save();
                  // HERE You can add alert function for telegram channel
                  // bot.telegram.sendMessage(6689237945,"Hello");  Good Working
                }
                res.status(200).json(user);
              })
              .catch((err: any) => { res.json(err); });
          } else {
            res.status(400).json({ message: "Unauthorized Invitation Link!" });
          }
        } else {
          User.create({ tgId, username: userName, firstname: firstName, lastname: lastName, invitelink, cards: Array(30).fill(0) })
            .then((user: any) => {
              // HERE You can add new user event
              bot.telegram.sendMessage(tgId,"Welcome! Registered successfuly");
              res.status(200).json(user);
            })
            .catch((err: any) => { res.json(err); });
        }
      }
    }
    catch (err) {
      res.json(err);
    }
  }; // test completed
  public tapping = async (req: Request, res: Response) => {
    let tgId = req.params.id;
    const { taps } = req.body;
    try {
      const user = await User.findOne({ tgId: tgId });
      let newpoints = taps * this.BASEDB.energy.tap[user.energy.tap].value;
      const curTime: Date = new Date();
      const pointTime: any = (curTime.getTime() - user.timemanager.points.getTime()) / 3600000;
      let timeFarm: number = Math.floor(pointTime * user.points.hour);
      user.points.total = user.points.total + newpoints + timeFarm;
      user.points.current = user.points.current + newpoints + timeFarm;
      user.timemanager.points = curTime;
      // const energyTIme: any = (curTime.getTime() - user.timemanager.energy.getTime()) / 1000;
      // let energyFarm: number = Math.floor(energyTIme * user.energy.regen);
      // user.energy.current = user.energy.current + energyFarm - newpoints;
      console.log("current energy: ",user.energy.current);
      // console.log("energyFarm: ",energyFarm);
      console.log("newpoints: ",newpoints);
      console.log("newpoints: ",user.timemanager);
      // if (user.energy.current >= this.BASEDB.energy.max[user.energy.max].value) {
      //   user.energy.current = this.BASEDB.energy.max[user.energy.max].value;
      // }
      await user.save();
      res.status(200).json(user.points);
    }
    catch (err) { res.json(err) }
  };  // need validation logic if there are not enough energy
  public energyBoost = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const { max = 0, regen = 0, tap = 0 } = req.body;
    try {
      const user = await User.findOne({ tgId: tgId });
      const maxfee = max * this.BASEDB.energy.max[user.energy.max].cost;
      const regenfee = regen * this.BASEDB.energy.regen[user.energy.regen].cost;
      const tapfee = tap * this.BASEDB.energy.tap[user.energy.tap].cost;
      if (user.energy.max <= (this.BASEDB.energy.max.length - 2) && user.points.current >= maxfee) {
        user.points.current -= maxfee;
        user.energy.max += max;
      }
      if (user.energy.regen <= (this.BASEDB.energy.regen.length - 2) && user.points.current >= regenfee) {
        user.points.current -= regenfee;
        user.energy.regen += regen;
      }
      if (user.energy.tap <= (this.BASEDB.energy.tap.length - 2) && user.points.current >= tapfee) {
        user.points.current -= tapfee;
        user.energy.tap += tap;
      }
      await user.save();
      res.status(200).json(user.energy);
    }
    catch (err) { res.json(err) }
  };
  public updateCard = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const { cardId } = req.body;
    try {
      const user = await User.findOne({ tgId: tgId });
      const cardInfo = await this.BASEDB.cards.find((item: any) => item.id === cardId);
      let profit = cardInfo.info[user.cards[cardId]].hourlyIncome;
      let fee = cardInfo.info[user.cards[cardId]].nextLvlCost;
      if (user.points.current >= fee) {
        user.points.hour += profit;
        user.points.current -= fee;
        user.cards[cardId] += 1;
        user.save();
        res.status(200).send(user);
      } else { res.status(200).send(false); }
    } catch (err) { res.send(err); }
  };
  public updateTask = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const { taskId } = req.body;
    try {
      const user = await User.findOne({ tgId: tgId });
      let tasksInfo = user.tasks;
      if (!tasksInfo.includes(taskId)) {
        user.tasks.push(taskId);
        const taskInfo = await this.BASEDB.tasks.find((item: any) => item.id === taskId);
        if (taskInfo) {
          user.points.total += taskInfo.points;
          user.points.current += taskInfo.points;
        } else {
          res.status(200).send(false);
        }
        await user.save();
        res.status(200).send(true);
      }
      else { res.status(200).send(false); }
    } catch (err) { res.send(err) }
  };
  public dailyCheck = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    try {
      const user = await User.findOne({ tgId: tgId });
      if (user.dailydb.enabledaycount) {
        if (user.dailydb.curdaycount >= 9) {
          user.dailydb.curdaycount = 0;
          user.dailydb.enabledaycount = false;
          await user.save();
          res.status(200).json(user.dailydb);
        } else {
          user.dailydb.curdaycount++;
          user.dailydb.enabledaycount = false;
          user.points.total += this.BASEDB.rewards.dayCounts[user.dailydb.curdaycount].value;
          user.points.current += this.BASEDB.rewards.dayCounts[user.dailydb.curdaycount].value;
          user.rewards.daily += this.BASEDB.rewards.dayCounts[user.dailydb.curdaycount].value;
          console.log(this.BASEDB.rewards.dayCounts[user.dailydb.curdaycount].value);
          await user.save();
          res.status(200).json(user.dailydb);
        }
      } else { res.status(200).send(false) }
    } catch (err) { res.send(err) }
  };
  public fullBoost = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    try {
      const user = await User.findOne({ tgId: tgId });
      if (user.dailydb.fullbooster <= 0) {
        res.status(200).send(false);
      } else {
        user.dailydb.fullbooster--;
        user.energy.current = this.BASEDB.energy.max[user.energy.max].value;
        await user.save();
        res.status(200).json(user.dailydb);
      }
    } catch (err) { res.send(err) }
  };
  public goldenCard = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const { cardpair } = req.body;
    try {
      const user = await User.findOne({ tgId: tgId });
      const goldenCards = await GoldenCards.find({});
      let paircards = [goldenCards[0].cardId, goldenCards[1].cardId, goldenCards[2].cardId];
      if (user.dailydb.goldencards > 0) {
        user.dailydb.goldencards--;
        let matchedCards: any = [];
        for (let k = 0; k < 3; k++) {
          if (paircards.includes(cardpair[k])) matchedCards.push(cardpair[k]);
        }
        if (matchedCards.length >= 3) {
          console.log('success to earn card reward!');
          user.rewards.cards += 2000000;
          user.points.total += 2000000;
          user.points.current += 2000000;
          user.dailydb.goldencards = 0;
          await user.save();
          res.status(200).send(matchedCards);
        } else {
          await user.save();
          res.status(200).send(matchedCards);
        }
      } else {
        res.status(200).send(false);
      }
    } catch (err) { res.send(err) }
  };
  public getHomePage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      let users = await User.find({});
      users.sort((a: any, b: any) => b.points.total - a.points.total);
      for (let i = 0; i <= 100; i++) {
        if (users[i]?.tgId == tgId) { user.rank.points = i + 1; break; }
        else { user.rank.points = 99; }
      }

      const curTime = new Date();
      let dT = (curTime.getTime() - user.timemanager.energy.getTime()) / 1000;
      let result = {
        totalPoint: user.points.total,
        currentPoint: user.points.current,
        profitPerHour: user.points.hour,
        curEnergy: user.energy.current,
        maxEnergy: this.BASEDB.energy.max[user.energy.max].value,
        recoverSpeed: this.BASEDB.energy.regen[user.energy.regen].value,
        multiValue: this.BASEDB.energy.tap[user.energy.tap].value,
        isDayCountEnable: user.dailydb.enabledaycount,
        dT: dT,
        rank: user.rank.points,
        serverTime: curTime,
      }
      res.status(200).send(result);
    }
  };
  public getCardPage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      let cardInfo = [{}];
      user.cards.map((level: number, index: number) => {
        cardInfo[index] = {
          title: this.BASEDB.cards[index]?.title,
          category: this.BASEDB.cards[index]?.category,
          detail: this.BASEDB.cards[index]?.info[level],
        };
      });
      let result = {
        profitPerHour: user.points.hour,
        timeLeft: Date.now(), //have to rewrite
        cardReward: user.rewards.cards,
        dailyCardPairChance: user.dailydb.goldencards,
        cardInfo,
      }
      res.status(200).send(result);
    }
  };
  public getTaskPage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      let result = {
        taskReward: user.rewards.tasks,
        dailyReward: user.rewards.daily,
        quest: user.coins,
        acctasks: [user.acctasks.nodewave, user.acctasks.tweeter, user.acctasks.instagram],
        completedTasks: user.tasks,
        tasks: this.BASEDB.tasks,
      }
      res.status(200).send(result);
    }
  };
  public getBoosterPage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      let result = {
        fullBoosterEnergyCount: user.dailydb.fullbooster,
        recoverSpeedLevel: user.energy.regen,
        rsNextLevelInfo: this.BASEDB.energy.regen[user.energy.regen],
        maxEnergyLevel: user.energy.max,
        meNextLevelInfo: this.BASEDB.energy.max[user.energy.max],
        multiValueLevel: user.energy.tap,
        mvNextLevelInfo: this.BASEDB.energy.tap[user.energy.tap],
      }
      res.status(200).send(result);
    }
  };
  public getFriendsPage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      let users = await User.find({});
      let friendsInfo = [{}];
      users.map((friend: any) => {
        for (let i = 0; i < user.friends.length; i++) {
          if (user.friends[i] == friend.tgId) {
            friendsInfo.push({
              id: friend.tgId,
              firstName: friend.firstname,
              lastName: friend.lastname,
              totalPoint: friend.points.total,
            });
          }
        }
      });
      let result = {
        inviteLink: user.invitelink,
        friends: friendsInfo,
      }
      res.status(200).send(result);
    }
  };
  public getRankPage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const userInfo = await User.findOne({ tgId: tgId });
    if (!userInfo) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      let myPointRank = 99;
      let myInviteRank = 99;
      let users = await User.find({});
      let users2 = users;
      let topUsersByPoints = [{}];
      let topUsersByInvites = [{}];
  
      users.sort((a: any, b: any) => b.points.total - a.points.total);
      users2.sort((a: any, b: any) => b.friends.length - a.friends.length);
  
      for (let i = 0; i <= 100; i++) {
        if (users[i]?.tgId == userInfo.tgId) { myPointRank = i + 1; userInfo.rank.points = myPointRank;}
        if (users2[i]?.tgId == userInfo.tgId) { myInviteRank = i + 1; userInfo.rank.invites = myInviteRank;}
        topUsersByPoints.push({
          id: users[i]?.tgId,
          firstName: users[i]?.firstname,
          lastName: users[i]?.lastname,
          totalPoint: users[i]?.points.total,
        });
        topUsersByInvites.push({
          id: users2[i]?.tgId,
          firstName: users2[i]?.firstname,
          lastName: users2[i]?.lastname,
          totalInvites: users2[i]?.friends.length,
        });
      }
      let result = {
        myPoint: userInfo.points.total,
        myInvites: userInfo.friends.length,
        myPointRank: myPointRank,
        myInviteRank: myInviteRank,
        topUsersByPoints: topUsersByPoints,
        topUsersByInvites: topUsersByInvites,
      }
      await userInfo.save();
      res.status(200).send(result);
    }
  };
  public getRewardsPage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      let result = {
        currentPoint: user.points.current,
        currentCoin: user.coins,
        isVerified: user.acctasks.nodewave && user.acctasks.tweeter && user.acctasks.instagram
      }
      res.status(200).send(result);
    }
  };
  public getDailyRewardPage = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
    else {
      const currentDate = new Date();
      let result = {
        dayCount: user.dailydb.curdaycount,
        isDayCountEnable: user.dailydb.enabledaycount,
        currentDate: currentDate,
      }
      res.status(200).send(result);
    }
  };
  public doacctask = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    const { nodewave = false, tweeter = false, instagram = false } = req.body;
    try {
      if (!user.acctasks.nodewave) {
        if (nodewave) {
          user.acctasks.nodewave = nodewave;
          user.points.total += 5000; user.points.current += 5000; user.coins += 1;
        }
      }
      if (!user.acctasks.tweeter) {
        if (tweeter) {
          user.acctasks.tweeter = tweeter;
          user.points.total += 5000; user.points.current += 5000; user.coins += 0.5;
        }
      }
      if (!user.acctasks.instagram) {
        if (instagram) {
          user.acctasks.instagram = instagram;
          user.points.total += 5000; user.points.current += 5000; user.coins += 0.5;
        }
      }
      await user.save();
      res.status(200).json(user.acctasks);
    }
    catch (err) { res.status(200).json(err) }
  };
  public withdraw = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });
    if (user) {
      await bot.telegram.sendMessage(Number(tgId), "🎉Congratelation! You successfuly withdrawed! \nThis is Test Mode! Coming soon");
      res.status(200).json({ message: "success" })
    } else {
      res.status(200).json({ message: "failed" })
    }
  };
  public transferCustomToken = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const user = await User.findOne({ tgId: tgId });

    const web3 = new Web3(Constants.POLYGON_RPC_URL);

    if (!PRIVATE_KEY || !FROM_ADDRESS || !TO_ADDRESS || !AMOUNT) {
      console.error('Please set all required environment variables in the .env file.');
      process.exit(1);
    }
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    web3.eth.accounts.wallet.add(account);
    console.log("wallet balance: ", web3.eth.getBalance("0x1508b1E40B7B90937447E81e4ABcf7D5233f7A7d"));
    // Create a contract instance
    const nwsContract = new web3.eth.Contract(Constants.NWS_ABI, Constants.NWS_CONTRACT_ADDRESS);
    console.log("contract: ", nwsContract);

    try {
      console.log("Here");
      if(AMOUNT>=user.coins){res.send(false);return;}
      const amountInSmallestUnit = web3.utils.toWei(AMOUNT, "ether");
      console.log("AmountIN", amountInSmallestUnit);
      bot.telegram.sendMessage(tgId, `AmountIN: ${amountInSmallestUnit}`);
      console.log(`Transferring ${AMOUNT} $NWS tokens from ${FROM_ADDRESS} to ${TO_ADDRESS}`);
      bot.telegram.sendMessage(tgId, `Transferring ${AMOUNT} $NWS tokens from ${FROM_ADDRESS} to ${TO_ADDRESS}`);
      // Prepare the transaction
      const tx = nwsContract.methods.transfer(TO_ADDRESS, amountInSmallestUnit);
      // Send the transaction
      const receipt = await tx.send({
        from: FROM_ADDRESS,
        type: 0,
        //   gas: gasLimit,
        //   gasPrice: gasPrice
      });

      console.log('🎉Transaction successful!');
      bot.telegram.sendMessage(tgId, '🎉Transaction successful!');
      console.log('Transaction hash:', receipt.transactionHash);
      bot.telegram.sendMessage(tgId, `✅Transaction hash: ${receipt.transactionHash}`);
      user.coins -= Number(AMOUNT);
      console.log(Number(AMOUNT));
      await user.save();
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  };
  public updateCurrentValues = async (req: Request, res: Response) => {
    const tgId = req.params.id;
    const { curEnergy } = req.body;
    try {
      const user = await User.findOne({ tgId: tgId });
      user.energy.current = curEnergy;
      user.timemanager.energy = Date.now();
      await user.save();
      // console.log("update ENergy")
      res.status(200).send(true);
    } catch (err) { res.send(err) }
  };
}

// export const updateCurrentValues = async (req: Request, res: Response) => {
//   let tgId = req.params.id;
//   let { curPoint, curEnergy } = req.body;
//   try {
//     const user = await User.findOne({ tgId: tgId });
//     user.points.current = curPoint;
//     user.energy.curEnergy = curEnergy;
//     await user.save();
//     res.status(200).send(true);
//   } catch (err) { res.send(err) }
// };