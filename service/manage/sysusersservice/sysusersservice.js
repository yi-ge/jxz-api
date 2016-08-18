import {SysUsers,SysRoles,SysUserRoles,Users} from './../../../core';
class SysUserService {
    /**
     * 管理员注册
     * @param accountname
     * @param password
     * @returns {*}
     */
    retister(accountname, password, username, email, rolesId) {
        return SysUsers.transaction((t)=> {
            return Users.insert(Users.createModel(username, 2), {transaction: t}).then(user=> {
                return SysUsers.insert(SysUsers.createModel(accountname, password, username, email, user.id), {
                    transaction: t
                });
            }).then(sysUser=> {
                if (rolesId && rolesId != 0) return SysUserRoles.insert(SysUserRoles.createModel(sysUser.id, rolesId), {
                    transaction: t
                }).then(()=> {
                    return sysUser;
                });
                return sysUser;
            }).then(sysUser=> {
                return sysUser;
            }).then(sysUser=> {
                return SysUsers.formaySysUser(sysUser.dataValues);
            });
        });
    }

    /**
     * 管理员登陆
     * @param accountname
     * @param password
     * @returns {*|Promise.<T>}
     */
    login(accountname, password) {
        return SysUsers.findOnlyOne(
            {
                where: {
                    account_name: accountname,
                    passwd: SysUsers.encrypMD5(password),
                },
            }
        ).then(sysUser=> {
            if (!sysUser) return {code: 1000, msg: "用户名或者密码错误！"};
            else return SysUsers.formaySysUser(sysUser.dataValues);
        });
    }

    /**
     * 查询管理员用户
     * @param page
     * @param pagesize
     */
    findSysUsers(page, pagesize) {
        return SysUsers.count().then(count=> {
            return SysUsers.findPage({
                include: [{
                    model: SysRoles.sequlize,
                    attributes: ['id', 'name'],
                    through: {attributes: []}
                }],
            }, page, count, 1, pagesize);
        }).then(result=> {
            result.list.map((item, key)=> {
                SysUsers.formaySysUser(item.dataValues);
            });
            return result;
        });
    }

    /**
     * 查询所有管理员 不分页
     * @returns {*|Promise.<T>}
     */
    findSysUsersAll(){
        return SysUsers.findList({
            attributes:['id','user_name']
        }).then(result=>{
            result.list.map(user=>{
                user.dataValues.name = user.dataValues.user_name;
                delete user.dataValues.account_name;
            });
            return result;
        });
    }

    /**
     * 修改管理员状态
     * @param id
     * @param status
     * @returns {Promise.<T>}
     */
    updateSysUsersStatus(id, status) {
        return SysUsers.transaction(t=> {
            return SysUsers.update({status: status,updated_at:new Date()}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
        }).then(result=> {
            return SysUsers.findById(id);
        }).then(result=> {
            return SysUsers.formaySysUser(result.dataValues);
        });
    }

    editSysUsers(id, user_name, email, role_id) {
        return SysUsers.transaction(t=> {
            return SysUsers.update({user_name: user_name, email: email,updated_at:new Date()}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            }).then(()=> {
                return SysUserRoles.destroy({where: {user_id: id},transaction:t});
            }).then(()=> {
                if(!!role_id) return SysUserRoles.insert(SysUserRoles.createModel(id, role_id), {transaction: t});
                return null;
            });
        }).then(()=> {
            return SysUsers.findById(id, {
                include: [{
                    model:SysRoles.sequlize,
                    through:{
                        model:SysUserRoles.sequlize,
                        attributes:[]
                    }
                }]
            });
        }).then(result=> {
            return SysUsers.formaySysUser(result.dataValues);
        });
    }
}
export default new SysUserService();