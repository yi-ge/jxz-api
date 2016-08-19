/**
 * Created by NX on 2016/8/18.
 */
import HousesComment from './housescomment';
import Users from './../users/users';
import Houses from './../houses/houses';

//评论创建人
HousesComment.sequlize.belongsTo(Users.sequlize,{
    foreignKey:'creater',
    targetKey:'id',
    as:'creater_user'
});
//评论修改人
HousesComment.sequlize.belongsTo(Users.sequlize,{
    foreignKey:'modifier',
    targetKey:'id',
    as:'modifier_user'
});
//关联酒店
HousesComment.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'houses_id',
    targetKey:'id'
});
export default HousesComment;