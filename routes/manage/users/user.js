import express from "express";
import {UsersService} from './../../../service/manage';
const router = express.Router();
//获取JXZ列表
router.post('/userlist', (req, res, next)=> {
    let page = req.body.page, sortType = req.body.sortType,
        user_name = req.body.user_name,
        is_cover = req.body.is_cover;
    UsersService.findJXZList(page, sortType, user_name, is_cover).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "用户查询失败"});
    });
});
//切换封面写手
router.post('/updatecover', (req, res, next)=> {
    let id = req.body.id, is_cover = req.body.is_cover;
    UsersService.updateJXZCover(id, is_cover).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "状态切换失败"});
    });
});

export default router;