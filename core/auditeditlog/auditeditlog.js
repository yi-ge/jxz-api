/**
 * Created by NX on 2016/8/8.
 */
import auditeditlog from './auditeditlog.config';
import Base from './../base';
const EVENT_TYPE = {
    ADD:1,
    UPDATE:2,
    DELETE:3
};
class AuditEditLog extends Base {
    constructor() {
        super("audit_edit_log", auditeditlog, {
            tableName: 'audit_edit_log'
        });
    }

    /**
     *
     * @param event_type 事件类型 1:添加,2:修改3:删除
     * @param event_module 事件模块
     * @param event_content 事件内容
     * @param eventer 事件人
     * @param event_module_id 事件模块id
     * @returns {{id: number}}
     */
    createModel(event_type,event_module,event_content,eventer,event_module_id){
        let model = {
            id:this.generateId(),
            event_type:event_type,
            event_module:event_module,
            event_content:event_content,
            eventer:eventer,
            event_module_id:event_module_id
        };
        return model;
    }

    formatAuditEditLog(log){
        return log;
    }
}

export default new AuditEditLog();