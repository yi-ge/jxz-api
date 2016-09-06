/**
 * Created by NX on 2016/8/8.
 */
import syshotkeyword from './syshotkeyword.config';
import Base from './../base';

class SysHotKeyword extends Base {
    constructor() {
        super("sys_hot_keyword", syshotkeyword, {
            tableName: 'sys_hot_keyword'
        });
    }
    /**
     *
     * @param name 名字
     * @param creater 创建人
     * @param modifier 修改人
     * @returns {{id: number, name: *, creater: *, modifier: *, created_at: Date, updated_at: Date}}
     */
    createModle(name,creater,modifier){
        let model={
            id:this.generateId(),
            name:name,
            creater:creater,
            modifier:modifier,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    /**
     * 查询列表
     * @param keyword
     * @returns {*}
     */
    formatSysHotKeyword(keyword){
        keyword.created_at != void(0) && (keyword.created_at = this.formatDate(keyword.created_at, "yyyy-MM-dd hh:mm:ss"));
        keyword.updated_at != void(0) && (keyword.updated_at = this.formatDate(keyword.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return keyword;
    }

}

export default new SysHotKeyword();