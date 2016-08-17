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
            return Users.update({
                    user_name: username,
                    sex: sex,
                    avatar: avatar,
                    updated_at: new Date(),
                },
                {
                    where: {id: user_id},
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                }
            ).then(users=> {
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
        if (!openid) return UsersOpenid.errorPromise("openid不能为空");
        return UsersOpenid.findOnlyOne({
            where: {openid: openid},
        }).then(result=> {
            if (!result) return this.registryJXZ(openid, username, sex, avatar);
            return this.updateJXZ(result.user_id, username, Users.getSexValue(sex), avatar).then(()=> {
                return result;
            });
        });
    }

    /**
     * 获取用户列表 分页(只是jxz)
     * @param page
     * @returns {*}
     */
    findJXZList(page, sortType, user_name, is_cover, pagesize) {
        let where = {user_vip_id: {$eq: null}};
        !!user_name && (where['user_name'] = user_name);
        !!is_cover && (where['is_cover'] = is_cover);
        return Users.count({where: where}).then(count=> {
            return Users.findPage(Object.assign({
                    where: where,
                }, sortType ? {order: `article_num ${sortType == 1 ? `ASC` : `DESC`}`} : {}),
                page, count, sortType, pagesize);
        }).then(result=> {
            result.list.map(user=> {
                Users.formatUser(user);
            });
            return result;
        });
    }

    /**
     * 修改用户的封面写手状态
     * @param id
     * @param is_cover
     * @returns {*}
     */
    updateJXZCover(id, is_cover) {
        if (is_cover != 0 && is_cover != 1) return Users.errorPromise("is_cover值不正确");
        return Users.transaction(t=> {
            return Users.update({is_cover: is_cover,updated_at:new Date()}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
        }).then(()=> {
            return Users.findById(id);
        }).then(result=> {
            return Users.formatUser(result.dataValues);
        });
    }

}
export default new UserService();