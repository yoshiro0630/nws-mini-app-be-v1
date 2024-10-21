import { Router } from 'express';
// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
import { UserCtr } from '../controllers/userCtr';

const router = Router();
const userCtr = new UserCtr();

router.post('/get-user/:id', userCtr.getUser);
router.put('/update/tap2point/:id', userCtr.tapping);
router.put('/update/energy-levelup/:id', userCtr.energyBoost);
router.put('/update/card/:id', userCtr.updateCard);
router.put('/update/task/:id', userCtr.updateTask);
router.put('/update/do-acctask/:id', userCtr.doacctask);
// router.put('/update/current-values/:id', updateCurrentValues);
router.put('/update/daily-data/daycount/:id', userCtr.dailyCheck);  // only local
router.put('/update/daily-data/boostcount/:id', userCtr.fullBoost);  // only local
router.put('/update/card-reward/:id', userCtr.goldenCard);  // only local
router.put('/withdraw/:id', userCtr.transferCustomToken);  
router.put('/update/current-values/:id', userCtr.updateCurrentValues);

router.get('/', userCtr.getTest);
router.get('/get-home-data/:id', userCtr.getHomePage);
router.get('/get-card-data/:id', userCtr.getCardPage);
router.get('/get-task-data/:id', userCtr.getTaskPage);
router.get('/get-booster-data/:id', userCtr.getBoosterPage);
router.get('/get-friend-data/:id', userCtr.getFriendsPage);
router.get('/get-rank-data/:id', userCtr.getRankPage);
router.get('/get-rewards-data/:id', userCtr.getRewardsPage);
router.get('/get-dailyreward-data/:id', userCtr.getDailyRewardPage);

export default router;
