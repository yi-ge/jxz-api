import {HousesSolarTerms} from './../../../../core';
class HousesSolarTermsService {
    /**
     * 添加节气
     * @param house_id
     * @param season
     * @param name
     * @param solar_terms_begin_date
     * @param solar_terms_end_date
     * @param creater
     * @returns {*}
     */
    addHousesSolarTerms(house_id,season,name,solar_terms_begin_date,solar_terms_end_date,creater){
        return HousesSolarTerms.transaction(t=>{
            return HousesSolarTerms.insert(HousesSolarTerms.createModel(house_id,season,name,solar_terms_begin_date,solar_terms_end_date,creater,creater),{
                transaction:t
            });
        });
    }

    /**
     * 编辑节气
     * @param id
     * @param solar_terms_begin_date
     * @param solar_terms_end_date
     * @param modifier
     * @returns {*}
     */
    editHousesSolarTerms(id,solar_terms_begin_date,solar_terms_end_date,modifier){
        let updateObj = {};
        solar_terms_begin_date != void(0) && (updateObj.solar_terms_begin_date = solar_terms_begin_date);
        solar_terms_end_date != void(0) && (updateObj.solar_terms_end_date = solar_terms_end_date);
        if(!id || Object.keys(updateObj).length == 0 )return HousesSolarTerms.errorPromise("参数不正确");
        return HousesSolarTerms.transaction(t=>{
            return HousesSolarTerms.update({
                solar_terms_begin_date:solar_terms_begin_date,
                solar_terms_end_date:solar_terms_end_date,
                modifier:modifier,
                updated_at:new Date(),
            },{
                where:{id:id},
                transaction:t,
                lock: t.LOCK.UPDATE
            });
        }).then(result=>{
            return HousesSolarTerms.findById(id);
        }).then(term=>{
            return HousesSolarTerms.formatHousesSolarTerms(term);
        });
    }

    /**
     * 删除当前节气
     * @param id
     * @returns {*}
     */
    destroyHousesSolarTerms(id){
        return HousesSolarTerms.transaction(t=>{
           return HousesSolarTerms.destroy({where:{id:id}});
        });
    }

    /**
     * 查询对应酒店节气
     * @param house_id
     * @returns {*}
     */
    findHousesSolarTermsList(house_id){
        return HousesSolarTerms.findList({
            where:{houses_id:house_id}
        }).then(list=>{
            list.list.map(term=>{
                HousesSolarTerms.formatHousesSolarTerms(term);
            });
            return list;
        });
    }
}
export default new HousesSolarTermsService();