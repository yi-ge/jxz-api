import Houses from './houses';
import Articles from './../articles/articles';
import HousesKeyword from './../houseskeyword/houseskeyword';
import HousesAttach from './../housesattach/housesattach';
import SysUsers from './../sysusers/sysusers';
import HousesComment from './../housescomment/housescomment';
import SysDict from './../sysdict/sysdict';
import HousesCombo from './../housescombo/housescombo';
import HousesSolarTerms from './../housessolarterms/housessolarterms';
import HousesRoom from './../housesroom/housesroom';
import HousesRoomPrice from './../housesroomprice/housesroomprice';
import Orders from './../orders/orders';
//一个酒店对应多篇文章
Houses.sequlize.hasMany(Articles.sequlize, {
    foreignKey: 'houses_id',
    as:'articles'
});
//一个酒店对应多个亮点
Houses.sequlize.hasMany(HousesKeyword.sequlize, {
    foreignKey: 'houses_id',
});
//一个酒店关联多个附件
Houses.sequlize.hasMany(HousesAttach.sequlize, {
    foreignKey: 'houses_id',
});
//酒店评论
Houses.sequlize.hasMany(HousesComment.sequlize,{
   foreignKey:'houses_id',
});
//对应一个创建人
Houses.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'creater',
    targetKey:'id',
    as:'creater_user'
});
//对应一个修改人
Houses.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'modifier',
    targetKey:'id',
    as:'modifier_user'
});
Houses.sequlize.belongsTo(SysDict.sequlize,{
    foreignKey:'region',
    targetKey:'id',
    as:'regions'
});
//酒店对应多个套餐
Houses.sequlize.hasMany(HousesCombo.sequlize,{
    foreignKey:'houses_id'
});
//酒店节气
Houses.sequlize.hasMany(HousesSolarTerms.sequlize,{
    foreignKey:'houses_id'
});
//酒店房间
Houses.sequlize.hasMany(HousesRoom.sequlize,{
    foreignKey:'houses_id'
});
//酒店房屋价格
Houses.sequlize.hasMany(HousesRoomPrice.sequlize,{
    foreignKey:'houses_id'
});
//期望酒店
Houses.sequlize.hasMany(Orders.sequlize,{
    foreignKey:'expect_houses_id',
    as:'expect_orders'
});
export default Houses;