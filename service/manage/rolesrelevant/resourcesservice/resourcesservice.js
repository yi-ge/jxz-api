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
        if(level != 1 && parent_id == void(0)) return SysResources.errorPromise("参数不正确");
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
     * 删除权限
     * @param id
     * @returns {*}
     */
    deleteResource(id){
        return SysResources.count({where:{parent_id:id}}).then(count=>{
            if(count != 0) return SysResources.errorPromise("不能删除,存在子权限");
            return count;
        }).then(()=>{
            return SysResources.transaction(t=>{
                return SysResources.destroy({where:{id:id},transaction:t});
            });
        });
    }

    /**
     * 查询所有权限
     * @returns {*}
     */
    findAllResource(){
        return SysResources.findList();
    }

    /**
     * 查询所有菜单权限
     * @returns {Promise.<T>}
     */
    findAllMenuResource() {
        let where = {type:SysResources.TYPE.MENU};
        return SysResources.findList({
            where:where,
        }).then(result=> {
            return result;
        });
    }

    /**
     * 查询权限下功能权限
     * @param id
     * @returns {*}
     */
    findMenuChildFacility(id){
        let where = {level:{$ne:1},parent_id:id,type:SysResources.TYPE.BUTTON};
        return SysResources.findList({where:where}).then(result=>{
            result.list.map(resource=>{
                SysResources.formatSysResources(resource.dataValues);
            });
            return result;
        });
    }
}
export default new ResourceService();