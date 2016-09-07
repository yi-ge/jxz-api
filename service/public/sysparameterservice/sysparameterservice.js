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

    /**
     * 编辑系统参数
     * @param param_key
     * @param param_value
     * @param modifier
     * @returns {*}
     */
    editSysParameter(param_key,param_value,modifier){
        return SysParameter.transaction(t=>{
            return SysParameter.findOnlyOne({where:{param_key:param_key}}).then((param)=>{
                returnParam = param;
                if(!param) return this.addSysParameter(param_key,param_value,modifier);
                else return SysParameter.update({
                    param_value:param_value
                },{
                    where:{param_key:param_key},
                    transaction:t,
                    lock: t.LOCK.UPDATE,
                });
            });
        }).then(()=>{
            return SysParameter.findOnlyOne({where:{param_key:param_key}});
        }).then(param=>{
            return SysParameter.formatSysParameter(param.dataValues);
        });
    }
}
export default new SysParameterService();