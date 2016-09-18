/**
 * Created by NX on 2016/8/18.
 */
import AuditEditLog from './auditeditlog';
import SysUsers from './../sysusers/sysusers';
AuditEditLog.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'eventer',
    as:'audit_sys'
});
export default AuditEditLog;