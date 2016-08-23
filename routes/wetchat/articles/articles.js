import express from "express";
import {ArticlesService} from './../../../service/wetchat';
const router = express.Router();
//文章列表
router.post('/list',(req,res,next)=>{
    let param = req.body;
    let page = param.page,
        status = param.status;
    ArticlesService.findWetcharArticlesPageList(page,status).then(result=>{
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '文章查询失败'});
    });
});
//查看文章
router.post('/view',(req,res,next)=>{
    let param = req.body;
    let id = param.id;
    ArticlesService.viewArticle(id).then(result=>{
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '阅读文章失败'});
    });
});

export default router;