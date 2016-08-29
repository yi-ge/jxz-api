/**
 * Created by NX on 2016/8/8.
 */
import sysresources from './sysresources.config';
import Base from './../base';

const ONE = 1;
const SECOND = 2;
const THREE = 3;

const TYPE = {
    MENU:0,
    BUTTON:1
};

class SysResources extends Base {
    constructor() {
        super("sys_resources", sysresources, {
            tableName: 'sys_resources'
        });
        this.ONE = ONE;
        this.SECOND = SECOND;
        this.THREE = THREE;
        this.TYPE = TYPE;
    }

    /**
     *
     * @param name 资源名字
     * @param res_desc
     * @param parent_id 父资源ID
     * @param type 资源类型,0:菜单1:按钮
     * @param url 资源url
     * @param level 资源级别
     * @param creater 创建人
     * @param modifier 修改人
     * @returns {{id: number, name: *, url: *, res_desc: *, created_at: Date, updated_at: Date}}
     */
    createModel(name, res_desc, parent_id, type, url, level, creater, modifier) {
        let model = {
            id: this.generateId(),
            name: name,
            url: url,
            parent_id:parent_id,
            type:type,
            level:level,
            res_desc: res_desc,
            creater:creater,
            modifier:modifier,
            created_at: new Date(),
            updated_at: new Date()
        };
        return model;
    }

    formatSysResources(resources) {
        return resources;
    }
}

export default new SysResources();