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
    addCountry(name, parent_id, creater) {
        return SysDict.transaction(t=> {
            return SysDict.insert(SysDict.createModel(null, name, 1, null, parent_id, 2, creater, creater), {transaction: t}).then(state=> {
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
    addRegion(name, parent_id, creater) {
        return SysDict.transaction(t=> {
            return SysDict.insert(SysDict.createModel(null, name, 1, null, parent_id, 3, creater, creater), {transaction: t}).then(state=> {
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
            include: {
                model: SysUsers.sequlize,
                attributes: ['account_name', 'user_name', 'id'],
            }
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
                }, {
                    model: SysDict.sequlize,
                    as:'sys_dict_parent'
                }]
            }, page, count, null, pagesize).then(result=> {
                result.list.map(country=> {
                    SysDict.formatSysDict(country);
                });
                return result;
            });
        });
    }

    findCountryToState(state_id){
        let where = {type: 1, level: 1,id:state_id};
        return SysDict.findList({
            where:where,
            include:[{
                model: SysUsers.sequlize,
                attributes: ['account_name', 'user_name', 'id'],
            },{
                model: SysDict.sequlize,
                as:'sys_dict_child'
            }],
        }).then(result=>{
            return result;
        });
    }

}
export default new RegionService();