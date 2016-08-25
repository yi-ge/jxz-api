import {Users,UsersOpenid,UsersAt,UsersVip} from './../../../core';
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
                    last_login_date: new Date(),
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
     * 通过id 查询精选者
     * @param id
     * @returns {*|Promise.<T>}
     */
    getInfo(id) {
        if (!id) return Users.errorPromise('用户id不能为空');
        return Users.findById(id).then(result=> {
            return Users.formatUser(result.dataValues);
        });
    }

    /**
     * 通过微信openid查询精选者 不存在就创建 存在如果有修改则同步数据库修改 （微信端服务）
     * @param openid
     * @returns {*}
     */
    findJXZToOpenid(openid, username, sex, avatar) {
        if (!openid) return UsersOpenid.errorPromise("openid不能为空");
        return UsersOpenid.findOnlyOne({
            where: {openid: openid},
            include: [{
                model: Users.sequlize,
                attributes: ['id', 'user_vip_id']
            }]
        }).then(useropenid=> {
            if (!useropenid) return this.registryJXZ(openid, username, sex, avatar); //useropenid不存在
            else if (!useropenid.user) {  // 存在openi 不存在user
                return Users.transaction(t=> {
                    return Users.insert(Users.createModel(username, sex, avatar), {
                        transaction: t
                    }).then(user=> {
                        return UsersOpenid.updateUsersId(useropenid.id, user.id, t);
                    }).then(()=> {
                        return useropenid;
                    });
                });
            }
            return useropenid;
        }).then(result=> {
            return Users.formatUser(result);
        });
    }

    /**
     * 获取用户列表 分页(只是jxz  后台服务)
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
     * 修改用户的封面写手状态 (后台服务)
     * @param id
     * @param is_cover
     * @returns {*}
     */
    updateJXZCover(id, is_cover) {
        if (is_cover != 0 && is_cover != 1) return Users.errorPromise("is_cover值不正确");
        return Users.transaction(t=> {
            return Users.updateCoverStatus(id, is_cover, t);
        }).then(()=> {
            return Users.findById(id, {
                include: [{
                    model: UsersVip.sequlize
                }]
            });
        }).then(result=> {
            result.users_vip && UsersVip.formatUserVip(result.users_vip.dataValues);
            return Users.formatUser(result.dataValues);
        });
    }

    /**
     * 关注别人
     * @param user_id
     * @param at_user_id
     * @returns {*}
     */
    atUsers(user_id, at_user_id) {
        return UsersAt.count({
            where: {
                user_id: user_id,
                at_user_id: at_user_id
            }
        }).then((count)=> {
            if (count != 0) return UsersAt.errorPromise('不能重复关注');
            return UsersAt.transaction(t=> {
                return UsersAt.insert(UsersAt.createModel(user_id, at_user_id), {transaction: t}).then(result=> {
                    return result;
                })
            });
        });
    }

    /**
     * 取消关注
     * @param user_id
     * @param at_user_id
     * @returns {*}
     */
    cancelAt(user_id,at_user_id){
        return UsersAt.transaction(t=>{
            return UsersAt.destroy({
                where:{
                    user_id:user_id,
                    at_user_id:at_user_id
                },
                transaction:t
            });
        });
    }

    /**
     * 是否关注用户
     * @param user_id
     * @param at_user_id
     * @returns {*|Promise.<T>}
     */
    isAtUser(user_id, at_user_id) {
        return UsersAt.count({
            where: {
                user_id: user_id,
                at_user_id: at_user_id
            }
        }).then(count=> {
            if (count != 0) return {isat: true};
            else return {isat: false};
        });
    }

    /**
     * 统计我关注的
     * @param id
     * @returns {*}
     */
    countUserAt(id){
        return UsersAt.count({where:{user_id:id,}});
    }

    /**
     * 统计关注我的
     * @param id
     */
    countAtUser(id){
        return UsersAt.count({where:{at_user_id:id}});
    }
}
export default new UserService();