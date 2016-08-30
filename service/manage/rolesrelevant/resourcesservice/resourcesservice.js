import {SysResources} from './../../../../core';
class ResourceService {
    /**
     * 添加一级权限
     * @param name
     * @param res_desc
     * @param type
     * @param url
     * @param creater
     * @returns {*}
     */
    addOneResource(name, res_desc, url, creater) {
        return SysResources.transaction(t=> {
            return SysResources.insert(SysResources.createModel(name, res_desc, null, SysResources.TYPE.MENU, url, SysResources.ONE, creater, creater), {
                transaction: t
            });
        });
    }

    /**
     * 添加二级权限
     * @param name
     * @param res_desc
     * @param url
     * @param creater
     * @returns {*}
     */
    addSecondResource(name, res_desc, parent_id, url, creater) {
        return SysResources.transaction(t=> {
            return SysResources.insert(SysResources.createModel(name, res_desc, parent_id, SysResources.TYPE.MENU, url, SysResources.SECOND, creater, creater), {
                transaction: t
            });
        });
    }

    /**
     * 添加三级权限
     * @param name
     * @param res_desc
     * @param url
     * @param creater
     * @returns {*}
     */
    addThreeResource(name, res_desc, parent_id, url, creater) {
        return SysResources.transaction(t=> {
            return SysResources.insert(SysResources.createModel(name, res_desc, parent_id, SysResources.TYPE.MENU, url, SysResources.THREE, creater, creater), {
                transaction: t
            });
        });
    }

    /**
     * 添加功能权限
     * @param name
     * @param res_desc
     * @param level
     * @param parent_id
     * @param url
     * @param creater
     * @returns {*}
     */
    addFacilityResource(name, res_desc, level ,parent_id, url, creater){
        return SysResources.transaction(t=> {
            return SysResources.insert(SysResources.createModel(name, res_desc, parent_id, SysResources.TYPE.BUTTON, url, level , creater, creater), {
                transaction: t
            });
        });
    }
    /**
     * 添加权限
     * @param name
     * @param url
     * @param res_desc
     * @returns {*}
     */
    addResources(name, res_desc,level, parent_id, url, creater) {
        let $promise;
        switch (level){
            case SysResources.ONE:$promise = this.addOneResource(name, res_desc, url, creater);break;
            case SysResources.SECOND:$promise = this.addSecondResource(name, res_desc,parent_id, url, creater);break;
            case SysResources.THREE:$promise = this.addThreeResource(name, res_desc,parent_id, url, creater);break;
            default : $promise = SysResources.errorPromise('参数不正确');
        }
        return $promise;
    }

    /**
     * 修改权限状态
     * @param id
     * @param status
     * @returns {*}
     */
    updateResourceStatus(id, status,modifier) {
        return SysResources.transaction(t=> {
            return SysResources.update({
                status: status,
                updated_at: new Date(),
                modifier:modifier,
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return SysResources.findById(id);
        });
    }

    /**
     * 编辑权限
     * @param id
     * @param name
     * @param role_desc
     * @param set_type
     * @returns {Promise.<T>}
     */
    editResource(id, name, res_desc, url) {
        return SysResources.transaction(t=> {
            return SysResources.update({name: name, res_desc: res_desc, url: url, updated_at: new Date()}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
        }).then(()=> {
            return SysResources.findById(id);
        }).then(result=> {
            return SysResources.formatSysResources(result.dataValues);
        });
    }

    /**
     * 查询所有权限
     * @returns {Promise.<T>}
     */
    findAllResource() {
        return SysResources.findList({
            where:{level:SysResources.ONE,type:SysResources.TYPE.MENU},
            include:[{
                model:SysResources.sequlize,
                as:'second',
                include:[{
                    model:SysResources.sequlize,
                    as:'three',
                }]
            }]
        }).then(result=> {
            return result;
        });
    }
}
export default new ResourceService();