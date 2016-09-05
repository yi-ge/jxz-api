/**
 * Created by NX on 2016/8/18.
 */
import SysInform from './sysinform';
import Users from './../users/users';
//通知对应接收人
SysInform.sequlize.belongsTo(Users.sequlize,{
    foreignKey:'receive_user',
    targetKey:'id'
});
//通知对应发送人
SysInform.sequlize.belongsTo(Users.sequlize,{
    foreignKey:'send_user',
    targetKey:'id'
});
export default SysInform;