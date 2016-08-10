import {Users} from './../../core';
import {UserOauthOpenid} from './../../core';
class UserService {
    registry(openid) {
        return Users.transaction((t)=> {
            return Users.insert(Users.createModel(), {transaction: t})
                .then(user=> {
                    return UserOauthOpenid.transaction(t1=> {
                        return UserOauthOpenid.insert(UserOauthOpenid.createModel(user.dataValues.id,openid), {transaction: t1});
                    }).then(useroauth=> {
                        return Object.assign(useroauth.dataValues, {user: user.dataValues});
                    });
                });
        })
    }
}
export default new UserService();