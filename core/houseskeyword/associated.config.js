import HousesKeyword from './houseskeyword';
import Houses from './../houses/houses';
import SysHousesKeyword from './../syshouseskeyword/syshouseskeyword';
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