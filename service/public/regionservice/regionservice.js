import {SysDict,SysUsers} from './../../../core';

const config = {
    type: 1,//区域
    StateLevel: 1,//州 第一级
    countryLevel: 2,//国 第二级
    regionLevel: 3 //区域 第三级
};
class RegionService {
    /**
     * 新增大洲
     * @param name
     * @returns {*}
     */
    addState(name, creater) {
        return SysDict.transaction(t=> {
            return SysDict.insert(SysDict.createModel(null, name, 1, null, null, 1, creater, creater), {transaction: t}).then(state=> {
                return SysDict.formatSysDict(state);
            });
        });
    }

    /**
     * 添加国家
     * @param name
     * @param parent_id
     * @param creater
     * @returns {*}
     */
    addCountry(name, state_id, creater) {
        return SysDict.transaction(t=> {
            return SysDict.insert(SysDict.createModel(null, name, 1, null, state_id, 2, creater, creater), {transaction: t}).then(state=> {
                return SysDict.formatSysDict(state);
            });
        });
    }

    /**
     * 添加区域
     * @param name
     * @param parent_id
     * @param create
     * @returns {*}
     */
    addRegion(name, country_id, creater) {
        return SysDict.transaction(t=> {
            return SysDict.insert(SysDict.createModel(null, name, 1, null, country_id, 3, creater, creater), {transaction: t}).then(state=> {
                return SysDict.formatSysDict(state);
            });
        });
    }

    /**
     * 查询洲列表
     * @returns {Promise.<T>}
     */
    findStateList() {
        return SysDict.findList({
            where: {type: 1, level: 1},
            include: [{
                model: SysUsers.sequlize,
                attributes: ['account_name', 'user_name', 'id'],
                as: 'creater_user'
            }, {
                model: SysUsers.sequlize,
                attributes: ['account_name', 'user_name', 'id'],
                as: 'modifier_user'
            }]
        }).then(result=> {
            return SysDict.formatSysDict(result);
        });
    }

    /**
     * 查询国家
     * @param page
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findCountryList(page, pagesize) {
        let where = {type: 1, level: 2};
        return SysDict.count({where: where}).then(count=> {
            return SysDict.findPage({
                where: where,
                include: [{
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'creater_user'
                }, {
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'modifier_user'
                }, {
                    model: SysDict.sequlize,
                    as: 'sys_dict_parent',
                    attributes: ['id', 'name'],
                }]
            }, page, count, null, pagesize).then(result=> {
                result.list.map(country=> {
                    SysDict.formatSysDict(country);
                });
                return result;
            });
        });
    }

    /**
     * 通过洲 查询国家
     * @param state_id
     * @returns {Promise.<T>}
     */
    findCountryToState(state_id) {
        let where = {type: 1, level: 2, parent_id: state_id};
        return SysDict.findList({
            where: where,
            attributes: ['id', 'name'],
        }).then(result=> {
            return result;
        });
    }

    /**
     * 查询区域列表
     * @param page
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findRegionList(page, pagesize) {
        let where = {type: 1, level: 3};
        return SysDict.count({where: where}).then(count=> {
            return SysDict.findPage({
                where: where,
                include: [{
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'creater_user',
                }, {
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'modifier_user',
                }, {
                    model: SysDict.sequlize,
                    as: 'sys_dict_parent',
                    attributes: ['id', 'name'],
                    include: [{
                        model: SysDict.sequlize,
                        as: 'sys_dict_parent',
                        attributes: ['id', 'name'],
                    }]
                }]
            }, page, count, null, pagesize).then(result=> {
                //result.list(region=> {
                //    SysDict.formatSysDict(region);
                //});
                return result;
            });
        });
    }

    /**
     * 更新大洲
     * @param state_id
     * @param name
     * @param modifier
     * @returns {Promise.<T>}
     */
    editState(state_id, name, modifier) {
        console.log(state_id, name, modifier);
        return SysDict.transaction(t=> {
            return SysDict.update({name: name, modifier: modifier, updated_at: new Date()}, {
                where: {id: state_id, type: 1, level: 1},
                transaction: t,
                lock: t.LOCK.UPDATE
            })
        }).then(()=> {
            return SysDict.findById(state_id, {
                model: SysUsers.sequlize,
                attributes: ['account_name', 'user_name', 'id'],
                as: 'creater_user',
            }, {
                model: SysUsers.sequlize,
                attributes: ['account_name', 'user_name', 'id'],
                as: 'modifier_user',
            });
        }).then(result=> {
            return SysDict.formatSysDict(result);
        }).catch(e=> {
            console.log(e);
            throw e;
        });
    }

    /**
     * 编辑国家
     * @param country_id
     * @param name
     * @param state_id
     * @param modifier
     * @returns {Promise.<T>}
     */
    editCountry(country_id, name, state_id, modifier) {
        return SysDict.transaction(t=> {
            return SysDict.update({name: name, parent_id: state_id, modifier: modifier, updated_at: new Date()}, {
                where: {id: country_id, type: 1, level: 2},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return SysDict.findById(country_id, {
                include: [{
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'creater_user',
                }, {
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'modifier_user',
                }, {
                    model: SysDict.sequlize,
                    as: 'sys_dict_parent',
                    attributes: ['id', 'name'],
                }]
            });
        }).then(result=> {
            return SysDict.formatSysDict(result);
        });
    }

    /**
     * 更新区域
     * @param region_id
     * @param name
     * @param country_id
     * @param modifier
     * @returns {Promise.<T>}
     */
    editRegion(region_id, name, country_id, modifier) {
        return SysDict.transaction(t=> {
            return SysDict.update({name: name, parent_id: country_id, modifier: modifier, updated_at: new Date()}, {
                where: {id: region_id, type: 1, level: 3},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return SysDict.findById(region_id, {
                include: [{
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'creater_user',
                }, {
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'modifier_user',
                }, {
                    model: SysDict.sequlize,
                    as: 'sys_dict_parent',
                    attributes: ['id', 'name'],
                    include: [{
                        model: SysDict.sequlize,
                        as: 'sys_dict_parent',
                        attributes: ['id', 'name'],
                    }]
                }]
            });
        }).then(result=> {
            return SysDict.formatSysDict(result);
        });
    }
}
export default new RegionService();