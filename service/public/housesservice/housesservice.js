import {Houses,HousesKeyword,SysHousesKeyword,SysUsers} from './../../../core';
class HousesService {
    /**
     * 创建系统酒店关键词
     * @param name
     * @param keyword_desc
     * @param picture
     * @param creater
     * @param modifier
     * @returns {*}
     */
    addSysHousesKeyword(name, picture, creater) {
        return SysHousesKeyword.transaction(t=> {
            return SysHousesKeyword.insert(SysHousesKeyword.createModel(name, null, picture, creater, creater), {transaction: t})
                .then(result=> {
                    return SysHousesKeyword.formatSysHousesKeyword(result);
                });
        });
    }

    /**
     * 编辑酒店亮点库
     * @param id
     * @param name
     * @param picture
     * @param modifier_id
     * @returns {Promise.<T>}
     */
    editSysHousesKeyword(id, name, picture, modifier) {
        return SysHousesKeyword.transaction(t=> {
            return SysHousesKeyword.update({
                name: name,
                picture: picture,
                modifier: modifier
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
        }).then(()=> {
            return SysHousesKeyword.findById(id);
        }).then(result=> {
            return SysHousesKeyword.formatSysHousesKeyword(result.dataValues);
        });
    }

    /**
     * 改变亮点状态
     * @param id
     * @param status
     * @returns {Promise.<T>}
     */
    changeSysHousesKeywordStatus(id, status, modifier) {
        if (status != 0 && status != 1) return SysHousesKeyword.errorPromise("状态更新不正确");
        return SysHousesKeyword.transaction(t=> {
            return SysHousesKeyword.update({
                status: status,
                modifier: modifier,
                updated_at: new Date(),
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            })
        }).then(()=> {
            return SysHousesKeyword.findById(id);
        }).then(result=> {
            return SysHousesKeyword.formatSysHousesKeyword(result.dataValues);
        });
    }

    /**
     * 查询系统关键字列表
     * @param page
     * @param startDate
     * @param endDate
     * @param pagesize
     * @returns {*|Promise.<T>}
     */
    findSysHousesList(page, startDate, endDate, pagesize) {
        let where = {};
        if (!!startDate && !!endDate) where['updated_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['updated_at'] = {$gte: startDate};
        else if (!!endDate) where['updated_at'] = {$lte: startDate};
        return SysHousesKeyword.count({where: where}).then(count=> {
            return SysHousesKeyword.findPage({
                where: where,
            }, page, count, 2, pagesize);
        }).then(result=> {
            result.list.map(keyword=> {
                SysHousesKeyword.formatSysHousesKeyword(keyword.dataValues);
            });
            return result;
        });
    }

    /**
     * 添加酒店亮点
     * @param houses_id
     * @param keyword_id
     * @param keyword_desc
     * @param creater
     * @returns {*}
     */
    addHousesKeyword(houses_id, keyword_id, keyword_desc, creater) {
        return HousesKeyword.transaction(t=> {
            return HousesKeyword.insert(HousesKeyword.createModel(houses_id, keyword_id, keyword_desc, creater, creater), {transaction: t})
                .then(result=> {
                    return HousesKeyword.formatHousesKeyword(result.dataValues);
                });
        });
    }

    /**
     * 改变酒店亮点状态
     * @param id
     * @param status
     * @param modifier
     * @returns {*}
     */
    changeHousesKeywordStatus(id,status,modifier){
        if(status != 1 && status != 0) return HousesKeyword.errorPromise('状态改变失败');
        return HousesKeyword.transaction(t=>{
           return HousesKeyword.update({
               status:status,
               modifier:modifier,
               updated_at:new Date()
           },{
               where:{id:id},
               transaction:t,
               lock: t.LOCK.UPDATE
           });
        }).then(()=>{
            return HousesKeyword.findById(id);
        }).then(result=>{
            return HousesKeyword.formatHouse(result.dataValues);
        });
    }
}
export default new HousesService();