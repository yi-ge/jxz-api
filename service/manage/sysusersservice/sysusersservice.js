import {SysUsers,SysRoles,SysUserRoles} from './../../../core';
class SysUserService {
    /**
     * 管理员注册
     * @param accountname
     * @param password
     * @returns {*}
     */
    retister(accountname, password, username, email, rolesId) {
        return SysUsers.transaction((t)=> {
            return SysUsers.insert(SysUsers.createModel(accountname, password, username, email), {
                transaction: t
            }).then(sysUser=> {
                if (!rolesId)  SysUserRoles.insert(SysUserRoles.createModel(sysUser.id, rolesId), {transaction: t});
                return sysUser;
            }).then(sysUser=> {
                return SysUsers.formaySysUser(sysUser.dataValues);
            }).catch(e=> {
                console.log(e);
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
        return SysUsers.findAll(
            {
                where: {
                    account_name: accountname,
                    passwd: SysUsers.encrypMD5(password),
                },
            }, {
                transaction: t
            }
        ).then(sysUser=> {
            if (sysUser.length == 0) return {code: 1000, msg: "用户名或者密码错误！"};
            else {
                sysUser = sysUser[0];
                return SysUsers.formaySysUser(sysUser.dataValues);
            }
        });
    }

    /**
     * 查询管理员用户
     * @param page
     * @param pagesize
     */
    findSysUsers(page, pagesize) {
        return SysUsers.findAndCount().then(count=> {
            return count.count;
        }).then(count=> {
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
        }).catch(e=> {
            console.log(e);
        });
    }
}
export default new SysUserService();