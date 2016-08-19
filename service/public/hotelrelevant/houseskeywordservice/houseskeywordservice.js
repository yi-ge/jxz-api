import {HousesKeyword,SysHousesKeyword} from './../../../../core';
class HousesKeywordService {
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
     * 删除亮点
     * @param id
     * @returns {*}
     */
    destroyHousesKeyword(id){
        return HousesKeyword.transaction(t=>{
            return HousesKeyword.destroy({where:{id:id}});
        })
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
        return HousesKeyword.addHousesKeywordList(houses_id, keywords, creater);
    }
}
export default new HousesKeywordService();