import { Router } from 'express';
// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
import { AdminCtr } from '../controllers/adminCtr';

const router = Router();
const adminCtr = new AdminCtr();

router.put('/update/cards/:id', adminCtr.updateCards);
router.put('/update/tasks/:id', adminCtr.updateTasks);
router.delete("/delete/card/:id", adminCtr.deleteCard);
router.delete("/delete/task/:id", adminCtr.deleteTask);

router.get('/', adminCtr.getTest);
router.get('/get-cards', adminCtr.getCards);
router.get('/get-tasks', adminCtr.getTasks);
router.get('/get-basedb', adminCtr.getBaseDB);

export default router;
