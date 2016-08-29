import express from "express";
import {ArticlesService,UsersService} from './../../../service/wetchat';
const router = express.Router();
//文章列表
router.post('/list', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        status = param.status,
        pagesize = param.pagesize;
    next({
        $promise: ArticlesService.findWetcharArticlesPageList(page, status, 2, pagesize),
        msg: '文章查询失败'
    });
});
//查询用户的文章列表
router.post('/userarticlelistonline', (req, res, next)=> {
    let param = req.body;
    let user_id = param.user_id,
        page = param.page;
    next({
        $promise: ArticlesService.findUserArticleOnline(user_id, page),
        msg: '用户文章查询失败'
    });
});
//评论文章
router.post('/commentarticle',(req,res,next)=>{
    let param = req.body;
    let article_id = param.article_id,
        comment_user_id = param.comment_user_id,
        content = param.content;
    next({
        $promise: ArticlesService.wetchatCommentArticle(article_id,comment_user_id,content),
        msg: '文章评论失败'
    });
});

//查看文章评论
router.post('/findcomment',(req,res,next)=>{
    let param = req.body;
    let article_id = param.article_id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: ArticlesService.findArticleCommentList(article_id,page,pagesize),
        msg: '文章评论获取失败'
    });
});
//收藏文章
router.post('/collectionarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.collectionArticle(id, article_id),
        msg: '收藏文章失败'
    });
});
//取消收藏
router.post('/cancelarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.cancelArticle(id, article_id),
        msg: '取消收藏失败'
    });
});
//是否收藏
router.post('/iscollectionarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.isCollectionArticle(id, article_id),
        msg: '判断收藏是否失败'
    });
});
//点赞文章
router.post('/likearticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.likeArticle(id, article_id),
        msg: '收藏文章失败'
    });
});
//取消点赞
router.post('/cancellikearticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.cancelLikeArticle(id, article_id),
        msg: '取消收藏失败'
    });
});
//是否点赞
router.post('/islikearticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.isLikeArticle(id, article_id),
        msg: '判断收藏是否失败'
    });
});
//查看文章
router.post('/view', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: ArticlesService.viewArticle(id),
        msg: '阅读文章失败'
    });
});
export default router;