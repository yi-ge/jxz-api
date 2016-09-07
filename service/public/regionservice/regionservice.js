import {SysDict,SysUsers} from './../../../core';
class RegionService {
    /**
     * 新增大洲
     * @param name
     * @returns {*}
     */
    addState(name, creater) {
        return SysDict.count({where:{name:name,type:SysDict.CONFIG.REGION,level:SysDict.STATE}}).then(count=>{
            if(count!=0) return SysDict.errorPromise("大洲已存在");
            return count;
        }).then(()=>{
            return SysDict.transaction(t=> {
                return SysDict.insert(SysDict.createModel(null, name, SysDict.CONFIG.REGION, null, null, SysDict.STATE, creater, creater), {transaction: t}).then(state=> {
                    return SysDict.formatSysDict(state.dataValues);
                });
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
            return SysDict.insert(SysDict.createModel(null, name, SysDict.CONFIG.REGION, null, state_id, SysDict.COUNTRY, creater, creater), {transaction: t}).then(state=> {
                return SysDict.formatSysDict(state.dataValues);
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
            return SysDict.insert(SysDict.createModel(null, name,SysDict.CONFIG.REGION, null, country_id, SysDict.REGION, creater, creater), {transaction: t}).then(state=> {
                return SysDict.formatSysDict(state.dataValues);
            });
        });
    }

    /**
     * 查询洲列表
     * @returns {Promise.<T>}
     */
    findStateList() {
        return SysDict.findList({
            where: {type: SysDict.CONFIG.REGION, level: SysDict.STATE},
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
            result.list.map(state=>{
                SysDict.formatSysDict(state.dataValues);
            });
            return result;
        });
    }

    /**
     * 查询国家
     * @param page
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findCountryList(page, pagesize) {
        let where = {type: SysDict.CONFIG.REGION, level: SysDict.COUNTRY};
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
                    as: 'state',
                    attributes: ['id', 'name'],
                }]
            }, page, count, null, pagesize).then(result=> {
                result.list.map(country=> {
                    SysDict.formatSysDict(country.dataValues);
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
        let where = {type: SysDict.CONFIG.REGION, level: SysDict.COUNTRY, parent_id: state_id};
        return SysDict.findList({
            where: where,
            attributes: ['id', 'name'],
        }).then(result=> {
            result.list.map(country=> {
                SysDict.formatSysDict(country.dataValues);
            });
            return SysDict.formatSysDict(result);
        });
    }

    /**
     * 查询洲 和它下面的国家
     * @returns {*}
     */
    findStateAndCountry(){
        let where = {type:SysDict.CONFIG.REGION,level:SysDict.STATE};
        return SysDict.findList({
            where:where,
            attributes: ['id', 'name'],
            include:[{
                model:SysDict.sequlize,
                as:'country',
                attributes: ['id', 'name'],
            }]
        });
    }

    /**
     * 通过国家查询区域
     * @param country_id
     * @returns {*|Promise.<T>}
     */
    findRegionToCountry(country_id){
        let where = {type: SysDict.CONFIG.REGION, level: SysDict.REGION,parent_id:country_id};
        return SysDict.findList({
            where:where,
            attributes:['id','name'],
        }).then(result=>{
            result.list.map(region=> {
                SysDict.formatSysDict(region.dataValues);
            });
            return SysDict.formatSysDict(result);
        });
    }

    /**
     * 查询区域列表
     * @param page
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findRegionList(page, pagesize) {
        let where = {type: SysDict.CONFIG.REGION, level: SysDict.REGION};
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
                    as: 'country',
                    attributes: ['id', 'name'],
                    include: [{
                        model: SysDict.sequlize,
                        as: 'state',
                        attributes: ['id', 'name'],
                    }]
                }]
            }, page, count, null, pagesize).then(result=> {
                result.list.map(region=> {
                    SysDict.formatSysDict(region.dataValues);
                });
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
        return SysDict.transaction(t=> {
            return SysDict.update({name: name, modifier: modifier, updated_at: new Date()}, {
                where: {id: state_id, type: SysDict.CONFIG.REGION, level: SysDict.STATE},
                transaction: t,
                lock: t.LOCK.UPDATE
            })
        }).then(()=> {
            return SysDict.findById(state_id, {
                include: [{
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'creater_user',
                }, {
                    model: SysUsers.sequlize,
                    attributes: ['account_name', 'user_name', 'id'],
                    as: 'modifier_user',
                }]
            });
        }).then(result=> {
            return SysDict.formatSysDict(result.dataValues);
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
                where: {id: country_id, type: SysDict.CONFIG.REGION, level: SysDict.COUNTRY},
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
                    as: 'state',
                    attributes: ['id', 'name'],
                }]
            });
        }).then(result=> {
            return SysDict.formatSysDict(result.dataValues);
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
                where: {id: region_id, type: SysDict.CONFIG.REGION, level: SysDict.REGION},
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
                    as: 'country',
                    attributes: ['id', 'name'],
                    include: [{
                        model: SysDict.sequlize,
                        as: 'state',
                        attributes: ['id', 'name'],
                    }]
                }]
            });
        }).then(result=> {
            return SysDict.formatSysDict(result.dataValues);
        });
    }
}
export default new RegionService();