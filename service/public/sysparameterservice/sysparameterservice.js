import {SysParameter} from './../../../core';
class SysParameterService {
    /**
     * 添加系统参数
     * @param param_key
     * @param param_value
     * @param creater
     * @returns {*}
     */
    addSysParameter(param_key,param_value,creater){
        return SysParameter.transaction(t=>{
            return SysParameter.insert(SysParameter.createModel(param_key,param_value,creater,creater),{
                transaction:t
            });
        });
    }
}
export default new SysParameterService();