import {UsersMsg} from './../../../../core';
class UsersMsgService {
    /**
     * 给别人发私信
     * @param user_id
     * @param from_user_id
     * @param content
     * @returns {*}
     */
    sponsoredMsg(user_id,from_user_id,content){
        return UsersMsg.transaction(t=>{
            return UsersMsg.insert(UsersMsg.createModel(user_id,from_user_id,content),{
                transaction:t
            }).then(result=>{
                return UsersMsg.formateUserMsg(result.dataValues);
            });
        });
    }
}
export default new UsersMsgService();