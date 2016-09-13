import express from "express";
import {HousesCommentService,HousesService,
    HousesKeywordService,HousesAttachService,
    HousesRoomService,HousesSolarTermsService,
    HousesComboService
} from './../../../service/wetchat';
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
//通过区域查询酒店
router.post('/regiontohouseslist', (req, res, next)=> {
    let param = req.body;
    let state = param.state,
        country = param.country,
        region = param.region,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: HousesService.findRegionToHouseList(state,country,region,page,pagesize),
        msg: '酒店列表查询失败'
    });
});
//酒店房型列表
router.post('/findroomlist', (req, res, next)=> {
    let param = req.body;
    let house_id = param.houses_id;
    next({
        $promise: HousesRoomService.findRoomCurrentPriceList(house_id),
        msg: '酒店房型查询失败'
    });
});
//酒店房型列表
router.get('/findroomlist', (req, res, next)=> {
    let param = req.query;
    let house_id = param.houses_id;
    next({
        $promise: HousesRoomService.findRoomCurrentPriceList(house_id),
        msg: '酒店房型查询失败'
    });
});
//酒店节气列表
router.post('/findtermlist', (req, res, next)=> {
    let param = req.body;
    let house_id = param.houses_id;
    next({
        $promise: HousesSolarTermsService.findHousesSolarTermsList(house_id),
        msg: '酒店节气查询失败'
    });
});
//酒店套餐列表
router.post('/findcombolist', (req, res, next)=> {
    let param = req.body;
    let house_id = param.houses_id;
    next({
        $promise: HousesComboService.findComboList(house_id),
        msg: '酒店节气查询失败'
    });
});
export default router;