/**
 * Created by NX on 2016/8/8.
 */
import userspaytype from './userspaytype.config';
import Base from './../base';
const STATUS = {
    DELETE:0, // 正常
    NORMAL:1  // 删除
},TYPE={
    WECHAT:1,
    ALIPAY:2,
    BACKCARD:3
};
class UsersPayType extends Base {
    constructor() {
        super("users_pay_type", userspaytype, {
            tableName: 'users_pay_type'
        });
        this.STATUS = STATUS;
        this.TYPE = TYPE;
    }

    createModel(user_id,type,name,pay_no,pay_name_id,creater,modifier,status){
        let model = {
            id:this.generateId(),
            user_id:user_id,
            type:type,
            name:name,
            pay_no:pay_no,
            pay_name_id:pay_name_id,
            creater:creater,
            modifier:modifier,
            status:status || STATUS.NORMAL,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    /**
     * 微信支付
     * @param user_id
     * @returns {*}
     */
    weChatCreatModel(user_id){
        return this.createModel(user_id,TYPE.WECHAT,"微信",null,null,user_id,user_id,STATUS.NORMAL);
    }
}
export default new UsersPayType();