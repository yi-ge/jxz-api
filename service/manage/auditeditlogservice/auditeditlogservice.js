import {AuditEditLog,SysUsers} from './../../../core';
class AuditEditLogService {
    /**
     * 查询指定订单记录
     * @param order_id
     * @returns {*}
     */
    findOrderAuditEditLog(order_id){
        return AuditEditLog.findList({
            where:{event_module_id:order_id},
            attributes:[
                'id','event_type','event_module','event_content','event_date',
                [SysUsers.col('audit_sys.account_name'),'account_name'],
                [SysUsers.col('audit_sys.user_name'),'user_name']
            ],
            include:[{
                model:SysUsers.sequlize,
                as:'audit_sys',
                attributes:[]
            }]
        }).then(resultlist=>{
            resultlist.list.map((log=>{
                AuditEditLog.formatAuditEditLog(log.dataValues);
            }));
            return resultlist;
        })
    }
}
export default new AuditEditLogService();