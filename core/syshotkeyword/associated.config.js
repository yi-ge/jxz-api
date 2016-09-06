import SysHotKeyword from './syshotkeyword';
import SysUsers from './../sysusers/sysusers';
//创建人
SysHotKeyword.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'creater',
    as:'creater_user'
});
//修改人
SysHotKeyword.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'modifier',
    as:"modifier_user"
});
export default SysHotKeyword;
