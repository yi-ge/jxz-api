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
    addCombo(houses_id,name,combo_desc,combo_begin_date,combo_end_date,price,creater){
        return HousesCombo.transaction(t=>{
            return HousesCombo.insert(HousesCombo.createModel(houses_id,name,combo_desc,combo_begin_date,combo_end_date,price,creater),{
                transaction:t,
            })
        });
    }

    editCombo(id,name,combo_desc,combo_begin_date,combo_end_date,price,modifier){
        return HousesCombo.transaction(t=>{

        });
    }
}
export default new HousesComboService();