/**
 * Created by NX on 2016/8/8.
 */
import housescomment from './housescomment.config';
import Base from './../base';
import Houses from './../houses/houses';
class HousesComment extends Base {
    constructor() {
        super("houses_comment", housescomment, {
            tableName: 'houses_comment'
        });
    }

    createModel(houses_id, comment_source, content, creater, modifier, created_at,comment_date) {
        let model = {
            id: this.generateId(),
            houses_id: houses_id,
            comment_source: comment_source,
            content: content,
            creater: creater,
            modifier: modifier,
            comment_date: new Date(comment_date),
            created_at: created_at ? new Date(created_at) : new Date(),
            updated_at: new Date(),
        };
        return model;
    }


    /**
     * 添加评论
     * @param houses_id
     * @param comment_source
     * @param content
     * @param creater
     * @returns {Promise.<T>}
     */
    addComment(houses_id, comment_source, content, creater, comment_date) {
        return Houses.getCommentCount(houses_id).then(count=> {
            return HousesComment.transaction(t=> {
                return HousesComment.insert(HousesComment.createModel(houses_id, comment_source, content, creater, creater, comment_date), {transaction: t}).then(result=> {
                    return result;
                }).then(result=> {
                    return Houses.update({comment_num: ++count}, {
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
     * 批量添加评论
     * @param houses_id
     * @param comments[comment_source,content,created_at]
     * @param creater
     * @returns {*}
     */
    addCommentList(houses_id, comments, creater) {
        let insertList = [], length;
        if (Array.isArray(comments)) {
            comments.map(comment=> {
                insertList.push(this.createModel(houses_id, comment.comment_source, comment.content, creater, creater,comment.comment_date));
            });
        } else
            insertList.push(this.createModel(houses_id, comments.comment_source, comments.content, creater, creater,comments.comment_date));
        length = insertList.length;
        return Houses.getCommentCount(houses_id).then(count=> {
            return this.transaction(t=> {
                return this.bulkCreate(insertList, {transaction: t}).then(result=> {
                    return Houses.update({comment_num: count + length}, {
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

    formatHousesComment(comment) {
        !!comment.comment_date && (comment.comment_date = this.formatDate(comment.comment_date, 'yyyy-MM-dd hh:mm:ss'));
        !!comment.created_at && (comment.created_at = this.formatDate(comment.created_at, 'yyyy-MM-dd hh:mm:ss'));
        !!comment.updated_at && (comment.updated_at = this.formatDate(comment.updated_at, 'yyyy-MM-dd hh:mm:ss'));
        return comment;
    }
}

export default new HousesComment();