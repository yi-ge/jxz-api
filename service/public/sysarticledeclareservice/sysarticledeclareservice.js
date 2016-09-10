import {SysArticleDeclare} from './../../../core';
class SysArticleDeclareService {
    /**
     * 添加服务条款
     * @param type
     * @param title
     * @param content
     * @param creater
     * @returns {*}
     */
    addDeclare(type,title,content,creater){
        return SysArticleDeclare.transaction(t=>{
            return SysArticleDeclare.insert(SysArticleDeclare.createModel(type,title,content,creater,creater),{
                transaction:t,
            });
        });
    }

    /**
     * 编辑服务条款
     * @param type
     * @param title
     * @param content
     * @param modifier
     * @returns {*}
     */
    editDeclare(type,title,content,modifier){
        let where = {type:type};
        return SysArticleDeclare.count({where:where}).then(count=>{
            if(count == 0) return this.addDeclare(type,title,content,modifier);
            return SysArticleDeclare.transaction(t=>{
                return SysArticleDeclare.edit(type,title,content,modifier,t);
            })
        }).then(()=>{
            return SysArticleDeclare.findOnlyOne({where:where});
        }).then(result=>{
            return SysArticleDeclare.formatSysArticleDeclare(result.dataValues);
        });
    }

    /**
     * 根据type查询对应条款
     * @param type
     */
    findDeclareType(type){
        return SysArticleDeclare.findOnlyOne({
            where:{type:type}
        }).then(result=>{
            return SysArticleDeclare.formatSysArticleDeclare(result.dataValues);
        });
    }

    /**
     * 删除条款
     * @param type
     * @returns {*}
     */
    destroy(type){
        return SysArticleDeclare.transaction(t=>{
            return SysArticleDeclare.destroy({
                where:{type:type}
            });
        })
    }
}
export default new SysArticleDeclareService();