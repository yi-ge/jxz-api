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
}

export default new ArticlesComment();