import express from "express";
import {RegionService} from './../../../service/wetchat';
const router = express.Router();
//查询区域（洲和关联的国家）
router.post('/findstateandcountry', (req, res, next)=> {
    let param = req.body;
    next({
        $promise: RegionService.findStateAndCountry(),
        msg: '编辑区域失败'
    });
});
export default router;