/**
 * Created by NX on 2016/8/8.
 */
import articles from './articles.config';
import Base from './../base';
import UsersFavorite from './../usersfavorite/usersfavorite';
const AUTHORTYPE = {//作者类型
    FRONT:1,
    BACKSTAGE:2
},AUDITING = { //审核状态
    NOAUDIT:0, //未审核
    PASS:1, //通过
    REJECT:2, //拒绝
    OFFLINE:3, //离线
    HIGHLINE:4  //上线
},DRAFT={ // 是否是草稿
    YES:1,
    NO:2
};

class Articles extends Base {
    constructor() {
        super("articles", articles, {
            tableName: 'articles'
        });
        this.AUTHORTYPE = AUTHORTYPE;
        this.AUDITING = AUDITING;
        this.DRAFT = DRAFT;
    }

    /**
     *
     * @param title
     * @param content
     * @param author
     * @param author_type
     * @param is_draft 是否草稿
     * @param creater
     * @param modifier
     *        check_status 审核状态1通过2拒绝
     *        is_off  0离线1上线
     * @returns {{id: number, title: *, content: *, author: *, check_status: number, creater: *, modifier: *, author_type: *, created_at: Date, updated_at: Date, check_date: Date, is_off: number, read_num: number, at_num: number, like_num: number, is_draft: number}}
     */
    createModel(title, content, author, author_type,is_draft=DRAFT.YES, creater, modifier) {
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
            is_off: 0,
            read_num: 0,
            at_num: 0,
            like_num: 0,
            is_draft:is_draft
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
     * 修改文章关注数
     * @param id
     * @param at_num
     * @param t
     * @returns {*}
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
     * @param modifier
     * @param t
     * @returns {*}
     */
    updateCoverPicture(id, cover_picture,modifier, t) {
        return this.update({
            cover_picture: cover_picture,
            modifier:modifier,
            updated_at:new Date()
        }, {
            where: {id: id},
            transaction: t,
            lock: t.LOCK.UPDATE
        });
    }

    /**
     * 获取审核状态对象
     * @param status 0未审核1通过2拒绝3离线4上线
     * @returns {{}}
     */
    getAuditStatusWhere(status){
        let whereAuditStatus = {};
        if(status != void(0)) switch (parseInt(status)) {
            case AUDITING.NOAUDIT:whereAuditStatus['check_status'] = 0;break;
            case AUDITING.PASS:whereAuditStatus['check_status'] = 1;break;
            case AUDITING.REJECT:whereAuditStatus['check_status'] = 2;break;
            case AUDITING.OFFLINE:whereAuditStatus['is_off']=0;break;
            case AUDITING.HIGHLINE:whereAuditStatus['is_off'] = 1;whereAuditStatus['check_status']=1;break;
            default: break;
        }
        return whereAuditStatus;
    }

    /**
     * @param id
     * @param status 审核状态
     * @param modifier
     * @param t
     * @returns {*}
     */
    updateAuditStatus(id,status,modifier,t){
        let updateOption = Object.assign({modifier:modifier,updated_at:new Date()},this.getAuditStatusWhere(status));
        return this.update(updateOption,{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }

    /**
     * 修改关联酒店
     * @param id
     * @param houses_id
     * @param modifier
     * @param t
     * @returns {*}
     */
    updateHousesId(id,houses_id,modifier,t){
        return this.update({
            houses_id:houses_id,
            updated_at:new Date(),
            modifier:modifier,
        },{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }
    /**
     * 修改文章阅读数量
     * @param id
     * @param num
     * @param t
     * @returns {*}
     */
    updateReadNum(id,num,t){
        return this.update({
            read_num:num
        },{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }

    /**
     * 修改文章点赞数
     * @param id
     * @param num
     * @param t
     * @returns {*}
     */
    updateLikeNum(id,num,t){
        return this.update({
            like_num:num
        },{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }

    /**
     * 投稿文章
     * @param id
     * @param t
     * @returns {*}
     */
    contribute(id,t){
        return this.update({
            is_draft:DRAFT.NO,
            updated_at:new Date(),
        },{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        });
    }
}

export default new Articles();