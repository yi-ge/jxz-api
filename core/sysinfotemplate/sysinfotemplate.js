/**
 * Created by NX on 2016/8/8.
 */
import sysinfotemplate from './sysinfotemplate.config';
import TEMPLATE from './inform.template.config';
import Base from './../base';

class SysInfoTemplate extends Base {
    constructor() {
        super("sys_info_template", sysinfotemplate, {
            tableName: 'sys_info_template'
        });
        this.TEMPLATE = TEMPLATE;
    }

    formateInfoTemplate(template){
        return template;
    }

    getTemplate(id){
        return this.findById(id).then(result=>{
            return this.formateInfoTemplate(result.dataValues);
        });
    }
}

export default new SysInfoTemplate();