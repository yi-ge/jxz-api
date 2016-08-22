import {HousesComment,Houses,SysUsers,Users} from './../../../../core';
class HousesCommentService {
    /**
     * 添加评论
     * @param houses_id
     * @param comment_source
     * @param content JXZ用户id
     * @param modifier
     * @returns {*}
     */
    addManageComment(houses_id, comment_source, content, creater) {
        return SysUsers.getJXZUser(creater).then(user=> {
            HousesComment.addComment(houses_id, comment_source, content, user.id);
        });
    }

    /**
     * 批量添加评论
     * @param houses_id
     * @param comments
     * @param creater
     * @returns {Promise.<T>}
     */
    addManageCommentList(houses_id, comments, creater) {
        return SysUsers.getJXZUser(creater).then(user=> {
            return HousesComment.addCommentList(houses_id, comments, user.id);
        });
    }

    /**
     * 编辑评论
     * @param id
     * @param comment_source
     * @param modifier
     * @returns {Promise.<T>}
     */
    editComment(id, comment_source, content, modifier) {
        return HousesComment.transaction(t=> {
            return HousesComment.update({
                comment_source: comment_source,
                modifier: modifier,
                updated_at: new Date(),
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return HousesComment.findById(id);
        }).then(result=> {
            return HousesComment.formatHousesComment(result.dataValues);
        });
    }

    /**
     * 删除评论
     * @param id
     * @returns {*}
     */
    destroyComment(id, houses_id) {
        if (!!houses_id) return HousesComment.errorPromise("houses_id不能为空");
        return HousesComment.count({where: {houses_id: houses_id}}).then(count=> {
            return HousesComment.transaction(t=> {
                return HousesComment.destroy({where: {id: id}}, {transaction: t}).then(result=> {
                    return Houses.update({article_num: --count}, {
                        where: {id: houses_id},
                        transaction: t,
                        lock: t.LOCK.UPDATE,
                    }).then(()=> {
                        return result;
                    });
                });
            });
        });
    }

    /**
     * 获取酒店评论
     * @param id
     */
    findHouseComments(houses_id) {
        return HousesComment.findList({
            where: {houses_id: houses_id}
        }).then(result=> {
            result.list.map(comment=> {
                HousesComment.formatHousesComment(comment.dataValues);
            });
            return result;
        });
    }

    /**
     * 分页查询
     * @param houses_id
     * @param page
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findHouseCommentsPage(houses_id, page) {
        let where = {houses_id: houses_id};
        return HousesComment.count({where: where}).then(count=> {
            return HousesComment.findPage({where:where},page,count);
        }).then(result=> {
            result.list.map(comment=> {
                HousesComment.formatHousesComment(comment.dataValues);
            });
            return result;
        });
    }
}
export default new HousesCommentService();