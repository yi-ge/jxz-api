/**
 * Created by NX on 2016/8/8.
 */
import activitys from './activitys.config';
import Base from './../base';

class Activitys extends Base {
    constructor() {
        super("activitys", activitys, {
            tableName: 'activitys'
        });
    }
}

export default new Activitys();