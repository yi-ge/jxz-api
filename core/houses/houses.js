/**
 * Created by NX on 2016/8/8.
 */
import houses from './houses.config';
import Base from './../base';

class Houses extends Base {
    constructor() {
        super("houses", houses, {
            tableName: 'houses'
        });
    }
}

export default new Houses();