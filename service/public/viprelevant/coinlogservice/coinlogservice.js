import {UsersCoinLog,UsersVip,UsersPayType} from './../../../../core';
class CoinLogService {
    /**
     * 充值前创建开始充值的日志记录
     * @param id
     * @param coin
     * @returns {*}
     */
    beforeRechargeLog(vip_id, sys_coin_id, coin) {
        return UsersVip.findById(vip_id).then(vip=> {
            if (!vip) return UsersVip.errorPromise("会员不存在");
            return vip;
        }).then(vip=> {
            return UsersCoinLog.transaction(t=> {
                return UsersPayType.insert(UsersPayType.weChatCreatModel(vip_id), {transaction: t})
                    .then(result=> {
                        let event_id = result && result.id;
                        return UsersCoinLog.rechargeLog(vip_id, sys_coin_id, coin, event_id, t);
                    });
            });
        });
    }
}
export default new CoinLogService();