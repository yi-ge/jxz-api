/**
 * Created by NX on 2016/8/8.
 */
import housescomment from './housescomment.config';
import Base from './../base';

class HousesComment extends Base {
    constructor() {
        super("houses_comment", housescomment, {
            tableName: 'houses_comment'
        });
    }
}

export default new HousesComment();