/**
 * Created by NX on 2016/8/8.
 */
import sysdict from './sysdict.config';
import Base from './../base';
const CONFIG = {
        REGION: 1, // 区域
    },
    STATE = 1, //洲
    COUNTRY = 2, // 国家
    REGION = 3; //区域

class SysDict extends Base {
    constructor() {
        super("sys_dict", sysdict, {
            tableName: 'sys_dict'
        });
        this.CONFIG = CONFIG;
        this.STATE = STATE;
        this.COUNTRY = COUNTRY;
        this.REGION = REGION;

    }

    createModel(code, name, type, parent_code, parent_id, level, creater, modifier) {
        let model = {
            id: this.generateId(),
            code: code,
            name: name,
            type: type,
            parent_code: parent_code,
            parent_id: parent_id,
            level: level,
            creater: creater,
            modifier: creater,
            created_at: new Date(),
            updated_at: new Date(),
        };
        return model;
    }

    formatSysDict(dict) {
        !!dict.created_at && (dict.created_at = this.formatDate(dict.created_at, 'yyyy-MM-dd hh:mm:ss'));
        !!dict.updated_at && (dict.updated_at = this.formatDate(dict.updated_at, 'yyyy-MM-dd hh:mm:ss'));
        return dict;
    }
}

export default new SysDict();