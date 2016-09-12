/**
 * Created by NX on 2016/8/8.
 */
import housessolarterms from './housessolarterms.config';
import Base from './../base';

const STATUS = {
    NORMAL:1,
    DELETE:0,
    DISABLE:2
},SEASON = {
    SLACK:1, //淡季
    BUSY:2, //旺季
    PEAK:3 //高峰
},ISSETPRICE = {
    YES:1,
    NO:0
};

class HousesSolarTerms extends Base {
    constructor() {
        super("houses_solar_terms", housessolarterms, {
            tableName: 'houses_solar_terms'
        });
        this.STATUS = STATUS;
        this.SEASON = SEASON;
    }

    /**
     *
     * @param houses_id 酒店id
     * @param season 季节
     * @param name 节气名称
     * @param solar_terms_begin_date 节气开始时间
     * @param solar_terms_end_date 节气结束时间
     * @param creater 创建人
     * @param modifier 修改人
     * @param status
     * @returns {{id: number, houses_id: *, season: *, name: *, solar_terms_begin_date: *, solar_terms_end_date: *, creater: *, modifier: *, status: (*|number), created_at: Date, updated_at: Date}}
     */
    createModel(houses_id,season,name,solar_terms_begin_date,solar_terms_end_date,creater,modifier,status,is_set_price){
        let model = {
            id:this.generateId(),
            houses_id:houses_id,
            season:season,
            name:name,
            solar_terms_begin_date:solar_terms_begin_date,
            solar_terms_end_date:solar_terms_end_date,
            creater:creater,
            modifier:modifier,
            status:status || STATUS.NORMAL,
            is_set_price:is_set_price || ISSETPRICE.YES,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatHousesSolarTerms(terms){
        return terms;
    }

    /**
     * 获取节气查询条件
     * @param season
     * @returns {{}}
     */
    getWhereSeason(season){
        let where = {};
        switch (season){
            case SEASON.SLACK: where.season = SEASON.SLACK;break;
            case SEASON.BUSY: where.season = SEASON.BUSY;break;
            case SEASON.PEAK: where.season = SEASON.PEAK;break;
        }
        return where;
    }

    /**
     * 插入节气数据
     * @param model
     * @param option
     * @returns {*}
     */
    insert(model , option){
        let house_id = model.houses_id,
            stratDate = model.solar_terms_begin_date,
            endDate = model.solar_terms_end_date;
        return this.findList({
            where:{houses_id:house_id}
        }).then(list=>{
            let term,status;
            for(let i = 0, len = list.list.length ; i < len ; i++){
                term = list.list[i];
                if(!(term.solar_terms_begin_date > endDate || term.solar_terms_end_date < stratDate)){
                    status = true;
                    break;
                }
            }
            if(status) this.errorPromise("节气时间存在冲突");
            return list;
        }).then(()=>{
            return super.insert(model,option);
        });
    }

}

export default new HousesSolarTerms();