import express from "express";
const router = express.Router();
import user from './user';

/**
 * 微信端 用户模块
 */
router.use('/user',user);

export default router;