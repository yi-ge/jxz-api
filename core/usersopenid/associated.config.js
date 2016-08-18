import UsersOpenid from './usersopenid';
import Users from './../users/users';
//一个openid对应一个用户 外键存在于user_oauth_openid中 为user_id
UsersOpenid.sequlize.belongsTo(Users.sequlize, {
    foreignKey: "user_id",
    targetKey: "id"
});
export default UsersOpenid;