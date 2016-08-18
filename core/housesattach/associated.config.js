import HousesAttach from './housesattach';
import SysUsers from './../sysusers/sysusers';
import Houses from './../houses/houses';
//一个附件关联一个酒店
HousesAttach.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'houses_id',
    targetKey:'id',
});
//一个附近存在一个创建人
HousesAttach.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'creater',
    targetKey:"id",
    as:"creater_user"
});
//一个附近存在一个修改人
HousesAttach.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'modifier',
    targetKey:"id",
    as:"modifier_user"
});
export default HousesAttach;