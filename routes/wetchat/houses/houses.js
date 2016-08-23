import express from "express";
import {HousesCommentService,HousesService} from './../../../service/wetchat';
const router = express.Router();
//添加酒店评论
router.post('/addcomment', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        comment_source = param.comment_source,
        content = param.content,
        creater = param.creater;
    HousesCommentService.addWatchHousesComment(houses_id, comment_source, content, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '评论失败'});
    });
});

//酒店详情
router.post('/details', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    HousesService.findHouseDetails(id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '详情查询失败'});
    });
});
router.post('/commentlist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        page = param.page;
    HousesCommentService.findHouseCommentsPage(houses_id, page).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : '评论查询失败'});
    });
});

export default router;