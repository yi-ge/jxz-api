import {SysInform} from './../../../core';
class SysInformService {
    /**
     * 是否有没有读取的系统通知
     * @param user_id
     * @returns {*}
     */
    isNotReadNotice(user_id){
        let where = {
            receive_user: user_id,
            type: SysInform.TYPE.NOTICE,
            read_status:SysInform.READSTATUS.NO
        };
        return SysInform.count({where:where}).then(count=>{
            let status = true;
            if(count == 0) status = false;
            return {isread:status};
        });
    }

    /**
     * 查询用户系统通知
     * @param user_id
     */
    findUsersSysNotice(user_id, page, pagesize) {
        let where = {
            receive_user: user_id,
            type: SysInform.TYPE.NOTICE,
        };
        return SysInform.transaction(t=> {
            return SysInform.update({read_status: SysInform.READSTATUS.YES}, {
                where: Object.assign(where, {
                    read_status: SysInform.READSTATUS.NO
                }),
                transaction: t,
                lock: t.LOCK.UPDATE,
            }).then(()=> {
                return SysInform.count({where:where});
            }).then(count=>{
                return SysInform.findPage({
                    where:where
                },page,count,1,pagesize);
            }).then(infos=>{
                 infos.list.map(info=>{
                     SysInform.formatSysInform(info);
                 });
                return infos;
            });
        });
    }
}
export default new SysInformService();