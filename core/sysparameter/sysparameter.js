/**
 * Created by NX on 2016/8/8.
 */
import sysparameter from './sysparameter.config';
import Base from './../base';

class SysParameter extends Base {
    constructor() {
        super("sys_parameter", sysparameter, {
            tableName: 'sys_parameter'
        });
    }
    createModel(param_key,param_value,creater,modifier){
        let model = {
            param_key:param_key,
            param_value:param_value,
            creater:creater,
            modifier:modifier,
            created_at:new Date(),
            updated_at:new Date()
        };
        return model;
    }

    insert(model, option){
        console.log(model);
        return this.count({where: {param_key: model.param_key}}).then(count=>{
            if(count != 0) return this.errorPromise("参数已存在");
            return true;
        }).then(()=>{
            return super.insert(model,option);
        });
    }

    formatSysParameter(param){
        param.created_at != void(0) && (param.created_at = this.formatDate(param.created_at, "yyyy-MM-dd hh:mm:ss"));
        param.updated_at != void(0) && (param.updated_at = this.formatDate(param.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return param;
    }

}

export default new SysParameter();