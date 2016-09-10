/**
 * Created by NX on 2016/8/18.
 */
import HousesCombo from './housescombo';
import Houses from './../houses/houses';

HousesCombo.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:"houses_id",
    targetKey:'id',
});

export default HousesCombo;