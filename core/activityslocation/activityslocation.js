/**
 * Created by NX on 2016/8/8.
 */
import activityslocation from './activityslocation.config';
import Base from './../base';

class ActivitysLocation extends Base {
    constructor() {
        super("activitys_location", activityslocation, {
            tableName: 'activityslocation'
        });
    }
}

export default new ActivitysLocation();