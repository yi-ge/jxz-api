import {SysInform} from './../../../core';
class SysInformService {
    /**
     * 查询用户系统通知
     * @param user_id
     */
    findUsersSysNotice(user_id,page,pagesize){
        let where = {
            receive_user:user_id,
            type:SysInform.TYPE.NOTICE,
        };
        return SysInform.count({where:where}).then(count=>{

        });
    }
}
export default new SysInformService();