import express from "express";
import {ArticlesService} from './../../../service/wetchat';
const router = express.Router();
//文章列表
router.post('/list', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        status = param.status;
    next({
        $promise: ArticlesService.findWetcharArticlesPageList(page, status),
        msg: '文章查询失败'
    });
});
//查看文章
router.post('/view', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: ArticlesService.viewArticle(id),
        msg: '阅读文章失败'
    });
});

export default router;