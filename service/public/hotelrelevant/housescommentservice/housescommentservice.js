import {HousesComment,Houses} from './../../../../core';
class HousesCommentService {
    /**
     * 添加评论
     * @param houses_id
     * @param comment_source
     * @param content JXZ用户id
     * @param modifier
     * @returns {*}
     */
    addComment(houses_id,comment_source,content){
        return HousesComment.count({where:{houses_id:houses_id}}).then(count=>{
            return HousesComment.transaction(t=>{
                return HousesComment.insert(HousesComment.createModel(houses_id,comment_source,content,content),{transaction:t}).then(result=>{
                    return result;
                }).then(result=>{
                    return Houses.update({article_num:++count},{
                        where:{id:houses_id},
                        transaction:t,
                        lock: t.LOCK.UPDATE,
                    }).then(()=>{
                        return result;
                    });
                });
            });
        });
    }

    /**
     * 编辑评论
     * @param id
     * @param comment_source
     * @param modifier
     * @returns {Promise.<T>}
     */
    editComment(id,comment_source,modifier){
        return HousesComment.transaction(t=>{
           return HousesComment.update({
               comment_source:comment_source,
               modifier:modifier,
               updated_at:new Date(),
           },{
               where:{id:id},
               transaction:t,
               lock: t.LOCK.UPDATE
           });
        }).then(()=>{
            return HousesComment.findById(id);
        }).then(result=>{
            return HousesComment.formatHousesComment(result.dataValues);
        });
    }

    /**
     * 删除评论
     * @param id
     * @returns {*}
     */
    destroyComment(id,houses_id){
        if(!!houses_id) return HousesComment.errorPromise("houses_id不能为空");
        return HousesComment.count({where:{houses_id:houses_id}}).then(count=>{
            return HousesComment.transaction(t=>{
                return HousesComment.destroy({where:{id:id}},{transaction:t}).then(result=>{
                    return Houses.update({article_num:--count},{
                        where:{id:houses_id},
                        transaction:t,
                        lock: t.LOCK.UPDATE,
                    }).then(()=>{
                        return result;
                    });
                });
            });
        });

    }
}
export default new HousesCommentService();