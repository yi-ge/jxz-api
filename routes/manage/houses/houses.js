import express from "express";
import {
    HousesService,
    HousesKeywordService,
    HousesAttachService,
    SysHousesKeywordService,
    HousesCommentService,
} from './../../../service/manage';
const router = express.Router();
//添加系统酒店亮点
router.post('/addsyshousekeyword', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        picture = param.picture,
        creater = param.creater;
    SysHousesKeywordService.addSysHousesKeyword(name, picture, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点添加失败"});
    });
});
//查询酒店亮点库
router.post('/findsyshousekeyword', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        startDate = param.startDate,
        endDate = param.endDate;
    SysHousesKeywordService.findSysHousesKeywordList(page, startDate, endDate).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点查询失败"});
    });
});
//查询所有酒店库亮点
router.post('/findsyshousekeywordall', (req, res, next)=> {
    SysHousesKeywordService.findSysHousesKeyWordAll().then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点查询失败"});
    });
});
//编辑酒店亮点库
router.post('/editsyshousekeyword', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        name = param.name,
        modifier = param.modifier,
        picture = param.picture;
    SysHousesKeywordService.editSysHousesKeyword(id, name, picture, modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点更新失败"});
    });
});
//更新酒店亮点库状态
router.post('/changesyshousekeywordstatus', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        modifier = param.modifier,
        status = param.status;
    SysHousesKeywordService.changeSysHousesKeywordStatus(id, status, modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点状态改变失败"});
    });
});
//给酒店添加亮点数据
router.post('/addhousekeyword', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        keyword_id = param.keyword_id,
        keyword_desc = param.keyword_desc,
        creater = param.creater;
    HousesKeywordService.addHousesKeyword(houses_id, keyword_id, keyword_desc, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点查询失败"});
    });
});
//编辑关联酒店关联的亮点
router.post('/edithousekeyword', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        keyword_desc = param.keyword_desc,
        modifier = param.modifier;
    HousesKeywordService.editHousesKeyword(id, keyword_desc, modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "编辑酒店亮点失败"});
    });
});
//更新关联于酒店关联的亮点状态
router.post('/destroyhouseskeywordstatus', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    HousesKeywordService.destroyHousesKeyword(id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "酒店亮点删除失败"});
    });
});
//添加酒店评论
router.post('/addhousecomment', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        comment_source = param.comment_source,
        content = param.content;
    HousesCommentService.addComment(houses_id, comment_source, content).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "评论添加失败"});
    });
});
//编辑酒店评论
router.post('/edithousecomment', (req, res, next)=> {
    let param = req.body;
    let id = param.houses_id,
        comment_source = param.comment_source,
        modifier = param.content;
    HousesCommentService.editComment(id, comment_source, modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "评论修改失败"});
    });
});
//删除酒店评论
router.post('/destroyhousecomment', (req, res, next)=> {
    let param = req.body;
    let id = param.houses_id;
    HousesCommentService.destroyComment(id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "评论删除失败"});
    });
});

//添加酒店
router.post('/addhouse', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        creater = param.creater,
        modifier = param.modifier,
        region = param.region,
        address = param.address,
        traffic_around = param.traffic_around,
        spots_around = param.spots_around,
        keywords = param.keywords,
        houses_desc = param.houses_desc;
    HousesService.addHouses(name, creater, modifier, region, address, traffic_around, spots_around, houses_desc, keywords).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "酒店添加失败"});
    });
});
//查询酒店列表
router.post('/findhouses', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        sys_id = param.sys_id,
        page = param.page,
        is_putaway = param.is_putaway,
        endDate = param.endDate,
        startDate = param.startDate;
    HousesService.findHousesList(page, startDate, endDate, is_putaway, name, sys_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "酒店查询失败"});
    })
});
//修改酒店上下架状态
router.post('/changehousesputaway', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        is_putaway = param.is_putaway,
        modifier = param.modifier;
    HousesService.changeHousesPutaway(id, is_putaway, modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "酒店查询失败"});
    });
});
//查询酒店详情
router.post('/findhousedetails', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    HousesService.findHouseDetails(id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "酒店详情查询失败"});
    });
});
//上传酒店附件
router.post('/addhouseattachlist', (req, res, next)=> {
    let param = req.body;
    let houses_id = param.houses_id,
        creater = param.creater,
        attachs = param.attachs;
    HousesAttachService.addHousesAttachList(houses_id, attachs, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "附近添加失败"});
    });
});
export default router;