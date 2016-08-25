import {Houses,HousesKeyword,SysHousesKeyword,HousesAttach,Articles,SysDict} from './../../../../core';
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
    addHouses(name, creater, region, address, traffic_around, spots_around, houses_desc, keywords) {
        return Houses.transaction(t=> {
            return Houses.insert(Houses.createModel(1, name, creater, creater, region, address, traffic_around, spots_around, houses_desc), {
                transaction: t
            }).then(house=> {
                return HousesKeyword.addHousesKeywordList(house.id, keywords, creater, t).then(()=> {
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
     * 编辑酒店
     * @param id
     * @param name
     * @param modifier
     * @param region
     * @param address
     * @param traffic_around
     * @param spots_around
     * @param houses_desc
     * @returns {*|Promise.<T>}
     */
    editHouse(id, name, modifier, region, address, traffic_around, spots_around, houses_desc) {
        return Houses.transaction(t=> {
            return Houses.update({
                name: name,
                modifier: modifier,
                region: region,
                address: address,
                traffic_around: traffic_around,
                spots_around: spots_around,
                houses_desc: houses_desc,
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
        }).then(()=> {
            return this.findHouseDetails(id);
        });
    }

    /**
     * 查询酒店详情 后台列表进入后的详情 (加上亮点)
     * @param id
     * @returns {*|Promise.<T>}
     */
    findManageHouseDetails(id) {
        return Houses.findById(id, {
            include: [{
                model: HousesKeyword.sequlize,
                attributes: ['id', 'keyword_desc'],
                include: [{
                    attributes: ['id', 'name', 'picture'],
                    model: SysHousesKeyword.sequlize
                }]
            }, {
                model: SysDict.sequlize,
                attributes: ['id', 'name'],
                as: 'regions',
                include: [{
                    model: SysDict.sequlize,
                    attributes: ['id', 'name'],
                    as: 'country',
                    include: [{
                        model: SysDict.sequlize,
                        attributes: ['id', 'name'],
                        as: 'state',
                    }]
                }]
            }]
        }).then(result=> {
            if (!result) return Houses.errorPromise('酒店不存在');
            return Houses.formatHouse(result.dataValues);
        });
    }

    /**
     *
     * @param id
     * @returns {*|Promise.<T>}
     */
    findHouseDetails(id) {
        return Houses.findById(id, {
            include: [{
                model: HousesAttach.sequlize,
                attributes: ['id', 'houses_id', 'links_url']
            }]
        }).then(result=> {
            if (!result) return Houses.errorPromise('酒店不存在!');
            Houses.formatHouse(result.dataValues);
            result.houses_attaches.map(attach=> {
                HousesAttach.formatHousesAttach(attach.dataValues);
            });
            return result;
        });
    }

    /**
     * 改变酒店上下架状态
     * @param id
     * @param is_putaway
     * @returns {Promise.<T>}
     */
    putaway(id, is_putaway, modifier) {
        if (is_putaway != 0 && is_putaway != 1) return Houses.errorPromise("状态值不正确");
        return Houses.transaction(t=> {
            return Houses.update({
                is_putaway: is_putaway,
                modifier: modifier,
                updated_at: new Date(),
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
        }).then(()=> {
            return Houses.findById(id);
        }).then(result=> {
            return Houses.formatHouse(result.dataValues);
        });
    }
}
export default new HousesService();