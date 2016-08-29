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
     * 查询vip列表
     * @param page
     * @param sortType
     * @param pagesize
     */
    findVipList(page, sortType = 1, pagesize = 20) {
        let where = {};
        return UsersVip.count({where: where}).then(count=> {
            return UsersVip.findPage({
                where: where
            }, page, count, sortType, pagesize);
        }).then(result=> {
            result.list.map(vip=> {
                UsersVip.formatUserVip(vip.dataValues);
            });
            return result;
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
     * 会员注册（微信）
     * @param account_name
     * @param users_id
     * @param password
     * @returns {*}
     */
    registerVip(account_name, users_id, password) {
        return UsersVip.findAccountName(account_name).then(vip=> {
            if (!!vip) return UsersVip.errorPromise('用户已存在');
            return UsersVip.transaction(t=> {
                return UsersVip.insert(UsersVip.createModel(account_name, null, null, 2, password, 0, 1), {
                    transaction: t,
                }).then(vip=> {
                    return Users.update({user_vip_id: vip.id}, {
                        where: {id: users_id},
                        transaction: t,
                        lock: t.LOCK.UPDATE
                    }).then(()=> {
                        return vip;
                    });
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
                return Users.update({user_vip_id: vip.id}, { //关联新用户
                    where: {id: users_id},
                    transaction: t,
                    lock: t.LOCK.UPDATE
                }).then(()=> {
                    UsersVip.update({is_cover: 1}, { //绑定精选者
                        where: {
                            account_name: account_name,
                            passwd: UsersVip.encrypMD5(password)
                        },
                        transaction: t,
                        lock: t.LOCK.UPDATE
                    });
                });
            }).then(()=> {
                return vip;
            });
        });
    }
}
export default new VipService();