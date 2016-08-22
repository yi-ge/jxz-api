import SysDict from './sysdict';
import SysUsers from './../sysusers';
import Houses from './../houses/houses';
//字典关联一个创建人
SysDict.sequlize.belongsTo(SysUsers.sequlize, {
    foreignKey: 'creater',
    targetKey: 'id',
    as: 'creater_user'
});
//字典关联一个修改人
SysDict.sequlize.belongsTo(SysUsers.sequlize, {
    foreignKey: 'modifier',
    targetKey: 'id',
    as: 'modifier_user'
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

//一个洲对应多个国家
SysDict.sequlize.hasMany(SysDict.sequlize, {
    foreignKey: 'parent_id',
    as: 'country'
});
//一个国家对应一个洲
SysDict.sequlize.belongsTo(SysDict.sequlize, {
    foreignKey: 'parent_id',
    targetKey: 'id',
    as: 'state'
});
//一个国家对应多区域
SysDict.sequlize.hasMany(SysDict.sequlize, {
    foreignKey: 'parent_id',
    as: 'region'
});
//一个区域对应一个国家
SysDict.sequlize.belongsTo(SysDict.sequlize, {
    foreignKey: 'parent_id',
    targetKey: 'id',
    as: 'country'
});

export default SysDict;