/**
 * Created by NX on 2016/8/8.
 */
import syscoin from './syscoin.config';
import Base from './../base';
const STATUS={
    NORMAL:1, //启用
    DISABLE:2 //禁用
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
            created_at:new Date(),
            updated_at:new Date()
        };
        return model;
    }

    formatSysCoin(coin){
        coin.created_at != void(0) && (coin.created_at = this.formatDate(coin.created_at, "yyyy-MM-dd hh:mm:ss"));
        coin.updated_at != void(0) && (coin.updated_at = this.formatDate(coin.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return coin;
    }

    /**
     * 获取数据状态对象
     * @param status
     * @returns {{status: *}}
     */
    getStatusObj(status){
        let obj = {};
        switch (status){
            case STATUS.NORMAL:obj.status = STATUS.NORMAL;break;
            case STATUS.DISABLE:obj.status = STATUS.DISABLE;break;
            default : obj.status = STATUS.DISABLE;break;
        }
        return obj;
    }

    /**
     * 改变状态
     * @param id
     * @param status
     */
    changeStatus(id,status,modifier,t){
        return this.update(Object.assign({
            modifier:modifier
        },this.getStatusObj(status)),{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }
}

export default new SysCoin();