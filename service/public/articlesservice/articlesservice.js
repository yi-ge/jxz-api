import {Articles,Users,Houses,SysUsers,SysDict,UsersFavorite,ArticlesComment} from './../../../core';
class ArticlesService {
    /**
     * 添加一篇文章
     * @param title
     * @param content
     * @param author
     * @returns {*}
     */
    manageAddArticles(sys_id, title, content) {
        return SysUsers.getJXZUser(sys_id).then(user=> { //获取管理员精选者
            return Users.getArticleCount(user.id).then(count=> { //统计发布的文章数
                return Articles.transaction(t=> {
                    return Articles.insert(Articles.createModel(title, content, user.id, Articles.AUTHORTYPE.BACKSTAGE, Articles.DRAFT.NO, user.id, user.id), {
                        transaction: t
                    }).then(articles=> {
                        return Users.updateArticleNum(user.id, count + 1, t).then(()=> {
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
     * 前端用户保存文章
     * @param user_id
     * @param title
     * @param content
     * @returns {*}
     */
    wetchatAddArticles(user_id, title, content) {
        if (!title || !content)return Articles.errorPromise('文章格式不正确');
        return Users.getArticleCount(user_id).then(count=> {
            if (count == 0) return Users.errorPromise('用户不存在');
            return Articles.transaction(t=> {
                return Articles.insert(Articles.createModel(title, content, user_id, Articles.AUTHORTYPE.FRONT, Articles.DRAFT.YES, user_id, user_id), {
                    transaction: t
                }).then(articles=> {
                    return Users.updateArticleNum(user_id, count + 1, t).then(()=> {
                        return articles;
                    });
                });
            });
        });
    }

    /**
     * 编辑文章
     * @param id
     * @param title
     * @param content
     * @returns {*}
     */
    editArticle(id,title,content){
        return Articles.findById(id).then(article=>{
            if(!article) return Articles.errorPromise("文章不存在");
            if(article.is_draft != Articles.DRAFT.YES) return Articles.errorPromise("文章不是可编辑的");
            return Articles.transaction(t=>{
                return Articles.update({
                    title:title,
                    content:content,
                    updated_at:new Date()
                },{
                    where:{id:id},
                    transaction:t,
                    lock: t.LOCK.UPDATE
                });
            }).then(()=>{
                return article;
            });
        }).then(article=>{
            return Articles.formatArticle(article.dataValues);
        });
    }

    /**
     * 投稿文章
     * @param id
     * @returns {*}
     */
    wetchatContributeArticle(id){
        return Articles.findById(id).then(article=>{
            if(!article) return Articles.errorPromise("文章不存在");
            return Articles.transaction(t=>{
                return Articles.contribute(id,t);
            }).then(()=>{
                return article;
            })
        }).then(article=>{
            return Articles.formatArticle(article.dataValues);
        });
    }

    /**
     * 评论文章（微信端）
     * @param articles_id
     * @param comment_user_id
     * @param content
     * @param creater
     * @returns {*}
     */
    wetchatCommentArticle(articles_id, comment_user_id, content) {
        if (!content) return ArticlesComment.errorPromise("评论不能为空");
        return ArticlesComment.transaction(t=> {
            return ArticlesComment.insert(ArticlesComment.createModel(articles_id, comment_user_id, content, comment_user_id, comment_user_id), {
                transaction: t
            }).then(result=> {
                return ArticlesComment.formatArticleComment(result.dataValues);
            })
        });
    }

    /**
     * 查询文章列表（后台）
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
        let where = Object.assign({is_draft:Articles.DRAFT.NO}, Articles.getAuditStatusWhere(status));
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
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
        }).then(result=> {
            result.list.map(article=> {
                Articles.formatArticle(article.dataValues);
            });
            return result;
        });
    }

    /**
     * 修改文章封面
     * @param id
     * @param cover_picture
     */
    updateCoverPicture(id, cover_picture, modifier) {
        return Articles.transaction(t=> {
            return Articles.updateCoverPicture(id, cover_picture, modifier, t);
        }).then(()=> {
            return Articles.findById(id, {
                include: [{
                    model: Users.sequlize,
                    attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
                }, {
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address']
                }]
            });
        }).then(result=> {
            return Articles.formatArticle(result.dataValues);
        });
    }

    /**
     * 后台预览文章
     * @param id
     */
    articleDetails(id) {
        return Articles.findById(id, {
            include: [{
                model: Users.sequlize,
                attributes: ['id', 'user_name']
            }, {
                model: Houses.sequlize,
                as: 'houses',
                attributes: ['id', 'name']
            }]
        }).then(article=> {
            if (!article) return Articles.errorPromise('文章不存在');
            return Articles.formatArticle(article.dataValues);
        });
    }

    /**
     * 改变文章上线状态
     * @param id
     * @param status
     */
    updateAudit(id, status, modifier) {
        return Articles.transaction(t=> {
            return Articles.updateAuditStatus(id, status, modifier, t);
        }).then(()=> {
            return Articles.findById(id, {
                include: [{
                    model: Users.sequlize,
                    attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
                }, {
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address']
                }]
            });
        }).then(article=> {
            article.user && Users.formatUser(article.user.dataValues);
            return Articles.formatArticle(article.dataValues);
        });
    }

    /**
     * 修改关联酒店
     * @param id
     * @param houses_id
     * @param modifier
     * @returns {*}
     */
    updateHousesId(id, houses_id, modifier) {
        return Articles.transaction(t=> {
            return Articles.updateHousesId(id, houses_id, modifier, t);
        }).then(()=> {
            return Articles.findById(id, {
                include: [{
                    model: Users.sequlize,
                    attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
                }, {
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address']
                }]
            });
        }).then(article=> {
            article.user && Users.formatUser(article.user.dataValues);
            return Articles.formatArticle(article.dataValues);
        });
    }

    /**
     * 微信首页查询文章 列表
     * @param page
     * @param status
     * @param sortType
     * @param pagesize
     * @returns {Promise.<T>}
     */
    findWetcharArticlesPageList(page, status, sortType = 2, pagesize = 20) {
        let where = Articles.getAuditStatusWhere(Articles.AUDITING.HIGHLINE), order;
        switch (status) {
            case 0:
                order = `created_at DESC`;
                break;
            case 1:
                order = `read_num DESC`;
                break;
        }
        return Articles.count({where: where}).then(count=> {
            return Articles.findPage(Object.assign({
                where: where,
                include: [{
                    model: Users.sequlize,
                    attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
                }, {
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address']
                }]
            }, order ? {order: order} : {}), page, count, sortType, pagesize);
        }).then(result=> {
            result.list.map(article=> {
                Articles.formatArticle(article.dataValues);
                article.user && Users.formatUser(article.user.dataValues);
            });
            return result;
        });
    }

    /**
     * 文章详情
     * @param id
     * @returns {*|Promise.<T>}
     */
    viewArticle(id) {
        return Articles.findById(id).then(article=> {
            return Articles.transaction(t=> {
                return Articles.updateReadNum(id, article.read_num + 1, t);
            }).then(()=> {
                article.read_num += 1;
                return Articles.formatArticle(article.dataValues);
            });
        });
    }

    /**
     * 查询用户上线文章列表
     * @param user_id
     * @param page
     * @returns {*}
     */
    findUserArticleOnline(user_id, page) {
        let where = Object.assign({author:user_id},Articles.getAuditStatusWhere(Articles.AUDITING.HIGHLINE));
        return Articles.count({where: where}).then(count=> {
            return Articles.findPage({
                where: where,
                include: [{
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address']
                }],
                order: `created_at DESC`
            }, page, count, 2);
        }).then(result=> {
            result.list.map(article=> {
                Articles.formatArticle(article.dataValues);
            });
            return result;
        });
    }

    /**
     * 查询用户的所有文章列表(通过作者)
     * @param user_id
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findUserArticleAll(user_id, page, pagesize) {
        let where = {author: user_id};
        return Articles.count({where: where}).then(count=> {
            return Articles.findPage({
                where: where,
                order: `created_at DESC`
            }, page, count, 2, pagesize);
        });
    }

    /**
     * 收藏文章
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    collectionArticle(user_id, favorite_source_id) {
        let classType = UsersFavorite.FAVORITECLASS.COLLECT;
        return UsersFavorite.isCollection(user_id, favorite_source_id, classType).then(result=> {
            if (result.iscollection) return UsersFavorite.errorPromise("已经收藏该文章");
            return true;
        }).then(()=> {
            return UsersFavorite.transaction(t=> {
                return UsersFavorite.collection(user_id, favorite_source_id, classType, t)
                    .then(result=> {
                        return UsersFavorite.countSourceFavorite(favorite_source_id, classType)
                            .then(count=> {
                                return Articles.updateAtNum(favorite_source_id, count + 1, t);
                            }).then(()=> {
                                return result;
                            });
                    });
            });
        })
    }


    /**
     * 取消收藏
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    cancelArticle(user_id, favorite_source_id) {
        let classType = UsersFavorite.FAVORITECLASS.COLLECT;
        return UsersFavorite.transaction(t=> {
            return UsersFavorite.cancel(user_id, favorite_source_id, classType, t).then(result=> {
                return UsersFavorite.countSourceFavorite(favorite_source_id, classType)
                    .then(count=> {
                        count > 0 ? count = count - 1 : 0;
                        return Articles.updateAtNum(favorite_source_id, count, t);
                    }).then(()=> {
                        return result;
                    });
            })
        });
    }

    /**
     * 是否收藏
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    isCollectionArticle(user_id, favorite_source_id) {
        let classType = UsersFavorite.FAVORITECLASS.COLLECT;
        return UsersFavorite.isCollection(user_id, favorite_source_id, classType);
    }

    /**
     * 点赞文章
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    likeArticle(user_id, favorite_source_id) {
        let PRAISE = UsersFavorite.FAVORITECLASS.PRAISE;
        return UsersFavorite.isCollection(user_id, favorite_source_id, PRAISE).then(result=> {
            if (result.iscollection) return UsersFavorite.errorPromise("已经点赞文章");
            return true;
        }).then(()=> {
            return UsersFavorite.transaction(t=> {
                return UsersFavorite.collection(user_id, favorite_source_id, PRAISE, t)
                    .then(result=> {
                        return UsersFavorite.countSourceFavorite(favorite_source_id, PRAISE)
                            .then(count=> {
                                return Articles.updateLikeNum(favorite_source_id, count + 1, t);
                            }).then(()=> {
                                return result;
                            });
                    });
            });
        })
    }

    /**
     * 取消点赞
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    cancelLikeArticle(user_id, favorite_source_id) {
        let PRAISE = UsersFavorite.FAVORITECLASS.PRAISE;
        return UsersFavorite.transaction(t=> {
            return UsersFavorite.cancel(user_id, favorite_source_id, PRAISE, t)
                .then(result=> {
                    return UsersFavorite.countSourceFavorite(favorite_source_id, PRAISE)
                        .then(count=> {
                            count > 0 ? count = count - 1 : 0;
                            return Articles.updateLikeNum(favorite_source_id, count, t);
                        }).then(()=> {
                            return result;
                        });
                })
        });
    }

    /**
     * 是否点赞
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    isLikeArticle(user_id, favorite_source_id) {
        let PRAISE = UsersFavorite.FAVORITECLASS.PRAISE;
        return UsersFavorite.isCollection(user_id, favorite_source_id,PRAISE);
    }

    /**
     * 查询文章评论
     * @param article_id
     * @param page
     * @param pagesize
     */
    findArticleCommentList(article_id, page, pagesize) {
        let where = {articles_id: article_id};
        return ArticlesComment.count({where: where}).then(count=> {
            return ArticlesComment.findPage({
                where: where,
                order: `created_at DESC`,
                attributes: {exclude: 'comment_user_id'},
                include: [{
                    model: Users.sequlize,
                    as: 'comment_user',
                    attributes: ['id', 'avatar', `user_name`]
                }]
            }, page, count, 2, pagesize);
        }).then(result=> {
            result.list.map(comment=> {
                ArticlesComment.formatArticleComment(comment.dataValues);
            });
            return result;
        });
    }
    /**
     * 模糊搜索文章
     * @param text
     * @param page
     * @returns {*}
     */
    vagueSearchHouses(text, page) {
        if (!text) return Articles.errorPromise("输入格式有误");
        let where = {};
        where[`$or`] = [
            Houses.where(Houses.col('houses.name'), 'like', `%${text}%`),
            SysDict.where(SysDict.col('houses.regions.name'), 'like', `%${text}%`),
            SysDict.where(SysDict.col('houses.regions.country_p.name'), 'like', `%${text}%`),
        ];
        return Articles.count({
            where: where,
            include: [{
                model: Houses.sequlize,
                as: 'houses',
                include: [{
                    model: SysDict.sequlize,
                    as: 'regions',
                    include: [{
                        model: SysDict.sequlize,
                        as: 'country_p',
                    }]
                }]
            }]
        }).then(count=> {
            return Articles.findPage({
                where: where,
                attributes: {exclude: 'content houses_id'},
                include: [{
                    model: Users.sequlize,
                    attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
                }, {
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address'],
                    include: [{
                        model: SysDict.sequlize,
                        as: 'regions',
                        attributes: [],
                        include: [{
                            model: SysDict.sequlize,
                            as: 'country_p',
                            attributes: [],
                        }]
                    }]
                }]
            }, page, count);
        }).then(result=> {
            result.list.map(article=> {
                Articles.formatArticle(article.dataValues);
            });
            return result;
        });
    }
}
export default new ArticlesService();