import {UsersFavorite,Articles} from './../../../../core';
class UsersFavoriteService {
    /**
     * 收藏文章 （文章收藏数+1）
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    collectionArticle(user_id, favorite_source_id) {
        return UsersFavorite.transaction(t=> {
            return UsersFavorite.collection(user_id, favorite_source_id, 1, t).then(result=> {
                return UsersFavorite.count({
                    where: {
                        user_id: user_id,
                        favorite_source_id: favorite_source_id,
                        favorite_type: 1
                    }
                }).then(count=> {
                    return Articles.updateAtNum(favorite_source_id, count + 1, t);
                }).then(()=> {
                    return result;
                });
            });
        });
    }

    /**
     * 取消收藏
     * @param user_id
     * @param favorite_source_id
     * @returns {*}
     */
    cancelArticle(user_id, favorite_source_id) {
        return UsersFavorite.transaction(t=>{
            return UsersFavorite.cancel(user_id, favorite_source_id,1,5).then(result=>{
                return UsersFavorite.count({
                    where: {
                        user_id: user_id,
                        favorite_source_id: favorite_source_id,
                        favorite_type: 1
                    }
                }).then(count=> {
                    return Articles.updateAtNum(favorite_source_id, count -1, t);
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
        return UsersFavorite.isCollection(user_id, favorite_source_id);
    }
}
export default new UsersFavoriteService();