import {UsersFavorite} from './../../../../core';
class UsersFavoriteService {
    /**
     * 收藏文章
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    collectionArticle(user_id, favorite_source_id){
        return UsersFavorite.transaction(t=>{
            return UsersFavorite.insert(UsersFavorite.createModel(user_id, favorite_source_id, 1),{
                transaction:t
            }).then(result=>{
                return UsersFavorite.formatUsersFavorite(result);
            });
        });
    }

    /**
     * 取消收藏
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    cancelArticle(user_id,favorite_source_id){
        return UsersFavorite.transaction(t=>{
            return UsersFavorite.destroy({
                where:{
                    user_id:user_id,
                    favorite_source_id:favorite_source_id
                },
                transaction:t
            });
        });
    }

    /**
     * 是否收藏
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    isCollectionArticle(user_id,favorite_source_id){
        return UsersFavorite.count({
            where:{
                user_id:user_id,
                favorite_source_id:favorite_source_id
            }
        }).then(count=>{
            if (count != 0) return {iscollection: true};
            else return {iscollection: false};
        });
    }
}
export default new UsersFavoriteService();