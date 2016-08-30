import {UsersVip,Users} from './../../../core';
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
     * vip详情
     * @param id
     */
    vipDetails(id) {
        return UsersVip.findById(id).then(vip=> {
            if (!vip)return UsersVip.errorPromise("不存在改会员");
            return UsersVip.formatUserVip(vip.dataValues);
        });
    }

    /**
     * 获取为绑定的vip用户
     * @param page
     * @param sortType
     * @param pagesize
     */
    findNotBindVip(page, startDate, endDate, user_status, account_name, pagesize = 20) {
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
        return UsersVip.findAccountName(account_name).then(vip=> {
            if (!!vip) return UsersVip.errorPromise('用户已存在');
            return UsersVip.transaction(t=> {
                console.log(password);
                return UsersVip.insert(UsersVip.createModel(account_name, null, null, 2, password, UsersVip.NORECHARGE, UsersVip.BINDING), {
                    transaction: t,
                }).then(vip=> {
                    return Users.relationVip(users_id, vip.id, t); //绑定vip
                });
            });
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
            else return UsersVip.findOnlyOne({
                where: {
                    account_name: account_name,
                    passwd: UsersVip.encrypMD5(password)
                }
            });
        }).then(vip=> {
            if (!vip) return UsersVip.errorPromise("密码错误");
            else return Users.transaction(t=> {
                return Users.relationVip(users_id, vip.id, t) //users关联vip
                    .then(()=> {
                        return UsersVip.updateBindStatus(account_name, UsersVip.BINDING, t);//改变vip为绑定状态
                    });
            }).then(()=> {
                return vip;
            });
        });
    }

    /**
     * 修改vip的基本信息 前端
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
     * 重置密码 前端
     * @returns {*}
     */
    resizePassword(account_name, password) {
        if(!account_name || !password) return UsersVip.errorPromise('参数不正确');
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
}
export default new VipService();