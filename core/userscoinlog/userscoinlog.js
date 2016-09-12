/**
 * Created by NX on 2016/8/8.
 */
import userscoinlog from './userscoinlog.config';
import Base from './../base';

const EVENT = {
    TYPE: {
        RECHARGE: { //充值
            VALUE: 1,
            TEMPLATE: "会员充值"
        },
        RESERVE: {//预订
            VALUE: 2,
            TEMPLATE: "预订#酒店名称#消费使用"
        },
        RETURN: {//退还
            VALUE: 3,
            TEMPLATE: '退还精选币'
        }
    }
}, STATUS = {
    DELETE: 0,
    NORMAL: 1,
    LOCKUP: 2,
};

class UsersCoinLog extends Base {
    constructor() {
        super("users_coin_log", userscoinlog, {
            tableName: 'users_coin_log'
        });
        this.EVENT = EVENT;
        this.STATUS = STATUS;
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
    createModel(user_id, coin_money, event_type, event_name, event_id, event_mode, status, creater, modifier) {
        let model = {
            id: this.generateId(),
            user_id: user_id,
            coin_money: coin_money,
            event_type: event_type,
            event_name: event_name,
            event_id: event_id,
            event_mode: event_mode,
            creater: creater,
            modifier: modifier,
            created_at: new Date(),
            updated_at: new Date(),
            status: status || STATUS.LOCKUP
        };
        return model;
    }

    formatUsersCoinLog(log) {
        log.created_at != void(0) && (log.created_at = this.formatDate(log.created_at, "yyyy-MM-dd hh:mm:ss"));
        log.updated_at != void(0) && (log.updated_at = this.formatDate(log.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return log;
    }

    /**
     * 会员充值日志
     * @param user_id
     * @param coin_money
     * @param sys_coin_id 充值档次
     * @param t
     * @returns {Promise.<Instance>}
     */
    rechargeLog(vip_id, coin_money,sys_coin_id, t) {
        let RECHARGE = EVENT.TYPE.RECHARGE;
        return this.insert(this.createModel(vip_id,coin_money,RECHARGE.VALUE,RECHARGE.TEMPLATE,null,sys_coin_id,STATUS.LOCKUP,vip_id,vip_id), {
            transaction: t
        });
    }

    /**
     * 充值成功以后改变状态为充值
     * @param id
     * @param t
     * @returns {*}
     */
    rechargeLogSuccess(id, t) {
        return this.findById(id).then(log=> {
            if (!log) return this.errorPromise("没有该订单记录");
            return this.update({
                status: STATUS.NORMAL
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        });
    }

    /**
     * 充值失败以后 记录变为delete
     * @param id
     * @param t
     * @returns {*}
     */
    rechargeLogFail(id, t) {
        return this.findById(id).then(log=> {
            if (!log) return this.errorPromise("没有该订单记录");
            return this.update({
                status: STATUS.DELETE
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        });
    }
}

export default new UsersCoinLog();