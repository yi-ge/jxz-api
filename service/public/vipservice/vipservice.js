import {UsersVip,Users} from './../../../core';
class VipService {
    /**
     * 后台录入vip用户
     * @param account_name
     * @param user_name
     * @param email
     * @param sex
     * @returns {*}
     */
    createVip(account_name, user_name, email, sex, password) {
        return UsersVip.transaction(t=> {
            return UsersVip.insert(UsersVip.createModel(account_name, user_name, email, sex, password), {transaction: t}).then(result=> {
                return UsersVip.formatUserVip(result.dataValues);
            });
        });
    }

    /**
     * 查询关联了vip的用户
     * @param page
     * @param sortType
     * @param startDate
     * @param endDate
     * @param is_cover
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findUserToVipList(page, sortType, startDate, endDate, is_cover, pagesize) {
        let where = {user_vip_id: {$ne: null}};
        !!is_cover && (where['is_cover'] = is_cover);
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        return Users.count({where: where}).then(count=> {
            return Users.findPage(Object.assign({
                    where: where,
                    include: {model: UsersVip.sequlize},
                }, sortType ? {order: `article_num ${sortType == 1 ? `ASC` : `DESC`}`} : {}),
                page, count, sortType, pagesize);
        }).then(result=> {
            result.list.map(users=> {
                Users.formatUser(users);
                UsersVip.formatUserVip(users.users_vip.dataValues);
            });
            return result;
        });
    }
}
export default new VipService();