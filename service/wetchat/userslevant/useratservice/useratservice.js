import {UsersAt} from './../../../../core';
class UserAtService {
    /**
     * 关注别人
     * @param user_id
     * @param at_user_id
     * @returns {*}
     */
    atUsers(user_id,at_user_id){
        return UsersAt.transaction(t=>{
            return UsersAt.insert(UsersAt.createModel(user_id,at_user_id),{transaction:t}).then(result=>{
                return result;
            })
        });
    }


}
export default new UserAtService();