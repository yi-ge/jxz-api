import SysHousesKeyword from './syshouseskeyword';
import SysUsers from './../sysusers/sysusers';
import HousesKeyword from './../houseskeyword/houseskeyword';
//一个关键词对应一个创建人
SysHousesKeyword.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'creater',
    targetKey:'id',
    as:'creater_user'
});
//一个关键词对应一个修改人
SysHousesKeyword.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'modifier',
    targetKey:'id',
    as:'modifier_user'
});
//一个系统酒店亮点对应多个酒店亮点
SysHousesKeyword.sequlize.hasMany(HousesKeyword.sequlize,{
    foreignKey:'keyword_id'
});
export default SysHousesKeyword;