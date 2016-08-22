/**
 * Created by NX on 2016/8/8.
 */
import usersat from './usersat.config';
import Base from './../base';

class UsersAt extends Base {
    constructor() {
        super("users_at", usersat, {
            tableName: 'users_at'
        });
    }

    createModel(user_id,at_user_id){
        let model={
            id:this.generateId(),
            user_id:user_id,
            at_user_id:at_user_id,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }
}

export default new UsersAt();