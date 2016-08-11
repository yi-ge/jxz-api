import {Users,UsersOpenid} from './../../../core';
class UserService {
    /**
     * 通过微信openid注册＃选者
     * @param openid
     * @returns {*}
     */
    registryJXZ(openid) {
        return UsersOpenid.transaction(t=> {
            return UsersOpenid.insert(UsersOpenid.createModel(openid), {transation: t})
                .then(result=> {
                    return UsersOpenid.formatUsersOpenid(result);
                });
        });
    }

    /**
     * 通过微信openid查询精选者 不存在就创建
     * @param openid
     * @returns {*}
     */
    findJXZToOpenid(openid) {
        return UsersOpenid.transaction(t=> {
            return UsersOpenid.findAll({
                where: {openid: openid},
                transation: t,
                lock: t.LOCK.UPDATE,
            }).then(result=> {
                if (result.length == 0) return this.registryJXZ(openid);
                return UsersOpenid.formatUsersOpenid(result[0].dataValues);
            });
        });
    }
}
export default new UserService();