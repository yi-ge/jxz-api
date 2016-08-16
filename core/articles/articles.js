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
}

export default new Articles();