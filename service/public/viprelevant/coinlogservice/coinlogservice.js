import {UsersCoinLog} from './../../../../core';
class CoinLogService {
    /**
     * 充值前创建开始充值的日志记录
     * @param id
     * @param coin
     * @returns {*}
     */
    beforeRechargeLog(vip_id, coin) {
        return UsersCoinLog.transaction(t=> {
            UsersCoinLog.rechargeLog(vip_id, coin, t);
        });
    }
}
export default new CoinLogService();