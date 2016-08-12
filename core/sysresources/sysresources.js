/**
 * Created by NX on 2016/8/8.
 */
import sysresources from './sysresources.config';
import Base from './../base';

class SysResources extends Base {
    constructor() {
        super("sys_resources", sysresources, {
            tableName: 'sys_resources'
        });
    }

    createModel(name, url, res_desc) {
        let model = {
            id: this.generateId(),
            name: name,
            url: url,
            res_desc: res_desc,
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