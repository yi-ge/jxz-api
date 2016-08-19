import {Articles,Users,Houses,SysUsers} from './../../../core';
class ArticlesService {
    /**
     * 添加一篇文章
     * @param title
     * @param content
     * @param author
     * @returns {*}
     */
    manageAddArticles(sys_id, title, content) {
        let user;
        return SysUsers.findById(sys_id, {
            include: [{model: Users.sequlize}]
        }).then(result=> {
            user = result.user;
            return Articles.count({where: {author: user.id}}).then(count=> {
                return Articles.transaction(t=> {
                    return Articles.insert(Articles.createModel(title, content, user.id, 2, user.id, user.id), {
                        transaction: t
                    }).then(articles=> {
                        return Users.update({article_num: ++count}, {
                            where: {id: user.id},
                            transaction: t,
                            lock: t.LOCK.UPDATE,
                        }).then(()=> {
                            return articles;
                        })
                    });
                });
            });
        }).then(articles=> {
            return Articles.formatArticle(articles.dataValues);
        });
    }

    /**
     * 查询文章列表
     * @param page
     * @param startDate
     * @param endDate
     * @param status
     * @param house_name
     * @param sortType
     * @param pagesize
     * @returns {*|Promise.<T>}
     */
    findPageList(page, title, startDate, endDate, status, house_name, sortType, pagesize) {
        let where = {};
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        switch (parseInt(status)) {
            case 0: where['check_status'] = 0; break;
            case 1: where['check_status'] = 1; break;
            case 2: where['check_status'] = 2; break;
            case 3: where['is_off'] = 0; break;
        }
        !!title && (where['title'] = {$like: `%${title}%`});
        !!house_name && (where['$and'] = [Articles.where(Articles.col(`${Houses.sequlize.name}.name`), 'like', `%${house_name}%`)]);
        return Articles.count({where: where}).then(count=> {
            return Articles.findPage(Object.assign({
                    where: where,
                    include: [{
                        model: Houses.sequlize,
                        as: Houses.sequlize.name,
                        attributes: ['id', 'name'],
                    }, {
                        model: Users.sequlize,
                        attributes: ['id', 'user_name'],
                    }],
                }, sortType ? {order: `read_num ${sortType == 1 ? `ASC` : `DESC`}`} : {})
                , page, count, sortType, pagesize);
        }).then(result=>{
            result.list.map(article=>{
                Articles.formatArticle(article.dataValues);
            });
            return result;
        });
    }
}
export default new ArticlesService();