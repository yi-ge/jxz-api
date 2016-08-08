import {user} from './../../core';
class userService{
    findOne(){
        return user.findOne();
    }
    insert(users){
        return user.insert(users);
    }
}

export default new userService();