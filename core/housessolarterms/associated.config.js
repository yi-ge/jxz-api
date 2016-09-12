/**
 * Created by NX on 2016/8/18.
 */
import HousesSolarTerms from './housessolarterms';
import Houses from './../houses/houses';
//酒店节气
HousesSolarTerms.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'houses_id',
    targetKey:'id'
});

export default HousesSolarTerms;