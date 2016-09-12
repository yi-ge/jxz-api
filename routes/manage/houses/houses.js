import express from "express";
import {
    HousesService,
    HousesKeywordService,
    HousesAttachService,
    SysHousesKeywordService,
    HousesCommentService,
    HousesSolarTermsService,
} from './../../../service/manage';
const router = express.Router();
//添加系统酒店亮点
router.post('/addsyshousekeyword', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        picture = param.picture,
        creater = param.creater;
    next({
        $promise: SysHousesKeywordService.addSysHousesKeyword(name, picture, creater),
        msg: '系统酒店亮点添加失败'
    });
});
//查询酒店亮点库
router.post('/findsyshousekeyword', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        startDate = param.startDate,
        pagesize = param.pagesize,
        endDate = param.endDate;
    next({
        $promise: SysHousesKeywordService.findSysHousesKeywordList(page, startDate, endDate,pagesize),
        msg: '系统酒店亮点查询失败'
    });
});
//查询所有酒店库亮点
router.post('/findsyshousekeywordall', (req, res, next)=> {
    next({
        $promise: SysHousesKeywordService.findSysHousesKeyWordAll(),
        msg: '系统酒店亮点查询失败'
    });
});
//编辑酒店亮点库
router.post('/editsyshousekeyword', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        name = param.name,
        modifier = param.modifier,
        picture = param.picture;
    next({
        $promise: SysHousesKeywordService.editSysHousesKeyword(id, name, picture, modifier),
        msg: '系统酒店亮点更新失败'
    });
});
//更新酒店亮点库状态
router.post('/changesyshousekeywordstatus', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        modifier = param.modifier,
        status = param.status;
    next({
        $promise: SysHousesKeywordService.changeSysHousesKeywordStatus(id, status, modifier),
        msg: '系统酒店亮点状态改变失败'
    });
});
//给酒店添加亮点数据
router.post('/addhousekeyword', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        keyword_id = param.keyword_id,
        keyword_desc = param.keyword_desc,
        creater = param.creater;
    next({
        $promise: HousesKeywordService.addHousesKeyword(houses_id, keyword_id, keyword_desc, creater),
        msg: '系统酒店亮点添加失败'
    });
});
//编辑关联酒店关联的亮点
router.post('/edithousekeyword', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        keyword_desc = param.keyword_desc,
        keyword_id = param.keyword_id,
        modifier = param.modifier;
    next({
        $promise: HousesKeywordService.editHousesKeyword(id, keyword_id, keyword_desc, modifier),
        msg: '编辑酒店亮点失败'
    });
});
//删除关联于酒店关联的亮点状态
router.post('/destroyhouseskeywordstatus', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: HousesKeywordService.destroyHousesKeyword(id),
        msg: '酒店亮点删除失败'
    });
});
//添加酒店评论
router.post('/addhousecomment', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        comment_source = param.comment_source,
        content = param.content,
        comment_date = param.comment_date,
        creater = param.creater;
    next({
        $promise: HousesCommentService.addManageComment(houses_id, comment_source, content, comment_date, creater),
        msg: '评论添加失败'
    });
});
//批量添加酒店评论
router.post('/addhousecommentlist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        comments = param.comments,
        creater = param.creater;
    next({
        $promise: HousesCommentService.addManageCommentList(houses_id, comments, creater),
        msg: '评论添加失败'
    });
});
//编辑酒店评论
router.post('/edithousecomment', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        comment_source = param.comment_source,
        content = param.content,
        comment_date = param.comment_date,
        modifier = param.modifier;
    next({
        $promise: HousesCommentService.editComment(id, comment_source, content, comment_date, modifier),
        msg: '评论修改失败'
    });
});
//删除酒店评论
router.post('/destroyhousecomment', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: HousesCommentService.destroyComment(id),
        msg: '评论删除失败'
    });
});
//获取酒店评论 全部
router.post('/findhousecomments', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id;
    next({
        $promise: HousesCommentService.findHouseComments(houses_id),
        msg: '评论查询失败'
    });
});
//获取酒店评论 分页
router.post('/findhousecommentpage', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        pagesize = param.pagesize,
        page = param.page;
    next({
        $promise: HousesCommentService.findHouseCommentsPage(id,page,pagesize),
        msg: '评论查询失败'
    });
});
//上传酒店附件（批量）
router.post('/addhouseattachlist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        creater = param.creater,
        attachs = param.attachs;
    next({
        $promise: HousesAttachService.addHousesAttachList(houses_id, attachs, creater),
        msg: '附件添加失败'
    });
});
//上传酒店附件
router.post('/addhouseattach', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        creater = param.creater,
        links_url = param.links_url,
        file_path = param.file_path,
        title = param.title;
    next({
        $promise: HousesAttachService.addHousesAttach(houses_id, title, links_url, file_path, creater),
        msg: '附件添加失败'
    });
});
//查询酒店附件
router.post('/findhouseattachlist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id;
    next({
        $promise: HousesAttachService.findHouseAttach(houses_id),
        msg: '附件查询失败'
    });
});
//删除酒店附件
router.post('/destroyhouseattach', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: HousesAttachService.destroyHouseAttach(id),
        msg: '附件删除失败'
    });
});
//添加节气
router.post('/addterm', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        season = param.season,
        solar_terms_begin_date = param.start_date,
        solar_terms_end_date = param.end_date,
        creater = param.creater,
        is_set_price = param.is_set_price,
        name = param.name;
    next({
        $promise: HousesSolarTermsService.addHousesSolarTerms(houses_id,season,name,solar_terms_begin_date,solar_terms_end_date,is_set_price,creater),
        msg: '节气添加失败'
    });
});
//查询节气列表
router.post('/findtermlist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id;
    next({
        $promise: HousesSolarTermsService.findHousesSolarTermsList(houses_id),
        msg: '节气查询失败'
    });
});
//编辑节气
router.post('/editterm', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        solar_terms_begin_date = param.start_date,
        solar_terms_end_date = param.end_date,
        modifier = param.modifier;
    next({
        $promise: HousesSolarTermsService.editHousesSolarTerms(id,solar_terms_begin_date,solar_terms_end_date,modifier),
        msg: '编辑失败'
    });
});
//删除节气
router.post('/destroyterm', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: HousesSolarTermsService.destroyHousesSolarTerms(id),
        msg: '删除失败'
    });
});
//添加酒店
router.post('/addhouse', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        creater = param.creater,
        region = param.region,
        address = param.address,
        traffic_around = param.traffic_around,
        spots_around = param.spots_around,
        keywords = param.keywords,
        houses_desc = param.houses_desc;
    next({
        $promise: HousesService.addHouses(name, creater, region, address, traffic_around, spots_around, houses_desc, keywords),
        msg: '酒店添加失败'
    });
});
//编辑酒店
router.post('/edithouse', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        name = param.name,
        modifier = param.modifier,
        region = param.region,
        address = param.address,
        traffic_around = param.traffic_around,
        spots_around = param.spots_around,
        houses_desc = param.houses_desc;
    next({
        $promise: HousesService.editHouse(id, name, modifier, region, address, traffic_around, spots_around, houses_desc),
        msg: '酒店编辑失败'
    });
});
//查询酒店列表
router.post('/findhouses', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        sys_id = param.sys_id,
        page = param.page,
        pagesize = param.pagesize,
        is_putaway = param.is_putaway,
        endDate = param.endDate,
        startDate = param.startDate;
    next({
        $promise: HousesService.findHousesList(page, startDate, endDate, is_putaway, name, sys_id,pagesize),
        msg: '酒店查询失败'
    });
});
//查询酒店详情
router.post('/findhousedetails', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: HousesService.findManageHouseDetails(id),
        msg: '酒店详情查询失败'
    });
});
//酒店上下架
router.post('/putaway', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        is_putaway = param.is_putaway,
        modifier = param.modifier;
    next({
        $promise: HousesService.putaway(id, is_putaway, modifier),
        msg: '酒店详情查询失败'
    });
});
//模糊查询酒店
router.post('/vaguehouses', (req, res, next)=> {
    let param = req.body;
    let name = param.name;
    next({
        $promise: HousesService.vagueFindHouses(name),
        msg: '查询失败'
    });
});
//查询所有酒店
router.post('/listall', (req, res, next)=> {
    next({
        $promise: HousesService.findAll(),
        msg: '查询失败'
    });
});
export default router;