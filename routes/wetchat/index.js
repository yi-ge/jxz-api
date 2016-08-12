import express from "express";
const router = express.Router();
import user from './users';
import vip from './vip';

/**
 * 微信端 用户模块
 */
router.use('/user',user);
router.use('/vip',vip);

export default router;