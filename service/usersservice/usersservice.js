import {Users} from './../../core';
class UsersService{
    findOne(){
        return Users.findOne().then(user=>{
            user.dataValues = Users.formatUser(user.dataValues);
            return user;
        });
    }
    insert(user){
        user.last_login_ip = Users.ipToInt(user.last_login_ip);
        console.log(user);
        return Users.insert(user);
    }
}
export default new UsersService();