import {Articles,Users,Houses,SysUsers,SysDict,UsersFavorite,ArticlesComment,SysInform} from './../../../core';
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
            if(!user) return Users.errorPromise("不是精选者");
            return Users.getArticleCount(user.id).then(count=> { //统计发布的文章数
                return Articles.transaction(t=> {
                    return Articles.insert(Articles.createModel(title, content, user.id, Articles.AUTHORTYPE.BACKSTAGE, Articles.DRAFT.NO, user.id, user.id), {
                        transaction: t
                    }).then(articles=> {
                        return Users.updateArticleNum(user.id, count + 1, t).then(()=> {
                            return articles;
                        });
                    });
                });
            });
        }).then(articles=> {
            return Articles.formatArticle(articles.dataValues);
        });
    }

    /**
     * 微信添加文章
     * @param user_id
     * @param title
     * @param content
     * @param isDraft
     * @returns {*}
     */
    wetchatAddArticles(user_id, title, content, isDraft) {
        if (!title || !content)return Articles.errorPromise('文章格式不正确');
        return Users.count({id: user_id}).then(count=> {
            if (count == 0) return Users.errorPromise('用户不存在');
            return Articles.transaction(t=> {
                let returnResult;
                return Articles.insert(Articles.createModel(title, content, user_id, Articles.AUTHORTYPE.FRONT, isDraft, user_id, user_id), {
                    transaction: t
                }).then(articles=> {
                    returnResult = articles;
                    if (isDraft == Articles.DRAFT.YES) return articles; //不存草稿 文章数+1
                    return Users.updateArticleNum(user_id, count + 1, t);
                }).then(()=> {
                    return returnResult;
                });
            });
        });
    }

    /**
     * 前端用户保存文章至草稿箱
     * @param user_id
     * @param title
     * @param content
     * @returns {*}
     */
    wetchatAddDraftArticles(user_id, title, content) {
        return this.wetchatAddArticles(user_id, title, content, Articles.DRAFT.YES);
    }

    /**
     * 保存并发布文章
     * @param user_id
     * @param title
     * @param content
     * @returns {*}
     */
    wetchatAddReleaseArticles(user_id, title, content) {
        return this.wetchatAddArticles(user_id, title, content, Articles.DRAFT.NO);
    }


    /**
     * 编辑文章
     * @param id
     * @param title
     * @param content
     * @returns {*}
     */
    editToDraftArticle(id, title, content) {
        return Articles.findById(id).then(article=> {
            if (!article) return Articles.errorPromise("文章不存在");
            if (article.is_draft != Articles.DRAFT.YES) return Articles.errorPromise("文章不是可编辑的");
            return Articles.transaction(t=> {
                return Articles.update({
                    title: title,
                    content: content,
                    updated_at: new Date(),
                }, {
                    where: {id: id},
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });
            }).then(()=> {
                return article;
            });
        }).then(article=> {
            return Articles.formatArticle(article.dataValues);
        });
    }

    /**
     * 删除文章
     * @param id
     * @param user_id
     * @returns {*}
     */
    deleteWetchatArticle(id, user_id) {
        return Articles.findById(id).then(article=> {
            if (article.is_draft == Articles.DRAFT.NO) return Articles.errorPromise("不是草稿文章");
            return article;
        }).then(()=> {
            return Articles.transaction(t=> {
                return Articles.destroy({where: {id: id}, transaction: t});
            });
        });
    }

    /**
     * 投稿文章
     * @param id
     * @returns {*}
     */
    wetchatContributeArticle(id, user_id) {
        return Articles.findById(id).then(article=> {
            if (!article) return Articles.errorPromise("文章不存在");
            return Articles.transaction(t=> {
                return Articles.contribute(id, t).then(()=> {
                    return Users.getArticleCount(user_id); //获取已经投稿的文章数
                }).then(count=> {
                    return Users.updateArticleNum(user_id, count + 1, t); //投稿数+1
                });
            }).then(()=> {
                return article;
            })
        }).then(article=> {
            return Articles.formatArticle(article.dataValues);
        });
    }

    /**
     * 评论文章（微信端）
     * @param id
     * @param comment_user_id
     * @param content
     * @param creater
     * @returns {*}
     */
    wetchatCommentArticle(id, comment_user_id, content) {
        let _article;
        if (!content) return ArticlesComment.errorPromise("评论不能为空");
        return Articles.findById(id).then(article=> {
            _article = article;
            return article;
        }).then(()=> {
            return ArticlesComment.transaction(t=> {
                let returnResult;
                return ArticlesComment.insert(ArticlesComment.createModel(id, comment_user_id, content, comment_user_id, comment_user_id), {
                    transaction: t
                }).then(result=> {
                    returnResult = result;
                    //评论文章时 添加一条消息发送给用户
                    return SysInform.userToArticleMsg(SysInform.TYPE.COMMENT, comment_user_id, _article.author, "评论", Articles.sysInformTemp(_article, content), id, t);
                }).then(()=> {
                    return ArticlesComment.formatArticleComment(returnResult.dataValues);
                });
            });
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
        if (endDate != void(0)) {
            endDate = new Date(endDate);
            endDate = endDate.setDate(endDate.getDate() + 1);
            endDate = Houses.formatDate(endDate, 'yyyy-MM-dd');
        }
        let where = Object.assign({is_draft: Articles.DRAFT.NO}, Articles.getAuditStatusWhere(status));
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
                }, sortType ? {order: `read_num ${sortType == 1 ? `ASC` : `DESC`}`} : (sortType = 2, {order: `created_at DESC`}))
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
        let articleResult;
        return Articles.findById(id, {
            include: [{
                model: Users.sequlize,
                attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
            }, {
                model: Houses.sequlize,
                as: 'houses',
                attributes: ['id', 'address']
            }]
        }).then(article=> {
            articleResult = article;
            return Articles.transaction(t=> {
                return Articles.updateAuditStatus(id, status, modifier, t).then(()=> {
                    if (status == Articles.AUDITING.HIGHLINE) return SysInform.articleAuditPass(article.title, article.author, null, t).then(result=> {
                        return articleResult;
                    });
                    return articleResult;
                });
            });
        }).then(article => {
            article.user && Users.formatUser(article.user.dataValues);
            article.dataValues && Object.assign(article.dataValues,Articles.getAuditStatusWhere(status));
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
    findWetcharArticlesPageList(page, status, sortType = 2, pagesize) {
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
     * 预览文章
     * @param id
     * @returns {*}
     */
    previewArticle(id) {
        return Articles.findById(id).then(article=> {
            return Articles.formatArticle((article.dataValues));
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
     * 查询用户文章
     * @param user_id
     * @param page
     * @param auditingStatus
     * @returns {*}
     */
    findUsersArticle(user_id, page, pagesize, auditingStatus) {
        if (!user_id) return Articles.errorPromise("作者id不正确");
        let where = Object.assign({author: user_id}, Articles.getAuditStatusWhere(auditingStatus));
        let include = [];
        if (auditingStatus != Articles.AUDITING.OFFLINE) include.push({
            model: Houses.sequlize,
            as: 'houses',
            attributes: ['id', 'address']
        });
        return Articles.count({where: where}).then(count=> {
            return Articles.findPage({
                where: where,
                include: include,
                order: `created_at DESC`
            }, page, count, 2, pagesize);
        }).then(result=> {
            result.list.map(article=> {
                Articles.formatArticle(article.dataValues);
            });
            return result;
        });
    }

    /**
     * 查询酒店相关文章 (微信)
     * @param house_id
     * @param page
     * @param pagesize
     */
    findHousesArticle(house_id, page, pagesize) {
        let where = Object.assign({houses_id: house_id}, Articles.getAuditStatusWhere(Articles.AUDITING.HIGHLINE));
        return Articles.count({where: where}).then(count=> {
            return Articles.findPage({
                where: where,
                include: [{
                    model: Users.sequlize,
                    attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
                }, {
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address']
                }],
                order: `created_at DESC`
            }, page, count, 2, pagesize);
        }).then(result=> {
            result.list.map(article=> {
                Articles.formatArticle(article.dataValues);
            });
            return result;
        });
    }

    /**
     * 查询用户上线文章列表（微信）
     * @param user_id
     * @param page
     * @returns {*}
     */
    findUserArticleHighline(user_id, page, pagesize) {
        return this.findUsersArticle(user_id, page, pagesize, Articles.AUDITING.HIGHLINE);
    }

    /**
     * 查询用户未上线文章（微信）
     * @param user_id
     * @param page
     * @returns {*}
     */
    findUserArticleOffline(user_id, page, pagesize) {
        return this.findUsersArticle(user_id, page, pagesize, Articles.AUDITING.NOTLINE);
    }

    /**
     * 查询用户所有文章 （微信）
     * @param user_id
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findUserArticleAll(user_id, page, pagesize) {
        return this.findUsersArticle(user_id, page, pagesize);
    }

    /**
     * 查询用户投稿文章(后台)
     * @param user_id
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findUserArticleNotDraft(user_id, page, pagesize) {
        let where = {author: user_id, is_draft: Articles.DRAFT.NO};
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
        let classType = UsersFavorite.FAVORITECLASS.COLLECTARTICLE;
        let _article;
        if (!user_id || !favorite_source_id) return Articles.errorPromise('参数不正确');
        return Articles.findById(favorite_source_id).then(article=> {
            _article = article;
            if (!article) return Articles.errorPromise('文章不存在');
            if (article.author == user_id) return Articles.errorPromise('不能收藏自己的文章');
            return UsersFavorite.isCollection(user_id, favorite_source_id, classType);
        }).then(result=> {
            if (result.iscollection) return UsersFavorite.errorPromise("已经收藏该文章,不能重复收藏");
            return true;
        }).then(()=> {
            return UsersFavorite.transaction(t=> {
                let returnResult;
                //添加文章收藏数据
                return UsersFavorite.collection(user_id, favorite_source_id, classType, t).then(result=> {
                    returnResult = result;
                    //统计文章收成数目
                    return UsersFavorite.countSourceFavorite(favorite_source_id, classType)
                }).then(count=> {
                    //修改文章收藏数目
                    return Articles.updateAtNum(favorite_source_id, count + 1, t);
                }).then(()=> {
                    //文章收藏消息存入数据库
                    return SysInform.userToArticleMsg(SysInform.TYPE.COLLECT, user_id, _article.author, "收藏", Articles.sysInformTemp(_article), favorite_source_id, t);
                }).then(()=> {
                    return returnResult;
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
        let classType = UsersFavorite.FAVORITECLASS.COLLECTARTICLE;
        return UsersFavorite.transaction(t=> {
            let returnResult;
            return UsersFavorite.cancel(user_id, favorite_source_id, classType, t).then(result=> {
                returnResult = result;
                return UsersFavorite.countSourceFavorite(favorite_source_id, classType)
            }).then(count=> {
                count > 0 ? count = count - 1 : 0;
                return Articles.updateAtNum(favorite_source_id, count, t);
            }).then(()=> {
                return returnResult;
            });
        });
    }

    /**
     * 是否收藏
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    isCollectionArticle(user_id, favorite_source_id) {
        let classType = UsersFavorite.FAVORITECLASS.COLLECTARTICLE;
        return UsersFavorite.isCollection(user_id, favorite_source_id, classType);
    }

    /**
     * 点赞文章
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    likeArticle(user_id, favorite_source_id) {
        let PRAISE = UsersFavorite.FAVORITECLASS.PRAISEARTICLE;
        let _article;
        return Articles.findById(favorite_source_id).then(article=> {
            _article = article;
            if (!article) return Articles.errorPromise('文章不存在');
            if (article.author == user_id) return Articles.errorPromise("不能给自己文章点赞");
            return UsersFavorite.isCollection(user_id, favorite_source_id, PRAISE);
        }).then(result=> {
            if (result.iscollection) return UsersFavorite.errorPromise("已经点赞文章,不能重复点赞");
            return true;
        }).then(()=> {
            return UsersFavorite.transaction(t=> {
                let returnResult;
                //点赞存入表中
                return UsersFavorite.collection(user_id, favorite_source_id, PRAISE, t).then(result=> {
                    returnResult = result;
                    //统计当前文章已得到点赞数
                    return UsersFavorite.countSourceFavorite(favorite_source_id, PRAISE);
                }).then(count=> {
                    //修改文章点赞数目
                    return Articles.updateLikeNum(favorite_source_id, count + 1, t);
                }).then(()=> {
                    //点赞文章存入表中 用户动态时需要查询
                    return SysInform.userToArticleMsg(SysInform.TYPE.PRAISE, user_id, _article.author, "点赞", Articles.sysInformTemp(_article), favorite_source_id, t);
                }).then(()=> {
                    return returnResult;
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
        let PRAISE = UsersFavorite.FAVORITECLASS.PRAISEARTICLE;
        return UsersFavorite.transaction(t=> {
            let returnResult;
            return UsersFavorite.cancel(user_id, favorite_source_id, PRAISE, t).then(result=> {
                returnResult = result;
                return UsersFavorite.countSourceFavorite(favorite_source_id, PRAISE);
            }).then(count=> {
                count > 0 ? count = count - 1 : 0;
                return Articles.updateLikeNum(favorite_source_id, count, t);
            }).then(()=> {
                return returnResult;
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
        let PRAISE = UsersFavorite.FAVORITECLASS.PRAISEARTICLE;
        return UsersFavorite.isCollection(user_id, favorite_source_id, PRAISE);
    }

    /**
     * 查询文章评论
     * @param id
     * @param page
     * @param pagesize
     */
    findArticleCommentList(id, page, pagesize) {
        let where = {articles_id: id};
        return ArticlesComment.count({where: where}).then(count=> {
            return ArticlesComment.findPage({
                where: where,
                order: `created_at DESC`,
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
     * 指定用户收藏的文章
     * @param user_id
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findUserCollectionArticle(user_id, page, pagesize) {
        let where = {},
            include = [{
                model: Users.sequlize,
                through: {attributes: []},
                attributes: ['id'],
                as: 'favorite_user'
            }];
        where.$and = Users.where(Users.col('favorite_user.id'), '=', user_id);
        return Articles.count({
            where: where,
            include: include
        }).then(count=> {
            return Articles.findList({
                where: where,
                include: include.concat([{
                    model: Users.sequlize,
                    attributes: ['id', 'user_name', 'avatar', 'user_vip_id']
                }, {
                    model: Houses.sequlize,
                    as: 'houses',
                    attributes: ['id', 'address'],
                }]),
                order: `read_num DESC`
            }, page, 5, count, page, pagesize);
        }).then(articlelist=> {
            articlelist.list.map(article=> {
                Articles.formatArticle(article.dataValues);
                delete article.dataValues.favorite_user;
            });
            return articlelist;
        });
    }

    /**
     * 模糊搜索文章
     * @param text
     * @param page
     * @returns {*}
     */
    vagueSearchHouses(text, page, pagesize) {
        if (!text) return Articles.errorPromise("输入格式有误");
        let where = {};
        where[`$or`] = [
            Houses.where(Houses.col('houses.name'), 'like', `%${text}%`),
            SysDict.where(SysDict.col('houses.regions.name'), 'like', `%${text}%`),
            SysDict.where(SysDict.col('houses.regions.country_p.name'), 'like', `%${text}%`),
        ];
        let include = [{
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
        }];
        return Articles.count({
            where: where,
            include: include
        }).then(count=> {
            return Articles.findPage({
                where: where,
                include: include,
                attributes: {exclude: 'content'},
                order: `read_num DESC`,
            }, page, count, 2, pagesize);
        }).then(result=> {
            result.list.map(article=> {
                Articles.formatArticle(article.dataValues);
            });
            return result;
        });
    }
}
export default new ArticlesService();