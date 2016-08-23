import {Users,UsersOpenid,UsersAt} from './../../../core';
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
    getInfo(id){
        if(!id) return Users.errorPromise('用户id不能为空');
        return Users.findById(id).then(result=>{
            return Users.formatUser(result.dataValues);
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
            include:[{
                model:Users.sequlize,
                attributes:['id','user_vip_id']
            }]
        }).then(useropenid=> {
            if (!useropenid) return this.registryJXZ(openid, username, sex, avatar); //useropenid不存在
            else if(!useropenid.user){  // 存在openi 不存在user
                return Users.transaction(t=>{
                    return Users.insert(Users.createModel(username, sex, avatar),{transaction:t}).then(user=>{
                        console.log(user);
                        return UsersOpenid.update({
                            user_id:user.id
                        },{
                            where:{id:useropenid.id},
                            transaction:t,
                            lock: t.LOCK.UPDATE
                        });
                    }).then(()=>{
                        return useropenid;
                    });
                });
            }
            return useropenid;
        }).then(result=>{
            return Users.formatUser(result);
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
            return Users.update({is_cover: is_cover, updated_at: new Date()}, {
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