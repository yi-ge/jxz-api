/**
 * Created by NX on 2016/8/8.
 */
import syscoin from './syscoin.config';
import Base from './../base';
const STATUS={
    NORMAL:1,
    DISABLE:2
};
class SysCoin extends Base {
    constructor() {
        super("sys_coin", syscoin, {
            tableName: 'sys_coin'
        });
        this.STATUS = STATUS;
    }

    createModel(level,name,rule_money,get_coin,creater,modifier){
        let model = {
            id:this.generateId(),
            level:level,
            name:name,
            rule_money:rule_money,
            get_coin:get_coin,
            status:STATUS.NORMAL,
            creater:creater,
            modifier:modifier,
            creater:new Date(),
            modifier:new Date()
        };
        return model;
    }

    formatSysCoin(coin){
        coin.created_at != void(0) && (coin.created_at = this.formatDate(coin.created_at, "yyyy-MM-dd hh:mm:ss"));
        coin.updated_at != void(0) && (coin.updated_at = this.formatDate(coin.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return coin;
    }
}

export default new SysCoin();