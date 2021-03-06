import {UsersMsg,Users} from './../../../../core';
class UsersMsgService {
    /**
     * 给别人发私信
     * @param user_id
     * @param from_user_id
     * @param content
     * @returns {*}
     */
    sponsoredMsg(user_id, from_user_id, content) {
        return UsersMsg.transaction(t=> {
            return UsersMsg.insert(UsersMsg.createModel(user_id, from_user_id, content), {
                transaction: t
            }).then(result=> {
                return UsersMsg.formateUserMsg(result.dataValues);
            });
        });
    }

    /**
     * 是否有新的私信
     * @param user_id
     * @returns {*}
     */
    isNewMsg(user_id) {
        return UsersMsg.isNewMsg(user_id);
    }

    /**
     * 查询用户接收私信
     * @param user_id
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findUsersMsg(user_id, page, pagesize) {
        return UsersMsg.transaction(t=> {
            return UsersMsg.findUserMsgList(user_id, page, pagesize, t);
        });
    }
    /**
     * 仿实时聊天
     * @param user_id
     * @param form_user_id
     * @returns {*}
     */
    imitateChat(user_id, form_user_id, page, pagesize) {
        let where = {
            $or: [
                {$and: {user_id: user_id, from_user_id: form_user_id}},
                {$and: {user_id: form_user_id, from_user_id: user_id}}
            ]
        };
        return UsersMsg.count({where: where}).then(count=> {
            return UsersMsg.findPage({
                where: where,
                attributes: ['content', 'read_date', 'id','created_at','user_id','from_user_id'],
                order: `created_at DESC`
            }, page, count, 2, pagesize);
        }).then(msglist=> {
            msglist.list.map(msg=> {
                UsersMsg.formateUserMsg(msg.dataValues);
            });
            return msglist;
        });
    }
}
export default new UsersMsgService();