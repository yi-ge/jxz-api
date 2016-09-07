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
                if(!param) return this.addSysParameter(param_key,param_value,modifier);
                else return SysParameter.update({
                    param_value:param_value,
                    modifier:modifier,
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

    /**
     * 查询配置
     * @param param_key
     * @returns {*}
     */
    findKey(param_key){
        return SysParameter.findOnlyOne({
            where:{param_key:param_key}
        }).then(param=>{
            if(!param) return SysParameter.errorPromise("没有找到相关配置");
            return SysParameter.formatSysParameter(param);
        });
    }
}
export default new SysParameterService();