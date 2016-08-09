import {Users} from './../../core';
class UsersService{
    findOne(){
        return Users.findOne().then(user=>{
            user.dataValues = Users.formatUser(user.dataValues);
            return user;
        });
    }
    insert(user){
        return Users.insert(user);
    }
}
export default new UsersService();