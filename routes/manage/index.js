import express from "express";
const router = express.Router();

import sysuser from './sysusers';
import user from './users';
import roles from './roles';

router.use('/sysuser',sysuser);//管理端 系统用户模块
router.use('/user',user);
router.use('/roles',roles);//权限管理

export default router;