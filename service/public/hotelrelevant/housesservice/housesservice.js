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
            return Houses.insert(Houses.createModel(Houses.TYPE.HOTEL, name, creater, creater, region, address, traffic_around, spots_around, houses_desc), {
                transaction: t
            }).then(house=> {
                if(!keywords) return house;
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
        !!is_putaway && (is_putaway == Houses.ISPUTAWAY.NO || is_putaway == Houses.ISPUTAWAY.YES) && (where['is_putaway'] = is_putaway);
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
                    as: 'country_p',
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
     * 酒店详情
     * @param id
     * @returns {*|Promise.<T>}
     */
    findHouseDetails(id) {
        return Houses.findById(id, {
            include: [{
                model: HousesAttach.sequlize,
                attributes: ['id','links_url']
            }]
        }).then(result=> {
            if (!result) return Houses.errorPromise('酒店不存在!');
            Houses.formatHouse(result.dataValues);
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
        if (is_putaway != Houses.ISPUTAWAY.NO && is_putaway != Houses.ISPUTAWAY.YES) return Houses.errorPromise("状态值不正确");
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

    /**
     * 修改可预约状态
     * @param house_id
     * @param is_order
     */
    updateIsOrder(house_id,is_order,modifier){
        return Houses.transaction(t=>{
            return Houses.updateIsOrder(house_id,is_order,modifier,t);
        }).then(result=>{
            return Houses.findById(house_id);
        }).then(house=>{
            return Houses.formatHouse(house);
        });
    }

    /**
     * 模糊查询酒店
     * @param name
     * @returns {*}
     */
    vagueFindHouses(name, page = 1, pagesize = 10) {
        return Houses.findList({
            where: {
                name: {$like: `%${name}%`},
                type: 1,
            },
            limit: pagesize,
            offset: pagesize * (page - 1),
            attributes: ['id', 'name', 'is_orders']
        });
    }

    /**
     * 查询所有酒店
     * @returns {*}
     */
    findAll() {
        return Houses.findList({
            attributes: ['id', 'name', 'is_orders']
        });
    }

    /**
     * 通过区域查询酒店
     * @param state
     * @param country
     * @param region
     * @param page
     * @param pagesize
     */
    findRegionToHouseList(state,country,region,page,pagesize){
        let where = {$and:[]},
            include=[{
                model:SysDict.sequlize,
                attributes:['id','parent_id','name'],
                as:'regions',
                include:[{
                    model:SysDict.sequlize,
                    attributes:['id','parent_id','name'],
                    as:'country_p',
                    include:[{
                        model:SysDict.sequlize,
                        attributes:['id','parent_id','name'],
                        as:'state'
                    }]
                }]
            }];
        state != void(0) && (where.$and.push(SysDict.where(SysDict.col('regions.country_p.state.name'),'=',state)));
        country != void(0) && (where.$and.push(SysDict.where(SysDict.col('regions.country_p.name'),'=',country)));
        region != void(0) && (where.$and.push(SysDict.where(SysDict.col('regions.name'),'=',region)));
        return Houses.count({
            where:where,
            include:include,
        }).then(count=>{
            return Houses.findPage({
                where:where,
                include:include,
            },page,count,null,pagesize);
        }).then(houseslist=>{
            houseslist.list.map(house=>{
                Houses.formatHouse(house.dataValues);
                delete house.dataValues.regions;
            });
            return houseslist;
        });
    }
}
export default new HousesService();