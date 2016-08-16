import {Users,Articles} from './../../../core';
class UserService {
    /**
     * 获取用户列表 分页
     * @param page
     * @returns {*}
     */
    findUserList(page, sortType, pagesize) {
        return Users.count().then(count=> {
            return Users.findPage({
                where: {
                    $and: Users.mysqlFn('isnull', Users.col('user_vip_id')),
                },
                order: `id ${sortType == 1 ? `ASC` : `DESC`}`,
            }, page, count, sortType, pagesize);
        }).then(result=> {
            result.list.map(user=> {
                Users.formatUser(user);
            });
            return result;
        });
    }
}
export default new UserService();