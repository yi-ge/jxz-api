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
    as: 'country_p'
});
export default SysDict;