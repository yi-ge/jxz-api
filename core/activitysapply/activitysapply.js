/**
 * Created by NX on 2016/8/8.
 */
import activitysapply from './activitysapply.config';
import Base from './../base';

class ActivitysApply extends Base {
    constructor() {
        super("activitys_apply", activitysapply, {
            tableName: 'activitys_apply'
        });
    }
}

export default new ActivitysApply();