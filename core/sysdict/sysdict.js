/**
 * Created by NX on 2016/8/8.
 */
import sysdict from './sysdict.config';
import Base from './../base';

const config = {
    type:1, // 区域
};

class SysDict extends Base {
    constructor() {
        super("sys_dict", sysdict, {
            tableName: 'sys_dict'
        });
    }

    createModel(code,name,type,parent_code,parent_id,level,creater,modifier){
        let model = {
            id:this.generateId(),
            code:code,
            name:name,
            type:type,
            parent_code:parent_code,
            parent_id:parent_id,
            level:level,
            creater:creater,
            modifier:creater,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatSysDict(dict){

        return dict;
    }
}

export default new SysDict();