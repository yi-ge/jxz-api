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

    findCoinLogPageList(where,page,pagesize){
        return UsersCoinLog.count({where:where}).then(count=>{
            return UsersCoinLog.findPage({
                where:where,
                attributes:['id','created_at','event_name','coin_money',
                    [UsersVip.col('vip_user.account_name'),'account_name'],
                    [UsersVip.col('vip_user.user_name'),'user_name']
                ],
                order:`created_at DESC`,
                include:[{
                    model:UsersVip.sequlize,
                    attributes:[],
                    as:'vip_user'
                }]
            },page,count,2,pagesize);
        }).then(result=>{
            result.list.map(log=>{
                UsersCoinLog.formatUsersCoinLog(log.dataValues);
            });
            return result;
        });
    }


    findCoinLogPageListManage(startDate,endDate,account_name,page,pagesize){
        let where = {status:UsersCoinLog.STATUS.NORMAL};
        if (endDate != void(0)) {
            endDate = new Date(endDate);
            endDate = endDate.setDate(endDate.getDate() + 1);
            endDate = UsersCoinLog.formatDate(endDate, 'yyyy-MM-dd');
        }
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        !!account_name && (where.$and = [UsersVip.where(UsersVip.col('vip_user.account_name'),'=',account_name)]);
        return this.findCoinLogPageList(where,page,pagesize);
    }

    /**
     * 查询用户币日志
     * @param vip_id
     * @param page
     * @param pagesize
     */
    findCoinLog(vip_id,page,pagesize){
        let where = {user_id:vip_id,status:UsersCoinLog.STATUS.NORMAL};
        return this.findCoinLogPageList(where,page,pagesize);
    }

}
export default new CoinLogService();