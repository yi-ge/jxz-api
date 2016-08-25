import {Articles,Users,Houses,SysUsers,SysDict,UsersFavorite} from './../../../core';
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
                    return Articles.insert(Articles.createModel(title, content, user.id, 2, user.id, user.id), {
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
        let where = {};
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        switch (parseInt(status)) {
            case 0:
                where['check_status'] = 0;
                break;
            case 1:
                where['check_status'] = 1;
                break;
            case 2:
                where['check_status'] = 2;
                break;
            case 3:
                where['is_off'] = 0;
                break;
            case 4:
                where['is_off'] = 1;
                break;
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
            ;
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
        let where = {is_off:1}, order;
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
        let where = {author: user_id,is_off:1};
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
     * 收藏文章
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    collectionArticle(user_id, favorite_source_id) {
        return UsersFavorite.isCollection(user_id, favorite_source_id, 1).then(result=> {
            if (result.iscollection) return UsersFavorite.errorPromise("已经收藏该文章");
            return true;
        }).then(()=> {
            return UsersFavorite.transaction(t=> {
                return UsersFavorite.collection(user_id, favorite_source_id, 1, t)
                    .then(result=> {
                        return UsersFavorite.countSourceFavorite(favorite_source_id, 1)
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
        return UsersFavorite.transaction(t=> {
            return UsersFavorite.cancel(user_id, favorite_source_id, 1, t).then(result=> {
                return UsersFavorite.countSourceFavorite(favorite_source_id, 1)
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
        return UsersFavorite.isCollection(user_id, favorite_source_id, 1);
    }

    /**
     * 点赞文章
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    likeArticle(user_id, favorite_source_id) {
        return UsersFavorite.isCollection(user_id, favorite_source_id, 2).then(result=> {
            if (result.iscollection) return UsersFavorite.errorPromise("已经点赞文章");
            return true;
        }).then(()=> {
            return UsersFavorite.transaction(t=> {
                return UsersFavorite.collection(user_id, favorite_source_id, 2, t)
                    .then(result=> {
                        return UsersFavorite.countSourceFavorite(favorite_source_id, 2)
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
        return UsersFavorite.transaction(t=> {
            return UsersFavorite.cancel(user_id, favorite_source_id, 2, t)
                .then(result=> {
                    return UsersFavorite.countSourceFavorite(favorite_source_id, 2)
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
        return UsersFavorite.isCollection(user_id, favorite_source_id, 2);
    }
}
export default new ArticlesService();