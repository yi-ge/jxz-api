import {SysUsers} from './../../../core';
class SysUserService {
    retister(accountname, password) {
        return SysUsers.transaction((t)=> {
            return SysUsers.insert(SysUsers.createModel(accountname, password), {transaction: t})
                .then(sysUser=> {
                    return SysUsers.formaySysUser(sysUser.dataValues);
                });
        });
    }

    login(accountname, password) {
        return SysUsers.transaction((t)=> {
            return SysUsers.findAll({
                where: {
                    account_name: accountname,
                    passwd: SysUsers.encrypMD5(password),
                },
            }, {transaction: t}).then(sysUser=> {
                if (sysUser.length == 0) return {code: 1, msg: "用户名或者密码错误！"};
                else {
                    sysUser = sysUser[0];
                    return SysUsers.formaySysUser(sysUser.dataValues);
                }
            });
        });
    }
}
export default new SysUserService();