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
    addManageComment(houses_id, comment_source, content, comment_date, creater) {
        return SysUsers.getJXZUser(creater).then(user=> {
            return HousesComment.transaction(t=> {
                return HousesComment.addComment(houses_id, comment_source, content, user.id, comment_date, t);
            });
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
            return HousesComment.transaction(t=> {
                return HousesComment.addCommentList(houses_id, comments, user.id, t);
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
    editComment(id, comment_source, content, comment_date, modifier) {
        return SysUsers.getJXZUser(modifier).then(user=> {
            return HousesComment.transaction(t=> {
                return HousesComment.update({
                    comment_source: comment_source,
                    modifier: user.id,
                    updated_at: new Date(),
                    content: content,
                    comment_date: comment_date,
                }, {
                    where: {id: id},
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });
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
            where: {houses_id: houses_id},
            order: `comment_date DESC`
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
            return HousesComment.findPage({where: where, order: `comment_date DESC`}, page, count, 2);
        }).then(result=> {
            result.list.map(comment=> {
                HousesComment.formatHousesComment(comment.dataValues);
            });
            return result;
        });
    }

    /**
     * 微信添加酒店评论
     * @param houses_id
     * @param comment_source
     * @param content
     * @param creater
     * @returns {Promise.<T>}
     */
    addWatchHousesComment(houses_id, comment_source, content, creater) {
        return HousesComment.transaction(t=> {
            return HousesComment.addComment(houses_id, comment_source, content, creater, t)
        }).then(result=> {
            return HousesComment.formatHousesComment(result.dataValues);
        });
    }
}
export default new HousesCommentService();