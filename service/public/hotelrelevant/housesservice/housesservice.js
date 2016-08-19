import {Houses,HousesKeyword,SysHousesKeyword,HousesAttach,Articles} from './../../../../core';
class HousesService {
    /**
     * 添加酒店
     * @param name
     * @param creater
     * @param modifier
     * @param region
     * @param address
     * @param traffic_around
     * @param spots_around
     * @param houses_desc
     * @returns {*}
     */
    addHouses(name, creater, modifier, region, address, traffic_around, spots_around, houses_desc, keywords) {
        return Houses.transaction(t=> {
            return Houses.insert(Houses.createModel(1, name, creater, modifier, region, address, traffic_around, spots_around, houses_desc), {transaction: t}).then(result=> {
                return result;
            }).then(house=> {
                return HousesKeyword.addHousesKeywordList(house.id, keywords, creater).then(()=> {
                    return house;
                });
            });
        });
    }
    /**
     * 查询酒店 分页
     * @param page
     * @param startDate
     * @param endDate
     * @param is_putaway
     * @param name
     * @param sys_id
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findHousesList(page, startDate, endDate, is_putaway, name, sys_id, pagesize) {
        let where = {};
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        !!is_putaway && (is_putaway == 0 || is_putaway == 1) && (where['is_putaway'] = is_putaway);
        !!name && (where['name'] = {$like: `%${name}%`});
        !!sys_id && (where['creater'] = sys_id);
        return Houses.count({where: where}).then(count=> {
            return Houses.findPage({where: where,}, page, count, 2, pagesize);
        }).then(result=> {
            result.list.map(house=> {
                Houses.formatHouse(house.dataValues);
            });
            return result;
        });
    }
    /**
     * 酒店上下架状态
     * @param id
     * @param is_putaway
     */
    changeHousesPutaway(id, is_putaway, modifier) {
        if (is_putaway != 0 && is_putaway != 1) return Houses.errorPromise('状态传递不正却');
        return Houses.transaction(t=> {
            return Houses.update({
                is_putaway: is_putaway,
                modifier: modifier,
                updated_at: new Date(),
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return Houses.findById(id);
        }).then(result=> {
            return Houses.formatHouse(result.dataValues);
        });
    }
    /**
     * 查询酒店详情 (加上亮点)
     * @param id
     * @returns {*|Promise.<T>}
     */
    findHouseDetails(id){
        return Houses.findById(id,{
            include:[{
                model:HousesKeyword.sequlize,
                include:[{
                    model:SysHousesKeyword.sequlize
                }]
            }]
        }).then(result=>{
            return Houses.formatHouse(result.dataValues);
        });
    }
}
export default new HousesService();