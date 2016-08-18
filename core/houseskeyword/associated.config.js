import HousesKeyword from './houseskeyword';
import Houses from './../houses/houses';
import SysHousesKeyword from './../syshouseskeyword/syshouseskeyword';
import SysUsers from './../sysusers/sysusers';
//创建酒店亮点的管理员
HousesKeyword.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'creater',
    targetKey:'id',
    as:'creater_user'
});
//修改酒店亮点的管理员
HousesKeyword.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'modifier',
    targetKey:'id',
    as:'modifier_user'
});
//酒店亮点对应一个酒店
HousesKeyword.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'houses_id',
    targetKey:'id'
});
//酒店亮点对应一个系统亮点
HousesKeyword.sequlize.belongsTo(SysHousesKeyword.sequlize,{
    foreignKey:'keyword_id',
    targetKey:'id'
});
export default HousesKeyword;