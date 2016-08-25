/**
 * Created by NX on 2016/8/8.
 */
import usersfavorite from './usersfavorite.config';
import Base from './../base';

class UsersFavorite extends Base {
    constructor() {
        super("users_favorite", usersfavorite, {
            tableName: 'users_favorite'
        });
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

    formatUsersFavorite(favorite){
        favorite.created_at!= void(0) && (favorite.created_at = this.formatDate(favorite.created_at, "yyyy-MM-dd hh:mm:ss"));
        favorite.updated_at!= void(0) && (favorite.updated_at = this.formatDate(favorite.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return favorite;
    }
}

export default new UsersFavorite();