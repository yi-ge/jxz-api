/**
 * Created by NX on 2016/8/8.
 */
import articles from './articles.config';
import Base from './../base';
import UsersFavorite from './../usersfavorite/usersfavorite';

class Articles extends Base {
    constructor() {
        super("articles", articles, {
            tableName: 'articles'
        });
    }

    createModel(title, content, author, author_type, creater, modifier) {
        let model = {
            id: this.generateId(),
            title: title,
            content: content,
            author: author,
            check_status: 0,
            creater: creater,
            modifier: modifier,
            author_type: author_type,
            created_at: new Date(),
            updated_at: new Date(),
            check_date: new Date(),
            is_off: 1,
            read_num: 0,
            at_num: 0,
            like_num: 0,
        };
        return model;
    }

    formatArticle(article) {
        article.created_at != void(0) && (article.created_at = this.formatDate(article.created_at, 'yyyy-MM-dd hh:mm:ss'));
        article.updated_at != void(0) && (article.updated_at = this.formatDate(article.updated_at, 'yyyy-MM-dd hh:mm:ss'));
        article.check_date != void(0) && (article.check_date = this.formatDate(article.check_date, 'yyyy-MM-dd hh:mm:ss'));
        return article;
    }

    /**
     * 修改关注数文章
     * @param user_id
     * @param favorite_source_id
     * @param favorite_type
     */
    updateAtNum(id, at_num, t) {
        return this.update({
            at_num: at_num
        }, {
            where: {id: id},
            transaction: t,
            lock: t.LOCK.UPDATE
        });
    }

    /**
     * 修改文章封面图
     * @param id
     * @param cover_picture
     * @param t
     * @returns {*}
     */
    updateCoverPicture(id, cover_picture, t) {
        return this.update({
            cover_picture: cover_picture
        }, {
            where: {id: id},
            transaction: t,
            lock: t.LOCK.UPDATE
        });
    }

    /**
     *
     * @param status 0未审核1通过2拒绝3离线4上线
     * @constructor
     */
    updateAuditStatus(id,status,t){
        let updateOption = {};
        switch (parseInt(status)) {
            case 0:updateOption['check_status'] = 0;break;
            case 1:updateOption['check_status'] = 1;break;
            case 2:updateOption['check_status'] = 2;break;
            case 3:updateOption['is_off'] = 0;break;
            case 4:updateOption['is_off'] = 1;break;
        }
        return this.update(updateOption,{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }
}

export default new Articles();