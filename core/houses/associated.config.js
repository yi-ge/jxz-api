import Houses from './houses';
import Articles from './../articles/articles';
import HousesKeyword from './../houseskeyword/houseskeyword';
import HousesAttach from './../housesattach/housesattach';
import SysUsers from './../sysusers/sysusers';
import HousesComment from './../housescomment/housescomment';
//一个酒店对应多篇文章
Houses.sequlize.hasMany(Articles.sequlize, {
    foreignKey: 'houses_id',
    targetKey: 'id',
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
export default Houses;