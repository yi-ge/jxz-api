/**
 * Created by NX on 2016/8/8.
 */
import sysarticledeclare from './sysarticledeclare.config';
import Base from './../base';

class SysArticleDeclare extends Base {
    constructor() {
        super("sys_article_declare", sysarticledeclare, {
            tableName: 'sys_article_declare'
        });
    }

    /**
     *
     * @param type
     * @param title
     * @param content
     * @param creater
     * @param modifier
     * @returns {{id: number, type: *, title: *, content: *, creater: *, modifier: *, created_at: Date, updated_at: Date}}
     */
    createModel(type,title,content,creater,modifier){
        let model = {
            id:this.generateId(),
            type:type,
            title:title,
            content:content,
            creater:creater,
            modifier:modifier,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatSysArticleDeclare(declare){
        return declare;
    }


    insert(model,option){
        let where = {
            type:model.type
        };
        return this.count({
            where:where
        }).then(count=>{
            if(count != 0) return this.errorPromise("条款已存在");
            return super.insert(model,option);
        });
    }

    edit(type,title,content,modifier,t){
        return this.update({
            title:title,
            content:content,
            modifier:modifier
        },{
            where:{type:type},
            transaction:t,
            lock: t.LOCK.UPDATE,
        })
    }
}

export default new SysArticleDeclare();