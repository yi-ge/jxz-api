/**
 * Created by NX on 2016/8/8.
 */
import articles from './articles.config';
import Base from './../base';

class Articles extends Base {
    constructor() {
        super("articles", articles, {
            tableName: 'articles'
        });
    }
    createModel(title,content,author,author_type){
        let model = {
            id:this.generateId(),
            title:title,
            content:content,
            author:author,
            check_status:0,
            author_type:author_type,
            created_at:new Date(),
            updated_at:new Date(),
            check_date:new Date(),
            is_off:1,
            read_num:0,
            at_num:0
        };
        return model;
    }
    formatArticle(article){

    }
}

export default new Articles();