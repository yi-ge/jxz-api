/**
 * Created by NX on 2016/8/8.
 */
import sysroleresources from './sysroleresources.config';
import Base from './../base';

class SysRoleResources extends Base {
    constructor() {
        super("sys_role_resources", sysroleresources, {
            tableName: 'sys_role_resources'
        });
    }

    createModel(rolesId,resourceId,permissions){
        let model={
            id:this.generateId(),
            role_id:rolesId,
            resource_id:resourceId,
            permissions:permissions
        };
        return model;
    }
}

export default new SysRoleResources();