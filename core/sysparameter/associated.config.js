/**
 * Created by NX on 2016/8/18.
 */
import SysParameter from './sysparameter';
import SysUsers from './../sysusers';
//字典关联一个创建人
SysParameter.sequlize.belongsTo(SysUsers.sequlize, {
    foreignKey: 'creater',
    targetKey: 'id',
    as: 'creater_user'
});
//字典关联一个修改人
SysParameter.sequlize.belongsTo(SysUsers.sequlize, {
    foreignKey: 'modifier',
    targetKey: 'id',
    as: 'modifier_user'
});
export default SysParameter;