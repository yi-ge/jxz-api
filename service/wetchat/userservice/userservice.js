import {Users,UsersOpenid} from './../../../core';
class UserService {

    /**
     * 通过微信openid注册＃选者
     * @param openid
     * @returns {*}
     */
    registryJXZ(openid, username, sex, avatar) {
        return Users.transaction(t=> {
            if (!openid) throw new Error("openid不能为空");
            return Users.insert(Users.createModel(username, sex, avatar), {transaction: t}).then(user=> {
                //插入一条用户数据
                return UsersOpenid.insert(UsersOpenid.createModel(user.id, openid), {transaction: t});
            }).then(wetchatuser=> {
                //微信openid关联用户
                return UsersOpenid.formatUsersOpenid(wetchatuser.dataValues);
            }).catch(e=> {
                console.log(e);
            });
        });
    }

    /**
     * 修改精选者信息
     * @param openid
     * @returns {*}
     */
    updateJXZ(user_id, username, sex, avatar) {
        return Users.transaction(t=> {
            return Users.update(
                {user_name: username, sex: sex, avatar: avatar, updated_at: new Date()},
                {where: {id: user_id}, transaction: t})
                .then(users=> {
                    return users;
                });
        });
    }

    /**
     * 通过微信openid查询精选者 不存在就创建 存在如果有修改则同步数据库修改
     * @param openid
     * @returns {*}
     */
    findJXZToOpenid(openid, username, sex, avatar) {
        return UsersOpenid.transaction(t=> {
            if (!openid) throw new Error("openid不能为空");
            return UsersOpenid.findAll({
                where: {openid: openid},
                transaction: t,
            }).then(result=> {
                let user_openid = result[0];
                if (result.length == 0) return this.registryJXZ(openid, username, sex, avatar);
                return this.updateJXZ(user_openid.user_id, username, sex, avatar).then(()=>{
                    return user_openid;
                });
            });
        });
    }
}
export default new UserService();