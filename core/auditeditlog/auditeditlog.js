/**
 * Created by NX on 2016/8/8.
 */
import auditeditlog from './auditeditlog.config';
import Base from './../base';

class AuditEditLog extends Base {
    constructor() {
        super("audit_edit_log", auditeditlog, {
            tableName: 'audit_edit_log'
        });
    }
}

export default new AuditEditLog();