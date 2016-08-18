import SysDict from './sysdict';
import SysUsers from './../sysusers';

//字典关联一个创建人
SysDict.sequlize.belongsTo(SysUsers.sequlize, {
    foreignKey: 'creater',
    targetKey: 'id',
    as:'creater_user'
});

//字典关联一个修改人
SysDict.sequlize.belongsTo(SysUsers.sequlize, {
    foreignKey: 'modifier',
    targetKey: 'id',
    as:'modifier_user'
});

//字典表自关联自己 一条字典数据有多个子数据
SysDict.sequlize.hasMany(SysDict.sequlize, {
    foreignKey: 'parent_id',
    as: 'sys_dict_child'
});
//字典表自关联自己 一条字典数据有一个父数据
SysDict.sequlize.belongsTo(SysDict.sequlize, {
    foreignKey: 'parent_id',
    targetKey: 'id',
    as: 'sys_dict_parent'
});
export default SysDict;