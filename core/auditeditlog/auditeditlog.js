/**
 * Created by NX on 2016/8/8.
 */
import auditeditlog from './auditeditlog.config';
import Base from './../base';
const EVENT_TYPE = {
    ADD:1, //添加
    UPDATE:2, //修改
    DELETE:3 //删除
};
const EVENT_MODULE = {
    ORDER_MODULE:{ //订单
        MAKE_CONFIRMED:{
            CONTENT:'扣除精选币#数量#',
            NAME:'确认流程',
            GET_CONTENT:(coin)=>{
                let CONTENT = '扣除精选币#数量#';
                return CONTENT.replace("#数量#",coin);
            }
        },
        MAKE_CONFIRMED_CHANGE:{
            CONTENT:'扣除精选币#数量#',
            NAME:'需求变更流程',
            GET_CONTENT:(coin)=>{
                if(coin >= 0) return `退还精选币${coin}`;
                else if(coin < 0) return `扣除精选币${coin}`;
            }
        },
        MAKE_CANCEL:{
            CONTENT:'订单已取消',
            NAME:'取消流程',
            GET_CONTENT:()=>{
                return '订单已取消';
            }
        },
        MAKE_REFUND:{
            CONTENT:'订单已退款#消费#',
            NAME:'退款流程',
            GET_CONTENT:(coin)=>{
                return `订单已退款${coin}`;
            }
        }
    }
};
class AuditEditLog extends Base {
    constructor() {
        super("audit_edit_log", auditeditlog, {
            tableName: 'audit_edit_log'
        });
        this.EVENT_TYPE = EVENT_TYPE;
        this.EVENT_MODULE = EVENT_MODULE;
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
            event_module_id:event_module_id,
            event_date:new Date()
        };
        return model;
    }

    formatAuditEditLog(log){
        log.event_date != void(0) && (log.event_date = this.formatDate(log.event_date, "yyyy-MM-dd hh:mm:ss"));
        return log;
    }
}

export default new AuditEditLog();