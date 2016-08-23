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
        if(!houses_id) return HousesKeyword.errorPromise('酒店id不能为空');
        if(!keyword_id) return HousesKeyword.errorPromise('亮点库id不能为空');
        return HousesKeyword.transaction(t=> {
            return HousesKeyword.insert(HousesKeyword.createModel(houses_id, keyword_id, keyword_desc, creater, creater), {transaction: t})
        }).then(result=>{
            return HousesKeyword.findById(result.id,{
                include:[{
                    model:SysHousesKeyword.sequlize,
                }]
            });
        }).then(result=> {
            return HousesKeyword.formatHousesKeyword(result.dataValues);
        });
    }

    /**
     * 编辑关联酒店亮点
     * @param id
     * @param keyword_desc
     * @param modifier
     * @returns {Promise.<T>}
     */
    editHousesKeyword(id, keyword_id ,keyword_desc, modifier) {
        return HousesKeyword.transaction(t=> {
            return HousesKeyword.update({
                keyword_desc: keyword_desc,
                keyword_id: keyword_id,
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
            return HousesKeyword.formatHousesKeyword(result.dataValues);
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
}
export default new HousesKeywordService();