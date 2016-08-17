import {SysDict} from './../../../core';

const config = {
    type:1,//区域
    StateLevel:1,//州 第一级
    countryLevel:2,//国 第二级
    regionLevel:3 //区域 第三级
};
class RegionService {
    /**
     * 新增大洲
     * @param name
     * @returns {*}
     */
    addState(name,creater){
        return SysDict.transaction(t=>{
            return SysDict.insert(SysDict.createModel(null,name,1,null,null,1,creater,creater),{transaction:t}).then(state=>{
                SysDict.formatSysDict(state);
            });
        });
    }

    /**
     * 添加城市
     * @param name
     * @param parent_id
     * @param creater
     * @returns {*}
     */
    addCountry(name,parent_id,creater){
        return SysDict.transaction(t=>{
            return SysDict.insert(SysDict.createModel(null,name,1,null,parent_id,2,creater,creater),{transaction:t}).then(state=>{
                SysDict.formatSysDict(state);
            });
        });
    }

    /**
     * 添加区域
     * @param name
     * @param parent_id
     * @param create
     * @returns {*}
     */
    addRegion(name,parent_id,create){
        return SysDict.transaction(t=>{
            return SysDict.insert(SysDict.createModel(null,name,1,null,parent_id,3,creater,creater),{transaction:t}).then(state=>{
                SysDict.formatSysDict(state);
            });
        });
    }

}
export default new RegionService();