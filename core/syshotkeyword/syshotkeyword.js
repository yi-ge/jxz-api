/**
 * Created by NX on 2016/8/8.
 */
import syshotkeyword from './syshotkeyword.config';
import Base from './../base';

class SysHotKeyword extends Base {
    constructor() {
        super("sys_hot_keyword", syshotkeyword, {
            tableName: 'sys_hot_keyword'
        });
    }
}

export default new SysHotKeyword();