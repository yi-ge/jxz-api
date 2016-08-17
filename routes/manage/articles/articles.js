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
    ArticlesService.findPageList(page,title, startDate, endDate, status, house_name, sortType).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "查询失败"});
    })
});
//添加文章
router.post('/addarticle', (req, res, next)=> {
    let param = req.body;
    let sys_id = param.sys_id,
        title = param.title,
        content = param.content;
    ArticlesService.manageAddArticles(sys_id, title, content).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: '文章添加失败'});
    })
});

export default router;