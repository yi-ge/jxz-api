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
        msg: '列表查询失败'
    });
});
//查询用户上线文章列表
router.post('/userarticlelistonline', (req, res, next)=> {
    let param = req.body;
    let user_id = param.user_id,
        page = param.page;
    next({
        $promise: ArticlesService.findUserArticleHighline(user_id, page),
        msg: '用户上线文章查询失败'
    });
});
//查询用户未上线文章列表
router.post('/userarticlelistoffline', (req, res, next)=> {
    let param = req.body;
    let user_id = param.user_id,
        page = param.page;
    next({
        $promise: ArticlesService.findUserArticleOffline(user_id, page),
        msg: '用户未上线文章查询失败'
    });
});
//保存草稿文章
router.post('/addtodraft',(req,res,next)=>{
    let param = req.body;
    let user_id = param.user_id,
        title = param.title,
        content = param.content;
    next({
        $promise: ArticlesService.wetchatAddDraftArticles(user_id,title,content),
        msg: '文章保存失败'
    });
});
//保存并发布文章
router.post('/addtorelease',(req,res,next)=>{
    let param = req.body;
    let user_id = param.user_id,
        title = param.title,
        content = param.content;
    next({
        $promise: ArticlesService.wetchatAddReleaseArticles(user_id,title,content),
        msg: '文章发布失败'
    });
});
//编辑文章
router.post('/edittodraft',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        title = param.title,
        content = param.content;
    next({
        $promise: ArticlesService.editToDraftArticle(id,title,content),
        msg: '文章编辑失败'
    });
});
//文章投稿
router.post('/contribute',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        user_id = param.user_id;
    next({
        $promise: ArticlesService.wetchatContributeArticle(id,user_id),
        msg: '文章投稿失败'
    });
});
//删除草稿文章
router.post('/deletearticle',(req,res,next)=>{a
    let param = req.body;
    let id = param.id,
        user_id = param.user_id;
    next({
        $promise: ArticlesService.deleteWetchatArticle(id,user_id),
        msg: '文章删除失败'
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
        msg: '获取评论失败'
    });
});
//收藏文章
router.post('/collectionarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.collectionArticle(id, article_id),
        msg: '文章收藏失败'
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
        msg: '点赞失败'
    });
});
//取消点赞
router.post('/cancellikearticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.cancelLikeArticle(id, article_id),
        msg: '取消点赞失败'
    });
});
//是否点赞
router.post('/islikearticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise: ArticlesService.isLikeArticle(id, article_id),
        msg: '判断是否点赞失败'
    });
});
//预览文章
router.post('/preview', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: ArticlesService.previewArticle(id),
        msg: '文章预览失败'
    });
});
//查看文章
router.post('/view', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: ArticlesService.viewArticle(id),
        msg: '文章阅读失败'
    });
});
//模糊查询文章
router.post('/search',(req,res,next)=>{
    let param = req.body;
    let text = param.text,
        page = param.page;
    next({
        $promise: ArticlesService.vagueSearchHouses(text, page),
        msg: '文章查询失败'
    });
});
export default router;