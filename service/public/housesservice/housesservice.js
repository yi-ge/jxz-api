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
                    console.log(result);
                    return SysHousesKeyword.formatSysHousesKeyword(result);
                });
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
                order: `updated_at DESC`,
                include: [{
                    model: SysUsers.sequlize,
                    attributes: ['id', 'user_name'],
                    as: 'creater_user'
                }, {
                    model: SysUsers.sequlize,
                    attributes: ['id', 'user_name'],
                    as: 'modifier_user'
                }]
            }, page, count, 2,pagesize).then(result=> {
                result.list.map(keyword=> {
                    SysHousesKeyword.formatSysHousesKeyword(keyword.dataValues);
                });
                return result;
            });
        });
    }


}
export default new HousesService();