/**
 * Created by NX on 2016/8/18.
 */
import UsersCoinLog from './userscoinlog';
import UsersVip from './../usersvip/usersvip';

UsersCoinLog.sequlize.belongsTo(UsersVip.sequlize,{
    foreignKey:'user_id',
    as:'vip_user'
});
export default UsersCoinLog;