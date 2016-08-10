import {Users} from './../../core';
import {UserOauthOpenid} from './../../core';
class UserService {
    async registry(openid) {
        return Users.transaction(t=> {
            let u;
            return Users.insert(Users.createModel(), {transaction: t})
                .then(user=> {
                    u = user;
                    return UserOauthOpenid.insert(UserOauthOpenid.createModel(user.id, openid), {transaction: t});
                }).then(useroauth=> {
                    return Object.assign(useroauth.dataValues, {user: u.dataValues});
                });
        });
    }

    findByOpenid(openid) {
        return Users.transaction(t=> {
            return UserOauthOpenid.findAll({where: {openid: openid}, lock: t.LOCK.UPDATE})
                .then(result=> {
                    let count = result.length;
                    if (count == 0) return this.registry(openid);
                    else {
                        let useroauth = result[0];
                        return Users.findById(useroauth.user_id,{lock: t.LOCK.UPDATE}).then(user=> {
                            return Object.assign(useroauth.dataValues, {user: user.dataValues});
                        });
                    }
                });
        });
    }
}
export default new UserService();