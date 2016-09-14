import {UsersVip,Users,UsersCoinLog} from './../../../../core';
class VipService {
    /**
     * 录入vip用户（后台）
     * @param account_name
     * @param user_name
     * @param email
     * @param sex
     * @returns {*}
     */
    createVip(account_name, user_name, email, sex, password) {
        return UsersVip.findAccountName(account_name).then(vip=> {
            if (!!vip) return UsersVip.errorPromise('用户已存在');
            return UsersVip.transaction(t=> {
                return UsersVip.insert(UsersVip.createModel(account_name, user_name, email, sex, password, 0, 0), {
                    transaction: t,
                }).then(result=> {
                    return UsersVip.formatUserVip(result.dataValues);
                });
            });
        });
    }


    /**
     * vip详情(后台)
     * @param id
     */
    vipDetails(id) {
        return UsersVip.findById(id).then(vip=> {
            if (!vip)return UsersVip.errorPromise("不存在该会员");
            return UsersVip.formatUserVip(vip.dataValues);
        });
    }

    /**
     * 获取为绑定的vip用户（后台）
     * @param page
     * @param sortType
     * @param pagesize
     */
    findNotBindVip(page, startDate, endDate, user_status, account_name, pagesize) {
        let where = {};
        !!user_status && (where['user_status'] = user_status);
        !!account_name && (where['account_name'] = {$like: `%${account_name}%`});
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        return UsersVip.count({where: where}).then(count=> {
            return UsersVip.findPage({
                where: where,
            }, page, count, 1, pagesize);
        }).then(result=> {
            result.list.map(vip=> {
                UsersVip.formatUserVip(vip.dataValues);
            });
            return result;
        });
    }

    /**
     * 会员注册（微信）
     * @param account_name
     * @param users_id
     * @param password
     * @returns {*}
     */
    registerVip(account_name, users_id, password) {
        if (!users_id) return UsersVip.errorPromise("精选者id格式不正确");
        return Users.findById(users_id).then(user=> {
            if (user.user_vip_id) return Users.errorPromise("已经有会员账号,不能重复注册");
            return user;
        }).then(()=> {
            let returnVip;
            return UsersVip.findAccountName(account_name).then(vip=> {
                if (!!vip) return UsersVip.errorPromise('用户已存在');
                returnVip = vip;
                return vip;
            }).then(() => {
                return UsersVip.transaction(t=> {
                    return UsersVip.insert(UsersVip.createModel(account_name, null, null, 2, password, UsersVip.NORECHARGE, UsersVip.BINDING), {
                        transaction: t,
                    }).then(vip=> {
                        returnVip = vip;
                        return Users.relationVip(users_id, vip.id, t); //绑定vip
                    }).then(result=>{
                        return UsersVip.formatUserVip(returnVip.dataValues);
                    });
                });
            });
        });
    }

    /**
     * 通过精选者获得会员信息 （微信）
     * @param id
     * @param user_id
     */
    defaultLogin(id, user_id) {
        if (typeof id != 'number') return Users.errorPromise("未绑定会员");
        return Users.findById(user_id).then(user=> {
            if (!user) return Users.errorPromise("精选者不存在");
            if (user.user_vip_id != id) return Users.errorPromise("精选着绑定会员与获取会员不相同");
            return user;
        }).then(()=> {
            return UsersVip.findById(id, {
                attribute: {exclude: "passwd"}
            });
        }).then(vip=> {
            return UsersVip.formatUserVip(vip.dataValues);
        });
    }

    /**
     * 会员登陆 （微信）
     * @param account_name
     * @param users_id
     * @param password
     * @returns {Promise.<T>}
     */
    loginVip(account_name, users_id, password) {
        return UsersVip.findAccountName(account_name).then(vip=> {
            if (!vip) return UsersVip.errorPromise("用户不存在");
            else if (vip.is_cover == UsersVip.BINDING)return UsersVip.errorPromise("登陆失败,已绑定精选者");
            else {
                return UsersVip.findOnlyOne({
                    where: {
                        account_name: account_name,
                        passwd: UsersVip.encrypMD5(password)
                    }
                });
            }
        }).then(vip=> {
            if (!vip) return UsersVip.errorPromise("密码错误");
            else return Users.transaction(t=> {
                return Users.relationVip(users_id, vip.id, t) //users关联vip
                    .then(()=> {
                        return UsersVip.updateBindStatus(account_name, UsersVip.BINDING, t);//改变vip为绑定状态
                    });
            }).then(()=> {
                return UsersVip.formatUserVip(vip.dataValues);
            });
        });
    }

    /**
     * 修改vip的基本信息 (微信)
     * @param user_name
     * @param email
     * @returns {*}
     */
    modifyInfo(account_name, user_name, email) {
        let update = {};
        if (!account_name) return UsersVip.errorPromise('账号格式不正确');
        user_name != void(0) && (update.user_name = user_name);
        email != void(0) && (update.email = email);
        return UsersVip.findAccountName(account_name).then(vip=> {
            if (!vip) return UsersVip.errorPromise('用户不存在');
            return UsersVip.transaction(t=> {
                return UsersVip.update(update, {
                    where: {account_name: account_name},
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });
            });
        });
    }

    /**
     * 重置密码 （微信）
     * @returns {*}
     */
    resizePassword(account_name, password) {
        if (!account_name || !password) return UsersVip.errorPromise('参数不正确');
        return UsersVip.findAccountName(account_name).then(vip=> {
            if (!vip) return UsersVip.errorPromise('用户不存在');
            return UsersVip.transaction(t=> {
                return UsersVip.update({
                    passwd: UsersVip.encrypMD5(password),
                }, {
                    where: {account_name: account_name},
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });
            });
        });
    }

    /**
     * 会员充值
     * @param id
     * @param coin
     * @returns {*}
     */
    rechargeCoin(id, order_id, coin, status) {
        if (status != 200) {
            return UsersVip.transaction(t=> {
                return UsersCoinLog.rechargeLogFail(order_id, t);
            }).then(()=> {
                return UsersVip.errorPromise("充值失败");
            });
        }
        return UsersCoinLog.findById(order_id).then(order=>{
            if(order.status == UsersCoinLog.STATUS.DELETE) return UsersCoinLog.errorPromise("订单已取消");
            if(order.status == UsersCoinLog.STATUS.NORMAL) return UsersCoinLog.errorPromise("订单已支付");
            return UsersVip.transaction(t=> {
                return UsersVip.rechargeCoin(id, coin, t).then(result=> {
                    return UsersCoinLog.rechargeLogSuccess(order_id, t);
                });
            });
        });
    }
}
export default new VipService();