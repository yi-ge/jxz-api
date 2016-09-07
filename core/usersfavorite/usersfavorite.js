/**
 * Created by NX on 2016/8/8.
 */
import usersfavorite from './usersfavorite.config';
import Base from './../base';
//1是收藏 2是点赞
const FAVORITECLASS = {
    COLLECTARTICLE: 1, //收藏文章
    PRAISEARTICLE: 2 //点赞文章
};


class UsersFavorite extends Base {
    constructor() {
        super("users_favorite", usersfavorite, {
            tableName: 'users_favorite'
        });
        this.FAVORITECLASS = FAVORITECLASS;
    }

    createModel(user_id, favorite_source_id, favorite_type) {
        let model = {
            id: this.generateId(),
            user_id: user_id,
            favorite_source_id: favorite_source_id,
            favorite_type: favorite_type,
            created_at: new Date(),
            updated_at: new Date()
        };
        return model;
    }

    formatUsersFavorite(favorite) {
        favorite.created_at != void(0) && (favorite.created_at = this.formatDate(favorite.created_at, "yyyy-MM-dd hh:mm:ss"));
        favorite.updated_at != void(0) && (favorite.updated_at = this.formatDate(favorite.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return favorite;
    }

    getFavoriteTypeWhere(value){
        return {favorite_type:value};
    }

    /**
     * 统计某个用户favorite的某个类型
     * @param user_id
     * @param favorite_type
     */
    countUserFavorite(user_id, favorite_type) {
        return this.count({
            where: {
                user_id: user_id,
                favorite_type: favorite_type
            }
        });
    }

    /**
     * 统计摸个收藏源的favorite
     * @param favorite_source_id
     * @param favorite_type
     */
    countSourceFavorite(favorite_source_id, favorite_type) {
        return this.count({
            where: {
                favorite_source_id: favorite_source_id,
                favorite_type: favorite_type
            }
        });
    }

    /**
     * 添加收藏
     * @param user_id
     * @param favorite_source_id
     * @param favorite_type
     * @returns {*}
     */
    collection(user_id, favorite_source_id, favorite_type, t) {
        return this.insert(this.createModel(user_id, favorite_source_id, favorite_type), {
            transaction: t
        });
    }

    /**
     * 取消收藏
     * @param user_id
     * @param favorite_source_id
     * @param favorite_type
     * @returns {*}
     */
    cancel(user_id, favorite_source_id, favorite_type, t) {
        return this.destroy({
            where: {
                user_id: user_id,
                favorite_source_id: favorite_source_id,
                favorite_type: favorite_type
            },
            transaction: t
        });
    }

    /**
     * 是否收藏
     * @param user_id
     * @param favorite_source_id
     */
    isCollection(user_id, favorite_source_id, favorite_type) {
        return this.count({
            where: {
                user_id: user_id,
                favorite_source_id: favorite_source_id,
                favorite_type: favorite_type
            }
        }).then(count=> {
            if (count != 0) return {iscollection: true};
            else return {iscollection: false};
        });
    }
}

export default new UsersFavorite();