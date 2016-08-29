/**
 * Created by NX on 2016/8/18.
 */
import ArticlesComment from './articlescomment';
import Users from './../users/users';
import Articles from './../articles/articles';
//评论关联评论人
ArticlesComment.sequlize.belongsTo(Users.sequlize,{
    foreignKey:'comment_user_id',
    targetKey:'id',
    as:'comment_user'
});
//评论关联评论文章
ArticlesComment.sequlize.belongsTo(Articles.sequlize,{
    foreignKey:'articles_id',
    targetKey:'id'
});
export default ArticlesComment;