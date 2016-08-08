import {user} from './../../core';
class userService{
    findOne(){
        return user.findOne();
    }
}
export default new userService();