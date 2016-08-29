/**
 * Created by NX on 2016/8/8.
 */
import articlescomment from './articlescomment.config';
import Base from './../base';

class ArticlesComment extends Base {
    constructor() {
        super("articles_comment", articlescomment, {
            tableName: 'articles_comment'
        });
    }

    createModel(articles_id,comment_user_id,content,creater,modifier){
        let model = {
            id:this.generateId(),
            articles_id:articles_id,
            comment_user_id:comment_user_id,
            content:content,
            creater:creater,
            modifier:modifier,
            comment_date:new Date(),
            created_at:new Date(),
            updated_at:new Date,
        };
        return model;
    }

    formatArticleComment(comment){
        if (comment == void(0)) return comment;
        comment.comment_date != void(0) && (comment.comment_date = this.formatDate(comment.comment_date, "yyyy-MM-dd hh:mm:ss"));
        comment.created_at != void(0) && (comment.created_at = this.formatDate(comment.created_at, "yyyy-MM-dd hh:mm:ss"));
        comment.updated_at != void(0) && (comment.updated_at = this.formatDate(comment.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return comment;
    }
}

export default new ArticlesComment();