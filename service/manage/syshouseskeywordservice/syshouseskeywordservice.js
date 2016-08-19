import {SysHousesKeyword} from './../../../core';
class SysHousesKeywordService {
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
    findSysHousesKeywordList(page, startDate, endDate, pagesize) {
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
     * 查询所有亮点
     * @returns {*}
     */
    findSysHousesKeyWordAll(){
        return SysHousesKeyword.findList({
            where:{status:1}
        }).then(result=>{
            result.list.map(keyword=> {
                SysHousesKeyword.formatSysHousesKeyword(keyword.dataValues);
            });
            return result;
        });
    }

}
export default new SysHousesKeywordService();