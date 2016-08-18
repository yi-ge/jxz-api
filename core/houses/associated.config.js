import Houses from './houses';
import Articles from './../articles/articles';
import HousesKeyword from './../houseskeyword/houseskeyword';
//一个酒店对应多篇文章
Houses.sequlize.hasMany(Articles.sequlize, {
    foreignKey: 'houses_id',
    targetKey: 'id'
});
//一个酒店对应多个亮点
Houses.sequlize.hasMany(HousesKeyword.sequlize,{
    foreignKey:'houses_id',
});
export default Houses;