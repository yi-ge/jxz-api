/**
 * Created by NX on 2016/8/8.
 */
import userscoinlog from './userscoinlog.config';
import Base from './../base';

const EVENT = {
    TYPE:{
        RECHARGE:{ //充值
            VALUE:1,
            TEMPLATE:"会员充值"
        },
        RESERVE:{//预订
            VALUE:2,
            TEMPLATE:"预订#酒店名称#消费使用"
        },
        RETURN:{//退还
            VALUE:3,
            TEMPLATE:'退还精选币'
        }
    }
};

class UsersCoinLog extends Base {
    constructor() {
        super("users_coin_log", userscoinlog, {
            tableName: 'users_coin_log'
        });
    }

    /**
     *
     * @param user_id 用户ID
     * @param coin_money 金额
     * @param event_type 事件类型
     * @param event_name 事件名称
     * @param event_id 事件id
     * @param event_mode 事件方式
     * @param creater 创建人
     * @param modifier 修改人
     * @returns {{id: number, user_id: *, coin_money: *, event_type: *, event_name: *, event_id: *, event_mode: *, creater: *, modifier: *, created_at: Date, updated_at: Date, status: number}}
     */
    createModel(user_id,coin_money,event_type,event_name,event_id,event_mode,creater,modifier){
        let model = {
            id:this.generateId(),
            user_id:user_id,
            coin_money:coin_money,
            event_type:event_type,
            event_name:event_name,
            event_id:event_id,
            event_mode:event_mode,
            creater:creater,
            modifier:modifier,
            created_at:new Date(),
            updated_at:new Date(),
            status:0
        };
        return model;
    }

    formatUsersCoinLog(log){
        log.created_at != void(0) && (log.created_at = this.formatDate(log.created_at, "yyyy-MM-dd hh:mm:ss"));
        log.updated_at != void(0) && (log.updated_at = this.formatDate(log.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return log;
    }

    /**
     * 会员充值日志
     * @param user_id
     * @param coin_money
     * @param t
     * @returns {Promise.<Instance>}
     */
    rechargeLog(user_id,coin_money,t){
        let RECHARGE = EVENT.TYPE.RECHARGE;
        return this.insert(this.createModel(user_id,coin_money,RECHARGE.VALUE,RECHARGE.TEMPLATE,null,null,user_id,user_id),{
            transaction:t
        });
    }
}

export default new UsersCoinLog();