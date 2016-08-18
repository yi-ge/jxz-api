import {Houses,HousesKeyword,SysHousesKeyword,HousesAttach,Articles} from './../../../core';
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
     * 编辑关联酒店亮点
     * @param id
     * @param keyword_desc
     * @param modifier
     * @returns {Promise.<T>}
     */
    editHousesKeyword(id, keyword_desc, modifier) {
        return HousesKeyword.transaction(t=> {
            return HousesKeyword.update({
                keyword_desc: keyword_desc,
                modifier: modifier,
                updated_at: new Date()
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return HousesKeyword.findById(id);
        }).then(result=> {
            return HousesKeyword.formatHouse(result.dataValues);
        });
    }

    /**
     * 改变酒店亮点状态
     * @param id
     * @param status
     * @param modifier
     * @returns {*}
     */
    changeHousesKeywordStatus(id, status, modifier) {
        if (status != 1 && status != 0) return HousesKeyword.errorPromise('状态改变失败');
        return HousesKeyword.transaction(t=> {
            return HousesKeyword.update({
                status: status,
                modifier: modifier,
                updated_at: new Date()
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return HousesKeyword.findById(id);
        }).then(result=> {
            return HousesKeyword.formatHouse(result.dataValues);
        });
    }

    /**
     * 批量添加酒店关键词
     * @param houses_id
     * @param keywords
     * @param creater
     * @returns {*}
     */
    addHousesKeywordList(houses_id, keywords, creater) {
        let insertList = [];
        if (Object.prototype.toString.call(keywords) == '[object Array]') {
            keywords.map(keyword=> {
                insertList.push(HousesKeyword.createModel(houses_id, keyword.keyword_id, keyword.keyword_desc, creater, creater));
            });
        }
        return HousesKeyword.transaction(t=> {
            return HousesKeyword.bulkCreate(insertList, {
                transaction: t,
            });
        });
    }

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
                return this.addHousesKeywordList(house.id, keywords, creater).then(()=> {
                    return house;
                });
            });
        });
    }

    /**
     * 批量添加附件
     * @param houses_id
     * @param attachs [title,links_url,file_path]
     * @param creater
     */
    addHousesAttachList(houses_id, attachs, creater) {
        let insertList = [];
        if (Object.prototype.toString.call(attachs) == '[object Array]') {
            attachs.map(keyword=> {
                insertList.push(HousesAttach.createModel(houses_id, 1, keyword.title, keyword.links_url, creater, creater, keyword.file_path));
            });
        }
        return HousesAttach.transaction(t=> {
            return HousesAttach.bulkCreate(insertList, {
                transaction: t
            })
        });
    }

    /**
     * 添加指定酒店附件
     * @param houses_id
     * @param title
     * @param links_url
     * @param creater
     * @param file_path
     * @returns {*}
     */
    addHousesAttach(houses_id, title, links_url, creater, file_path) {
        return HousesAttach.transaction(t=> {
            return HousesAttach.insert(HousesAttach.createModel(houses_id, 1, title, links_url, creater, creater, file_path), {
                transaction: t
            });
        })
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
     *
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
}
export default new HousesService();