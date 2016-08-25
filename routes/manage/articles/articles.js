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
    ArticlesService.findPageList(page, title, startDate, endDate, status, house_name, sortType).then(result=> {
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
    });
});
//预览文章
router.post('/articledetails', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    ArticlesService.articleDetails(id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '文章查看失败'});
    });
});
//修改文章封面
router.post('/updatecoverpicture', ()=> {
    let param = req.body;
    let id = param.id,
        cover_picture = param.cover_picture,
        modifier = param.modifier;
    ArticlesService.updateCoverPicture(id,cover_picture,modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '文章封面修改失败'});
    });
});
//改变文章状态
router.post('/changestatus', ()=> {
    let param = req.body;
    let id = param.id,
        status = param.status,
        modifier = param.modifier;;
    ArticlesService.updateAudit(id,status,modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '文章状态修改失败'});
    });
});
export default router;