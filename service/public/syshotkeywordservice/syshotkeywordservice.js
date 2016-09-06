import {SysHotKeyword,SysUsers} from './../../../core';
class SysHotKeywordService {
    /**
     * 新增系统热词
     * @param name
     * @param creater
     * @returns {*}
     */
    addHotKeyword(name, creater) {
        return SysHotKeyword.transaction(t=> {
            return SysHotKeyword.insert(SysHotKeyword.createModle(name, creater, creater), {
                transaction: t
            });
        }).then(result=> {
            return SysHotKeyword.formatSysHotKeyword(result.dataValues);
        });
    }
    /**
     * 查询列表
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findHotKeyword(page,pagesize){
        return SysHotKeyword.count().then(count=>{
            return SysHotKeyword.findPage({
                include:[{
                    model:SysUsers.sequlize,
                    attributes:['id','user_name','account_name'],
                    as:"creater_user",
                }]
            },page,count,1,pagesize);
        }).then(keywords=>{
            keywords.list.map(keyword=>{
                SysHotKeyword.formatSysHotKeyword(keyword.dataValues);
            });
            return keywords;
        });
    }
    /**
     * 编辑
     * @param id
     * @param name
     * @param modifier
     * @returns {*}
     */
    editHotKeyword(id,name,modifier){
        return SysHotKeyword.transaction(t=>{
            return SysHotKeyword.update({
                name:name,
                modifier:modifier
            },{
                where:{id:id},
                transaction:t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=>{
            return SysHotKeyword.findById(id,{
                include:[{
                    model:SysUsers.sequlize,
                    attributes:['id','user_name','account_name'],
                    as:"creater_user",
                }]
            });
        }).then(keyword=>{
            return SysHotKeyword.formatSysHotKeyword(keyword.dataValues);
        });
    }

    /**
     * 删除热词
     * @param id
     * @returns {*}
     */
    destroy(id){
        return SysHotKeyword.transaction(t=>{
            return SysHotKeyword.destroy({where:{id:id},transaction:t});
        });
    }

    /**
     * 文章搜索热词
     */
    searchArticleHotKeyWord(){
        return SysHotKeyword.findList({
            attributes:['name']
        }).then(keywordList=>{
            return keywordList;
        });
    }
}
export default new SysHotKeywordService();