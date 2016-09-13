import {HousesCombo} from './../../../../core';
class HousesComboService {
    /**
     * 添加套餐
     * @param houses_id
     * @param name
     * @param combo_desc
     * @param combo_begin_date
     * @param combo_end_date
     * @param price
     * @param creater
     * @returns {*}
     */
    addCombo(house_id,name,combo_desc,combo_begin_date,combo_end_date,price,creater){
        if(!house_id) return HousesCombo.errorPromise("参数格式不正确");
        return HousesCombo.transaction(t=>{
            return HousesCombo.insert(HousesCombo.createModel(house_id,name,combo_desc,combo_begin_date,combo_end_date,price,creater),{
                transaction:t,
            })
        });
    }

    /**
     * 编辑套餐
     * @param id
     * @param name
     * @param combo_desc
     * @param combo_begin_date
     * @param combo_end_date
     * @param price
     * @param modifier
     * @returns {*}
     */
    editCombo(id,name,combo_desc,combo_begin_date,combo_end_date,price,modifier){
        let updateObj = {};
        if(!id) return HousesCombo.errorPromise("参数格式不正确");
        name != void(0) && (updateObj.name = name);
        combo_desc != void(0) && (updateObj.combo_desc = combo_desc);
        combo_begin_date != void(0) && (updateObj.combo_begin_date = combo_begin_date);
        combo_end_date != void(0) && (updateObj.combo_end_date = combo_end_date);
        price != void(0) && (updateObj.price = price);
        modifier != void(0) && (updateObj.modifier = modifier);
        if(Object.keys(updateObj).length == 0) return HousesCombo.errorPromise("参数个数不正确");
        return HousesCombo.transaction(t=>{
            return HousesCombo.update(updateObj,{
                where:{id:id},
                transaction:t,
                lock: t.LOCK.UPDATE
            });
        }).then(result=>{
            return HousesCombo.findById(id,{
                attributes:['id','name','combo_begin_date','combo_end_date','combo_desc','price'],
            });
        }).then(combo=>{
            return HousesCombo.formatHouserCombo(combo.dataValues);
        });
    }

    /**
     * 查询套餐列表
     * @param house_id
     * @returns {*}
     */
    findComboList(house_id){
        let where = {houses_id:house_id};
        return HousesCombo.findList({
            where:where,
            attributes:['id','name','combo_begin_date','combo_end_date','combo_desc','price'],
        }).then(combolist=>{
            combolist.list.map(combo=>{
                HousesCombo.formatHouserCombo(combo.dataValues);
            });
            return combolist;
        });
    }

    /**
     * 删除套餐
     * @param id
     * @returns {*}
     */
    destroy(id){
        return HousesCombo.transaction(t=>{
            return HousesCombo.destroy({where:{id:id}});
        }).then(result=>{
            return result;
        });
    }
}
export default new HousesComboService();