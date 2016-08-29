/**
 * Created by NX on 2016/8/18.
 */
import UsersMsg from './usersmsg';
import Users from './../users/users';

//发私信的人
UsersMsg.sequlize.belongsTo(Users.sequlize,{
    foreignKey:'user_id',
    targetKey:'id',
    as:'sponsored_user'
});
//接收人
UsersMsg.sequlize.belongsTo(Users.sequlize,{
    foreignKey:'from_user_id',
    targetKey:'id',
    as:'receive_user'
});
export default UsersMsg;