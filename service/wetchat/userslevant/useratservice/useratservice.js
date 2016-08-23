import {UsersAt} from './../../../../core';
class UserAtService {
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

}
export default new UserAtService();