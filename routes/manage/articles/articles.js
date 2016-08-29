import express from "express";
import {ArticlesService} from './../../../service/manage';
const router = express.Router();
//查询文章列表
router.post('/articlelist', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        startDate = param.startDate,
        title = param.title,
        endDate = param.endDate,
        status = param.status,
        house_name = param.house_name,
        sortType = param.sortType;
    next({
        $promise: ArticlesService.findPageList(page, title, startDate, endDate, status, house_name, sortType),
        msg: '查询失败'
    });
});
//查询用户文章列表
router.post('/finduserartilelist',(req,res,next)=>{
    let param = req.body;
    let page = param.page,
        user_id = param.user_id;
    next({
        $promise: ArticlesService.findUserArticleAll(user_id,page),
        msg: '用户文章查询失败'
    });
});
//添加文章
router.post('/addarticle', (req, res, next)=> {
    let param = req.body;
    let sys_id = param.sys_id,
        title = param.title,
        content = param.content;
    next({
        $promise: ArticlesService.manageAddArticles(sys_id, title, content),
        msg: '文章添加失败'
    });
});
//预览文章
router.post('/articledetails', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: ArticlesService.articleDetails(id),
        msg: '文章查看失败'
    });
});
//修改文章封面
router.post('/updatecoverpicture', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        cover_picture = param.cover_picture,
        modifier = param.modifier;
    next({
        $promise: ArticlesService.updateCoverPicture(id, cover_picture, modifier),
        msg: '文章封面修改失败'
    });
});
//改变文章状态
router.post('/changestatus', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        status = param.status,
        modifier = param.modifier;
    next({
        $promise: ArticlesService.updateAudit(id, status, modifier),
        msg: '文章状态修改失败'
    });
});
//关联酒店
router.post('/relationhouse', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        houses_id = param.houses_id,
        modifier = param.modifier;
    console.log(param);
    next({
        $promise: ArticlesService.updateHousesId(id, houses_id, modifier),
        msg: '关联酒店失败'
    });
});

export default router;