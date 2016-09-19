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
        CHANGE_RESERVE:{ //变更预订
            VALUE:4,
            TEMPLATE:'变更预订#酒店名称#消费使用'
        },
        RETURN: {//退还
            VALUE: 3,
            TEMPLATE: '退还精选币'
        }
    }
}, STATUS = {
    DELETE: 0,//删除
    NORMAL: 1,//正常
    LOCKUP: 2,//锁定
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
    createModel(user_id, coin_money, event_type, event_name, event_id, event_mode, status, coin_rule, creater, modifier) {
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
            coin_rule: coin_rule,
            status: status || STATUS.LOCKUP
        };
        return model;
    }

    formatUsersCoinLog(log) {
        log.created_at != void(0) && (log.created_at = this.formatDate(log.created_at, "yyyy-MM-dd hh:mm:ss"));
        log.updated_at != void(0) && (log.updated_at = this.formatDate(log.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return log;
    }

    getOrderStatus(status){
        let where = {};
        switch (status){
            case STATUS.DELETE:where.status = STATUS.DELETE;break;
            case STATUS.NORMAL:where.status = STATUS.NORMAL;break;
            case STATUS.DISABLE:where.status = STATUS.DISABLE;break;
            case STATUS.CHANGE_RESERVE:where.status = STATUS.CHANGE_RESERVE;break;
        }
        return where;
    }

    /**
     * 会员充值日志
     * @param user_id
     * @param coin_money
     * @param sys_coin_id 充值档次引用
     * @param t
     * @returns {Promise.<Instance>}
     */
    rechargeLog(vip_id, sys_coin_id, coin_money,event_id, t) {
        let RECHARGE = EVENT.TYPE.RECHARGE;
        return this.insert(this.createModel(vip_id, coin_money, RECHARGE.VALUE, RECHARGE.TEMPLATE, event_id, null, STATUS.LOCKUP, sys_coin_id, vip_id, vip_id), {
            transaction: t
        });
    }

    /**
     * 预约酒店消费使用日志
     * @param vip_id
     * @param coin_money
     * @param house_name
     * @param order_id
     * @param creater
     * @param t
     * @returns {Promise.<Instance>}
     */
    appointmentLog(vip_id,coin_money,house_name ,order_id,creater,t){
        let RESERVE = EVENT.TYPE.RESERVE;
        let template = RESERVE.TEMPLATE.replace("#酒店名称#",`#${house_name}#`);
        console.log(-Math.abs(coin_money));
        return this.insert(this.createModel(vip_id, -Math.abs(coin_money),RESERVE.VALUE,template,order_id,null,STATUS.NORMAL,null,creater,creater),{
            transaction:t
        });
    }

    /**
     * 变更预订消费日志
     * @param vip_id
     * @param coin_money
     * @param house_name
     * @param order_id
     * @param creater
     * @param t
     * @returns {Promise.<Instance>}
     */
    changeAppointmentLog(vip_id,coin_money,house_name ,order_id,creater,t){
        let CHANGE_RESERVE = EVENT.TYPE.CHANGE_RESERVE;
        let template = CHANGE_RESERVE.TEMPLATE.replace("#酒店名称#",`#${house_name}#`);
        return this.insert(this.createModel(vip_id, coin_money,CHANGE_RESERVE.VALUE,template,order_id,null,STATUS.NORMAL,null,creater,creater),{
            transaction:t
        });
    }

    /**
     * 退还精选币
     * @param vip_id
     * @param coin_money
     * @param order_id
     * @param creater
     * @param t
     * @returns {Promise.<Instance>}
     */
    cancelLog(vip_id,coin_money,order_id,creater,t){
        let RETURN = EVENT.TYPE.RETURN;
        return this.insert(this.createModel(vip_id, coin_money,RETURN.VALUE,RETURN.TEMPLATE,order_id,null,STATUS.NORMAL,null,creater,creater),{
            transaction:t
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

    /**
     * 统计预约总共消耗多少精选币
     * @param event_id
     */
    sumMoney(event_id){
        return this.findOnlyOne({
            where:Object.assign({
                event_id:event_id,
                event_type:{$in:[EVENT.TYPE.RESERVE.VALUE,EVENT.TYPE.CHANGE_RESERVE.VALUE]}
            },this.getOrderStatus(STATUS.NORMAL)),
            attributes:[[this.databaseFn("SUM",this.col('coin_money')),'moneys']]
        }).then(result=>{
            return result.moneys || result.dataValues.moneys;
        });
    }

    /**
     * 日志失效
     * @param event_id
     * @param t
     * @returns {*}
     */
    abateLog(event_id,t){
        return this.update(this.getOrderStatus(STATUS.DELETE),{
            where:{event_id:event_id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }

}

export default new UsersCoinLog();