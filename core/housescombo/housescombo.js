/**
 * Created by NX on 2016/8/8.
 */
import housescombo from './housescombo.config';
import Base from './../base';

class HousesCombo extends Base {
    constructor() {
        super("houses_combo", housescombo, {
            tableName: 'houses_combo'
        });
    }

    /**
     *
     * @param houses_id 房屋ID
     * @param name 套餐名字
     * @param combo_desc 套餐描述
     * @param combo_begin_date 套餐开始时间
     * @param combo_end_date 套餐结束时间
     * @param price 价格
     * @param creater
     * @param modifier
     * @param status 状态1正常0删除2未启用
     * @returns {{id: number, houses_id: *, name: *, combo_desc: *, combo_begin_date: *, combo_end_date: *, price: *, creater: *, modifier: *, status: *, created_at: Date, updated_at: Date}}
     */
    createModel(houses_id,name,combo_desc,combo_begin_date,combo_end_date,price,creater,modifier,status){
        let model = {
            id:this.generateId(),
            houses_id:houses_id,
            name:name,
            combo_desc:combo_desc,
            combo_begin_date:combo_begin_date,
            combo_end_date:combo_end_date,
            price:price,
            creater:creater,
            modifier:modifier,
            status:status,
            created_at:new Date(),
            updated_at: new Date(),
        };
        return model;
    }

    formatHouserCombo(combo){
        return combo;
    }
}

export default new HousesCombo();