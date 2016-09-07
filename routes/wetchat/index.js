import express from "express";
const router = express.Router();
import user from './users';
import vip from './vip';
import houses from './houses';
import articles from './articles';
import region from './region';

/**
 * 微信端 用户模块
 */
router.use('/user',user);
router.use('/vip',vip);
router.use('/houses',houses);
router.use('/region',houses);
router.use('/articles',articles);

export default router;