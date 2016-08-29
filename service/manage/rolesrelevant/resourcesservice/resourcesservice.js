import {SysResources} from './../../../../core';
class ResourceService {
    /**
     * 添加权限
     * @param name
     * @param url
     * @param res_desc
     * @returns {*}
     */
    addResources(name, url, res_desc) {
        return SysResources.transaction(t=> {
            return SysResources.insert(SysResources.createModel(name, url, res_desc), {
                transaction: t
            }).then(resources=> {
                return SysResources.formatSysResources(resources.dataValues);
            });
        });
    }

    /**
     * 修改权限状态
     * @param id
     * @param status
     * @returns {*}
     */
    updateResourceStatus(id, status) {
        return SysResources.transaction(t=> {
            return SysResources.update({status: status,updated_at:new Date()}, {
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
        return SysResources.findList().then(result=> {
            return result;
        });
    }
}
export default new ResourceService();