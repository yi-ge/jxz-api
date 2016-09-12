import {UsersCoinLog,UsersVip} from './../../../../core';
class CoinLogService {
    /**
     * 充值前创建开始充值的日志记录
     * @param id
     * @param coin
     * @returns {*}
     */
    beforeRechargeLog(vip_id,sys_coin_id, coin) {
        return UsersVip.findById(vip_id).then(vip=>{
            if(!vip) return UsersVip.errorPromise("会员不存在");
            return vip;
        }).then(vip=>{
            return UsersCoinLog.transaction(t=> {
                return UsersCoinLog.rechargeLog(vip_id, sys_coin_id , coin, t);
            });
        });
    }
}
export default new CoinLogService();