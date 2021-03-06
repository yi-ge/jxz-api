import express from "express";
const router = express.Router();

import sysuser from './sysusers';
import user from './users';
import vip from './vip';
import roles from './roles';
import articles from './articles';
import region from './region';
import houses from './houses';
import syshotkeyword from './syshotkeyword';
import sysparameter from './sysparameter';
import syscoin from './syscoin';
import sysarticledeclare from './sysarticledeclare';
import orders from './orders';

router.use('/sysuser', sysuser);//管理端 系统用户模块
router.use('/syscoin', syscoin);//精选币配置
router.use('/user', user); //精选者
router.use('/vip', vip);//vip用户
router.use('/roles', roles);//权限管理
router.use('/article', articles);//权限管理
router.use('/region', region);//区域管理
router.use('/houses', houses);//酒店管理
router.use('/hotkeyword', syshotkeyword);//系统热词
router.use('/sysparameter', sysparameter);//系统参数
router.use('/sysarticledeclare', sysarticledeclare);//系统参数
router.use('/orders', orders);//订单

export default router;