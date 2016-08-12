import express from "express";
const router = express.Router();

import user from './users';
import roles from './roles';

router.use('/user',user);//管理端 用户模块
router.use('/roles',roles);//权限管理
export default router;