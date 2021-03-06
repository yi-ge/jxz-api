import {Users,UsersOpenid,UsersAt,UsersVip,SysInform} from './../../../core';
class UserService {
    /**
     * 通过微信openid注册＃选者
     * @param openid
     * @returns {*}
     */
    registryJXZ(openid, username, sex, avatar) {
        let u;
        return Users.transaction(t=> {
            if (!openid) throw new Error("openid不能为空");
            return Users.insert(Users.createModel(username, sex, avatar), {transaction: t}).then(user=> {
                //插入一条用户数据
                u = user;
                return UsersOpenid.insert(UsersOpenid.createModel(user.id, openid), {transaction: t});
            }).then(wetchatuser=> {
                //微信openid关联用户
                wetchatuser.dataValues.user = u;
                return UsersOpenid.formatUsersOpenid(wetchatuser.dataValues);
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
     * 查询关联了vip的用户(后台)
     * @param page
     * @param sortType
     * @param startDate
     * @param endDate
     * @param user_status vip表中充值状态状态
     * @param is_cover 是否是封面 users表中
     * @param vip_account_name vip 账号
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findUserToVipList(page, sortType, startDate, endDate, user_status, vip_account_name ,is_cover, pagesize) {
        let where = {user_vip_id: {$ne: null}};
        !!is_cover && (where['is_cover'] = is_cover);
        !!user_status && (where['$and'] = UsersVip.where(UsersVip.col('users_vip.user_status'),'=',user_status));
        !!vip_account_name && (where['$and'] = UsersVip.where(UsersVip.col('users_vip.account_name'),'like',`%${vip_account_name}%`));
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        return Users.count({where: where, include: {model: UsersVip.sequlize}}).then(count=> {
            return Users.findPage(Object.assign({
                    where: where,
                    include: {model: UsersVip.sequlize},
                }, sortType ? {order: `article_num ${sortType == 1 ? `ASC` : `DESC`}`} : {}),
                page, count, sortType, pagesize);
        }).then(result=> {
            result.list.map(users=> {
                Users.formatUser(users.dataValues);
                UsersVip.formatUserVip(users.users_vip && users.users_vip.dataValues);
            });
            return result;
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
                model: Users.sequlize
            }]
        }).then(useropenid=> {
            let user; //精选者
            if (!useropenid) return this.registryJXZ(openid, username, sex, avatar); //useropenid不存在
            else if (!useropenid.user) {  // 存在openi 不存在user
                return Users.transaction(t=> {
                    return Users.insert(Users.createModel(username, sex, avatar), { //添加精选者
                        transaction: t
                    }).then(user=> {
                        user = user;
                        return UsersOpenid.updateUsersId(useropenid.id, user.id, t);
                    });
                }).then(()=>{
                    return Users.findById(user.id);
                }).then(user=>{
                    useropenid.dataValues.user = user;
                    return useropenid;
                });
            }
            return useropenid;
        }).then(result=> {
            return Users.formatUser(result.user.dataValues);
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
    atUsers(id, at_user_id) {
        if(id == void(0) || at_user_id == void(0)) return UsersAt.errorPromise('参数不正确');
        if(id == at_user_id) return UsersAt.errorPromise('不能关注自己');
        return UsersAt.count({
            where: {
                user_id: id,
                at_user_id: at_user_id
            }
        }).then((count)=> {
            if (count != 0) return UsersAt.errorPromise('不能重复关注');
            return UsersAt.transaction(t=> {
                let returnResult;
                return UsersAt.insert(UsersAt.createModel(id, at_user_id), {transaction: t}).then(result=> {
                    returnResult = result;
                    return result;
                }).then(()=>{
                    //关注信息存入数据库 用户动态可查
                    return SysInform.userToUserMsg(SysInform.TYPE.CONCERN,id,at_user_id,"关注",null,null,t);
                }).then(()=>{
                    return returnResult;
                });
            });
        });
    }

    /**
     * 取消关注
     * @param user_id
     * @param at_user_id
     * @returns {*}
     */
    cancelAt(id,at_user_id){
        return UsersAt.transaction(t=>{
            return UsersAt.destroy({
                where:{
                    user_id:id,
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
    isAtUser(id, at_user_id) {
        return UsersAt.count({
            where: {
                user_id: id,
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


    /**
     * 编辑精选者资料
     * @returns {*}
     */
    editInfo(id,user_name,sex,personalized,avatar){
        let update = {};
        user_name != void(0) && (update.user_name = user_name);
        sex != void(0) && (update.sex = Users.getSexValue(sex));
        personalized != void(0) && (update.personalized = personalized);
        avatar != void(0) && (update.avatar = avatar);
        if(!id) return Users.errorPromise('用户id不能为空');
        if(Object.keys(update).length == 0) return Users.errorPromise('参数格式不正确');
        return Users.transaction(t=>{
            return Users.update(update,{
                where:{id:id},
                transaction:t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=>{
            return Users.findById(id);
        }).then(user=>{
            return Users.formatUser(user.dataValues);
        });
    }
}
export default new UserService();