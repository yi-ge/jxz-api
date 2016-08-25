import express from "express";
import {HousesCommentService,HousesService,HousesKeywordService,HousesAttachService} from './../../../service/wetchat';
const router = express.Router();
//添加酒店评论
router.post('/addcomment', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        comment_source = param.comment_source,
        content = param.content,
        creater = param.creater;
    next({
        $promise: HousesCommentService.addWatchHousesComment(houses_id, comment_source, content, creater),
        msg: '评论失败'
    });
});

//酒店详情
router.post('/details', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: HousesService.findHouseDetails(id),
        msg: '详情查询失败'
    });
});
//酒店评论列表
router.post('/commentlist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: HousesCommentService.findHouseCommentsPage(houses_id, page, pagesize),
        msg: '评论查询失败'
    });
});

//查询酒店亮点
router.post('/keyword', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id;
    next({
        $promise: HousesKeywordService.findWetchatHousesKeyword(houses_id),
        msg: '酒店亮点查询失败'
    });
});
//查询酒店图片
router.post('/attachhouselist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id;
    next({
        $promise: HousesAttachService.findHousesAttach(houses_id),
        msg: '酒店亮点查询失败'
    });
});


export default router;