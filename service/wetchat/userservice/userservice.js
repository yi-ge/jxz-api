import {Users,UserOauthOpenid} from './../../../core';
class UserService {
    registry(openid) {
        return Users.transaction(t=> {
            let u;
            return Users.insert(Users.createModel(), {transaction: t})
                .then(user=> {
                    u = user;
                    return UserOauthOpenid.insert(UserOauthOpenid.createModel(user.id, openid), {transaction: t});
                }).then(useroauth=> {
                    return Object.assign(UserOauthOpenid.formatUsersOauthOpenid(useroauth.dataValues), {user: Users.formatUser(u.dataValues)});
                });
        });
    }

    findByOpenid(openid) {
        return UserOauthOpenid.transaction(t=> {
            return UserOauthOpenid.findAll({
                    where: {openid: openid},
                    include: [{model:Users.sequlize}],
                    transation: t,
                    lock: t.LOCK.UPDATE,
                })
                .then(result=> {
                    if (result.length == 0) return this.registry(openid);
                    return Object.assign(UserOauthOpenid.formatUsersOauthOpenid(result[0].dataValues), {user: Users.formatUser(result[0].user.dataValues)});
                });
        });
    }
}
export default new UserService();