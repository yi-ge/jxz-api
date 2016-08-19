/**
 * Created by NX on 2016/8/8.
 */
import housescomment from './housescomment.config';
import Base from './../base';

class HousesComment extends Base {
    constructor() {
        super("houses_comment", housescomment, {
            tableName: 'houses_comment'
        });
    }

    createModel(houses_id,comment_source,content,modifier){
        let model = {
            id:this.generateId(),
            houses_id:houses_id,
            comment_source:comment_source,
            content:content,
            modifier:modifier,
            comment_date:new Date(),
            created_at:new Date(),
            updated_at:new Date()
        };
        return model;
    }
    formatHousesComment(comment){
        !!comment.comment_date && (comment.comment_date = this.formatDate(comment.comment_date,'yyyy-MM-dd hh:mm:ss'));
        !!comment.created_at && (comment.created_at = this.formatDate(comment.created_at,'yyyy-MM-dd hh:mm:ss'));
        !!comment.updated_at && (comment.updated_at = this.formatDate(comment.updated_at,'yyyy-MM-dd hh:mm:ss'));
        return comment;
    }
}

export default new HousesComment();