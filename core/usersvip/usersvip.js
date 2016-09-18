/**
 * Created by NX on 2016/8/8.
 */
import usersvip from './usersvip.config';
import Base from './../base';

const BINDING = 1; //绑定
const NOTBINDING = 0; //为绑定
const RECHARGE = 1; //充值
const NORECHARGE = 0; // 未充值
class UsersVip extends Base {
    constructor() {
        super("users_vip", usersvip, {
            tableName: 'users_vip'
        });

        this.BINDING = BINDING;
        this.NOTBINDING = NOTBINDING;
        this.RECHARGE = RECHARGE;
        this.NORECHARGE = NORECHARGE;
    }

    getSexValue(str) {
        let value = 2;
        switch (str) {
            case "男" :
                value = 0;
                break;
            case "女" :
                value = 1;
                break;
        }
        return value;
    }

    getStrSex(num) {
        let value = "保密";
        switch (num) {
            case 0 :
                value = "男";
                break;
            case 1 :
                value = "女";
                break;
        }
        return value;
    }

    /**
     *
     * @param account_name 账号
     * @param user_name
     * @param email
     * @param sex
     * @param password
     * @param user_status 会员状态0未充值1已充值
     * @param is_cover 是否绑定精选者0不是1是
     * @returns {{id: number, account_name: *, user_name: *, email: *, sex: *, passwd: (*|string), created_at: Date, updated_at: Date, last_login_date: Date, user_status: number, is_cover: number}}
     */
    createModel(account_name, user_name, email, sex, password = '666666', user_status = NORECHARGE, is_cover = NOTBINDING) {
        let model = {
            id: this.generateId(),
            account_name: account_name,
            user_name: user_name,
            email: email,
            sex: typeof sex == "number" ? sex : this.getSexValue(sex),
            passwd: this.encrypMD5(password),
            created_at: new Date(),
            updated_at: new Date(),
            last_login_date: new Date(),
            user_status: user_status,
            is_cover: 0,
            coin:0
        };
        return model;
    }

    formatUserVip(vip) {
        if (!vip) return vip;
        vip.last_login_date && (vip.last_login_date = this.formatDate(vip.last_login_date, "yyyy-MM-dd hh:mm:ss"));
        vip.created_at && (vip.created_at = this.formatDate(vip.created_at, "yyyy-MM-dd hh:mm:ss"));
        vip.updated_at && (vip.updated_at = this.formatDate(vip.updated_at, "yyyy-MM-dd hh:mm:ss"));
        delete vip.passwd;
        return vip;
    }

    /**
     * 查询用户是否存在
     * @param account_name
     */
    findAccountName(account_name, option) {
        return this.findOnlyOne(Object.assign({where: {account_name: account_name}}, option));
    }

    /**
     * 改变会员绑定精选者状态
     * @param account_name
     * @param bindstatus
     * @param t
     * @returns {*}
     */
    updateBindStatus(account_name,bindstatus,t){
        return this.update({
            is_cover:bindstatus,
        },{
            where:{account_name:account_name},
            transaction:t,
            lock: t.LOCK.UPDATE
        })
    }

    /**
     * 会员充值
     * @param id
     * @param coin_money
     * @param t
     * @returns {*}
     */
    rechargeCoin(id,coin_money,t){
        let returnVip;
        return this.findById(id).then(vip=>{
            if(!vip) return this.errorPromise("会员不存在");
            returnVip = vip;
            return vip.coin;
        }).then(coin=>{
            coin = coin + coin_money;
            return this.update({
                coin:coin
            },{
                where:{id:id},
                transaction:t,
                lock: t.LOCK.UPDATE,
            });
        });
    }

    /**
     * 会员消费精选币
     * @param id
     * @param coin_money
     * @param t
     * @returns {*}
     */
    consumeCoin(id,coin_money,t){
        let returnVip;
        return this.findById(id).then(vip=>{
            if(!vip) return this.errorPromise("会员不存在");
            returnVip = vip;
            return vip.coin;
        }).then(coin=>{
            coin = coin - coin_money;
            return this.update({
                coin:coin
            },{
                where:{id:id},
                transaction:t,
                lock: t.LOCK.UPDATE,
            });
        });
    }

}

export default new UsersVip();