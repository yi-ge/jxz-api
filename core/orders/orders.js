/**
 * Created by NX on 2016/8/8.
 */
import orders from './orders.config';
import Base from './../base';

class Orders extends Base {
    constructor() {
        super("orders", orders, {
            tableName: 'orders'
        });
    }
}

export default new Orders();