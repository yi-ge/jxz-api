import express from "express";
const router = express.Router();
import user from './users';
import vip from './vip';
import houses from './houses';

/**
 * 微信端 用户模块
 */
router.use('/user',user);
router.use('/vip',vip);
router.use('/houses',houses);

export default router;