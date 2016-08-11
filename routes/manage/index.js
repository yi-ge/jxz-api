import express from "express";
const router = express.Router();

import user from './users';

/**
 * 管理端 用户模块
 */
router.use('/',user);
export default router;