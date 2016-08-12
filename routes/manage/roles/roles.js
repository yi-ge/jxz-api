import express from "express";
import {RolesService} from './../../../service/manage';
const router = express.Router();

//添加角色
router.post('/addroles', (req, res, next)=> {
    let param = req.body;
    console.log(param);
    RolesService.addRole(param.name, param.role_desc, param.set_type).then(result=> {
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: "角色添加失败"});
    });
});

router.post('addresources', (req, res, next)=> {
    let param = req.body;
    console.log(param);
    RolesService.addResources(param.name, param.url, param.res_desc).then(result=> {
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: "权限添加失败"});
    })
});

export default router;