import { Request, Response } from 'express';

const { v4: uuidv4 } = require('uuid');
var BasicSettings = require("../models/basicsettings");
var Cards = require("../models/cards");
var Tasks = require("../models/tasks");
var User = require("../models/user");
var DailyCardPair = require('../models/dailycardpair');
var cron = require("node-cron");

cron.schedule('0 0 * * *', async () => {// 24hr
  try {
    const users = await User.find({});
    users.map((user: any) => {
      if(user.dailyData.isDayCountEnable){
        user.dailyData = {
          cardChance: 3,
          boostCount: 3,
          dayCount: 0,
          isDayCountEnable: true,
        }
      } else {
        user.dailyData.cardChance = 3;
        user.dailyData.boostCount = 3;
        user.dailyData.isDayCountEnable = true;
      }
    });
    console.log("updated all users' dailyData successfuly");
  } catch (error) {
    console.error('Error:', error);
  }
});

export const getTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "GET successuly" });
};

export const getUser = async (req: Request, res: Response) => {
  const tgId = req.params.id;
  console.log(req.body)
  let { userName, firstName, lastName, start_param } = req.body;
  try {
    const user = await User.findOne({ tgId: tgId })
    if (user) {
      user.lastLogin = Date.now(); user.save();
      res.status(200).json(user);
    } else {
      let inviteLink = uuidv4();
      const basicSettings = await BasicSettings.findOne({});
      const inviteRevenue = 10000; // default revenue for inviting a friend
      if (start_param) { // if user is invited by owner
        const owner = await User.findOne({ inviteLink: start_param });
        if (owner) {
          User.create({
            tgId, userName, firstName, lastName,
            isInvited: true, inviteLink, cards: Array(30).fill(0)
          }).then(async (user: any) => {
            if (!owner.friends.includes(tgId)) {
              owner.friends.push(tgId);
              owner.points.total += inviteRevenue;
              owner.points.current += inviteRevenue;
              let friendCounts = owner.friends.length;
              let matchedCountInfo = await basicSettings.friendsRevenue.find(
                (item: any) => item.friendCount === friendCounts
              )
              if (matchedCountInfo) {
                owner.points.total += matchedCountInfo.revenue;
                owner.points.current += matchedCountInfo.revenue;
              }
              await owner.save();
              // await bot.telegram.sendMessage(
              //     owner.tgId, 
              //     `@${user.userName} has joined by your invitation! 🌱🚀Get ready for more fun together! 👥💪`, 
              // );
            }
            res.status(200).json(user);
          }).catch((err: any) => { res.json(err); });
        }
        else {
          res.status(400).json({ message: "Unauthorized Invitation Link!" });
        }
      }
      else { // if user is not invited by another user
        User.create({ tgId, userName, firstName, lastName, inviteLink, cards: Array(30).fill(0) })
          .then((user: any) => {
            // const emitNewUserEvent = async () => {
            //     const io = getIo();
            //     io.emit('newUserRegistered', { totalCount });
            // };
            // await emitNewUserEvent();
            res.status(200).json(user);
          }).catch((err: any) => { res.json(err); });
      }
    }
  }
  catch (err) { res.json(err) };
};

export const tap2point = async (req: Request, res: Response) => {
  // console.log("invoked")
  let tgId = req.params.id;
  let { taps } = req.body;
  // console.log(taps)
  try {
    const user = await User.findOne({ tgId: tgId });
    let basicSettings = await BasicSettings.findOne({});
    let newPoints = taps * basicSettings.energy.tap2PointLevel[user.energy.tap2PointLvl].value;
    console.log("taps:",taps);
    const currentTime: Date = new Date();
    const timeDifference4point: any = (currentTime.getTime() - user.points.curUpdatedAt.getTime()) / 3600000; // [hour]
    const timeDifference4energy: any = (currentTime.getTime() - user.energy.curEnergyUpdatedAt.getTime()) / 3600000; // [hour]
    let time2Point: number = Math.floor(timeDifference4point * user.points.hourInc);
    user.points.curUpdatedAt = Date.now();
    let time2Energy: number = Math.floor(timeDifference4energy * 3600 * basicSettings.energy.secondIncLevel[user.energy.secondIncLvl].value);
    // console.log("---->", time2Point, "---->", time2Energy);
    // console.log(timeDifference);
    user.points.total = user.points.total + newPoints + time2Point;
    user.points.current = user.points.current + newPoints + time2Point;
    
    // if(user.energy.curEnergy < 0){user.energy.curEnergy = 0;}
    console.log("=======>",time2Energy,"--",time2Point)
    // console.log(user.energy.curEnergy);
    // if(user.energy.curEnergy >= basicSettings.energy.maxEnergyLevel[user.energy.maxLvl].value)user.energy.curEnergy = basicSettings.energy.maxEnergyLevel[user.energy.maxLvl].value;
    await user.save();
    console.log("after")
    res.status(200).send(true);
  } catch (err) { res.send(err) }
};

export const energyLevelUp = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let { newMaxLvl = 0, newSecondIncLvl = 0, newTap2PointLvl = 0 } = req.body;
  try {
    const user = await User.findOne({ tgId: tgId });
    let basicSettings = await BasicSettings.findOne({});
    if(user.energy.maxLvl <= (basicSettings.energy.maxLevel.length-2)){
      let Afee = newMaxLvl * basicSettings.energy.maxLevel[user.energy.maxLvl].cost;
      if (user.points.current >= Afee) {
        user.points.current -= Afee;
        user.energy.maxLvl += newMaxLvl;
      } else { res.status(200).send(false); }
    }
    if(user.energy.secondIncLvl <= (basicSettings.energy.secondIncLevel.length-2)){
      let Bfee = newSecondIncLvl * basicSettings.energy.secondIncLevel[user.energy.secondIncLvl].cost;
      if (user.points.current >= Bfee) {
        user.points.current -= Bfee;
        user.energy.secondIncLvl += newSecondIncLvl;
      } else { res.status(200).send(false); }
    }
    if(user.energy.tap2PointLvl <= (basicSettings.energy.tap2PointLevel.length-2)){
      let Cfee = newTap2PointLvl * basicSettings.energy.tap2PointLevel[user.energy.tap2PointLvl].cost;
      if (user.points.current >= Cfee) {
        user.points.current -= Cfee;
        user.energy.tap2PointLvl += newTap2PointLvl;
      } else { res.status(200).send(false); }
    }
    user.save();
    res.status(200).send(user.energy);
  } catch (err) { console.log(err); }
};

export const updateCard = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let { cardId } = req.body;
  try {
    const user = await User.findOne({ tgId: tgId });
    let cardInfo = await Cards.findOne({ id: cardId });
    console.log(user.cards)
    let profit = cardInfo.info[user.cards[cardId]].hourlyIncome;
    console.log("middle")
    let fee = cardInfo.info[user.cards[cardId]].nextLvlCost;
    console.log('before')
    if (user.points.current >= fee) {
      user.points.hourInc += profit;
      user.points.current -= fee;
      user.cards[cardId] += 1;
      await user.save();
      console.log("good")
      res.status(200).send({
        currentLevel: cardInfo.info[user.cards[cardId]],
        nextLevel: cardInfo.info[user.cards[cardId]+1],
      });
    } else { res.status(200).send(false); }
  } catch (err) { res.send(err); }
};

export const updateCurrentValues = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let { curEnergy } = req.body;
  try {
    const user = await User.findOne({ tgId: tgId });
    user.energy.curEnergy = curEnergy;
    user.energy.curEnergyUpdatedAt = Date.now();
    await user.save();
    // console.log("update ENergy")
    res.status(200).send(true);
  } catch (err) { res.send(err) }
};

export const updateTask = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let { taskId } = req.body;
  try {
    const user = await User.findOne({ tgId: tgId });
    let tasksInfo = user.tasks;
    console.log(tasksInfo)
    if (!tasksInfo.includes(taskId)) {
      user.tasks.push(taskId);
      let taskInfo = await Tasks.findOne({ id: taskId });
      if (taskInfo) {
        user.points.total += taskInfo.revenue.point;
        user.points.current += taskInfo.revenue.point;
      } else {
        res.status(200).send("no matched task");
      }
      await user.save();
      res.status(200).send(true);
    }
    else { res.status(200).send(false); }
  } catch (err) { res.send(err) }
};

export const updateDayCount = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  try {
    const user = await User.findOne({ tgId: tgId });
    const basicSettings = await BasicSettings.findOne();
    if (user.dailyData.isDayCountEnable) {
      console.log('enable')
      if (user.dailyData.dayCount >= 9) {
        user.dailyData.dayCount = 0;
        user.dailyData.isDayCountEnable = false;
        await user.save();
        res.status(200).send(true);
      } else {
        user.dailyData.dayCount++;
        user.dailyData.isDayCountEnable = false;
        let count = user.dailyData.dayCount;
        console.log(count)
        user.points.total += basicSettings.dailyRevenue[count].revenue;
        user.points.current += basicSettings.dailyRevenue[count].revenue;
        console.log(user.points)
        await user.save();
        console.log("true")
        res.status(200).send(true);
      }
    } else { res.status(200).send(false) }
  } catch (err) { res.send(err) }
};

export const updateBoostCount = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  try {
    const user = await User.findOne({ tgId: tgId });
    let basicSettings = await BasicSettings.findOne({});
    if (user.dailyData.boostCount <= 0) {
      res.status(200).send(false);
    } else {
      user.dailyData.boostCount--;
      user.energy.curEnergy = basicSettings.energy.maxLevel[user.energy.maxLvl].value;
      await user.save();
      res.status(200).send(true);
    }
  } catch (err) { res.send(err) }
};

export const updateCardReward = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let { cardpair } = req.body;
  try {
    const user = await User.findOne({ tgId: tgId });
    let dailycardpair = await DailyCardPair.find({});
    let paircards = [dailycardpair[0].cardId, dailycardpair[1].cardId, dailycardpair[2].cardId];
    if(user.dailyData.cardChance > 0){
      user.dailyData.cardChance--;
      let matchedCards:any = [];
      for(let k=0; k<3; k++){
        console.log('ok',paircards.includes(cardpair[k]));
        if(paircards.includes(cardpair[k]))matchedCards.push(cardpair[k]);
      }
      if(matchedCards.length >= 3){
        console.log('success to earn card reward!');
        user.rewards.cards += 2000000;
        user.points.total +=2000000;
        user.points.current +=2000000;
        user.dailyData.cardChance = 0;
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

export const getData4HomePage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let user = await User.findOne({ tgId: tgId });
  if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    let basicSettings = await BasicSettings.findOne();
    let users = await User.find({});
    users.sort((a: any, b: any) => b.points.total - a.points.total);
    // console.log(users)
    for (let i = 0; i <= 100; i++) {
      if (users[i]?.tgId == tgId) { user.points.rank = i+1; break;}
      else { user.points.rank = 100; }
    }
    const currentTIme = new Date();
    let dT = (currentTIme.getTime() - user.energy.curEnergyUpdatedAt.getTime()) / 1000;
    // console.log(dT,"-----",currentTIme, "-----",user.energy.curEnergyUpdatedAt);
    await user.save();
    let result = {
      totalPoint: user.points.total,
      currentPoint: user.points.current,
      profitPerHour: user.points.hourInc,
      curEnergy: user.energy.curEnergy,
      maxEnergy: basicSettings.energy.maxLevel[user.energy.maxLvl].value,
      recoverSpeed: basicSettings.energy.secondIncLevel[user.energy.secondIncLvl].value,
      multiValue: basicSettings.energy.tap2PointLevel[user.energy.tap2PointLvl].value,
      updatedAt: user.updatedAt,
      isDayCountEnable: user.dailyData.isDayCountEnable,
      dT: dT,
      rank: user.points.rank,
      serverTime: Date.now(),
    }
    res.status(200).send(result);
  }
};

export const getData4CardPage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let user = await User.findOne({ tgId: tgId });
  if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    let cards = await Cards.find({});
    let cardInfo = [{}];
    user.cards.map((level: number, index: number) => {
      cardInfo[index] = {
        title: cards[index]?.title,
        category: cards[index]?.category,
        detail: cards[index]?.info[level],
      };
    });
    console.log(user.points.hourInc)
    let result = {
      profitPerHour: user.points.hourInc,
      timeLeft: Date.now(), //have to rewrite
      cardReward: user.rewards.cards,
      dailyCardPairChance: user.dailyData.cardChance,
      cardInfo,
    }
    res.status(200).send(result);
  }
};

export const getData4TaskPage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let user = await User.findOne({ tgId: tgId });
  if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    let tasks = await Tasks.find({});
    let result = {
      taskReward: user.rewards.tasks,
      dailyReward: user.rewards.daily,
      completedTasks: user.tasks,
      tasks: tasks,
    }
    res.status(200).send(result);
  }
};

export const getData4BoosterPage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let user = await User.findOne({ tgId: tgId });
  if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    let basicSettings = await BasicSettings.findOne({});
    let result = {
      fullBoosterEnergyCount: user.dailyData.boostCount,
      recoverSpeedLevel: user.energy.secondIncLvl,
      rsNextLevelInfo: basicSettings.energy.secondIncLevel[user.energy.secondIncLvl],
      maxEnergyLevel: user.energy.maxLvl,
      meNextLevelInfo: basicSettings.energy.maxLevel[user.energy.maxLvl],
      multiValueLevel: user.energy.tap2PointLvl,
      mvNextLevelInfo: basicSettings.energy.tap2PointLevel[user.energy.tap2PointLvl],
    }
    res.status(200).send(result);
  }
};

export const getData4FriendsPage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let user = await User.findOne({ tgId: tgId });
  if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    let users = await User.find({});
    let friendsInfo = [{}];
    users.map((friend: any) => {
      for (let i = 0; i < user.friends.length; i++) {
        if (user.friends[i] == friend.tgId) {
          friendsInfo.push({
            id: friend.tgId,
            firstName: friend.firstName,
            lastName: friend.lastName,
            totalPoint: friend.points.total,
          });
        }
      }
    });
    let result = {
      inviteLink: user.inviteLink,
      friends: friendsInfo,
    }
    res.status(200).send(result);
  }
};

export const getData4RankPage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let userInfo = await User.findOne({ tgId: tgId });
  if (!userInfo) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    let myPointRank = 100;
    let myInviteRank = 100;
    let users = await User.find({});
    let users2 = users;
    let topUsersByPoints = [{}];
    let topUsersByInvites = [{}];

    users.sort((a: any, b: any) => b.points.total - a.points.total);
    users2.sort((a: any, b: any) => b.friends.length - a.friends.length);

    for (let i = 0; i <= 100; i++) {
      if (users[i]?.tgId == userInfo.tgId) { myPointRank = i + 1; }
      if (users2[i]?.tgId == userInfo.tgId) { myInviteRank = i + 1; }
      topUsersByPoints.push({
        id: users[i]?.tgId,
        firstName: users[i]?.firstName,
        lastName: users[i]?.lastName,
        totalPoint: users[i]?.points.total,
      });
      topUsersByInvites.push({
        id: users2[i]?.tgId,
        firstName: users2[i]?.firstName,
        lastName: users2[i]?.lastName,
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
    res.status(200).send(result);
  }
};

export const getData4RewardsPage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let user = await User.findOne({ tgId: tgId });
  if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    let result = {
      currentPoint: user.points.current,
      currentCoin: user.curCoin,
    }
    res.status(200).send(result);
  }
};

export const getData4DailyRewardPage = async (req: Request, res: Response) => {
  let tgId = req.params.id;
  let user = await User.findOne({ tgId: tgId });
  if (!user) { res.status(200).json({ error: "user not found, try with other tgId" }); }
  else {
    const currentDate = new Date();
    let result = {
      dayCount: user.dailyData.dayCount,
      isDayCountEnable: user.dailyData.isDayCountEnable,
      currentDate: currentDate,
    }
    res.status(200).send(result);
  }
};