/**
 * Created by NX on 2016/8/8.
 */
import usersmsg from './usersmsg.config';
import Users from './../users/users';
import Base from './../base';
const STATUS = {
    READ_YES: 1, //已读
    READ_NO: 0 // 未读
};
class UsersMsg extends Base {
    constructor() {
        super("users_msg", usersmsg, {
            tableName: 'users_msg'
        });
        this.STATUS = STATUS;
    }

    /**
     *
     * @param user_id 发私信的人
     * @param from_user_id 被私信人
     * @param content 内容
     *         status：状态1已读0未读
     *         read_date:读取时间
     * @returns {{id: number, user_id: *, from_user_id: *, content: *, created_at: Date, updated_at: Date, status: number, read_date: Date}}
     */
    createModel(user_id, from_user_id, content) {
        let model = {
            id: this.generateId(),
            user_id: user_id,
            from_user_id: from_user_id,
            content: content,
            created_at: new Date(),
            updated_at: new Date(),
            status: 0,
            read_date: new Date()
        };
        return model;
    }

    formateUserMsg(msg) {
        msg.created_at != void(0) && (msg.created_at = this.formatDate(msg.created_at, "yyyy-MM-dd hh:mm:ss"));
        msg.read_date != void(0) && (msg.read_date = this.formatDate(msg.read_date, "yyyy-MM-dd hh:mm:ss"));
        msg.updated_at != void(0) && (msg.updated_at = this.formatDate(msg.updated_at, "yyyy-MM-dd hh:mm:ss"));
        return msg;
    }

    /**
     * 获取阅读状态
     * @returns {{status: number}}
     */
    getWhereReadStatus(value) {
        let where = {};
        switch (value) {
            case STATUS.READ_NO:
                where.status = STATUS.READ_NO;
                break;
            case STATUS.READ_YES:
                where.status = STATUS.READ_YES;
                break;
            default:
                break;
        }
        return where;
    }

    /**
     * 是否有新的私信
     * @param from_user_id
     */
    isNewMsg(from_user_id){
        let where=Object.assign({from_user_id:from_user_id},this.getWhereReadStatus(STATUS.READ_NO));
        return this.count({where:where}).then(count=>{
            let status = true;
            if (count == 0) status = false;
            return {isread: status};
        });
    }
    /**
     * 查询用户私信
     * @param receive_user
     * @param type
     * @param page
     * @param pagesize
     */
    findUserMsgList(from_user_id, page, pagesize, t) {
        let where = {from_user_id: from_user_id};
        return this.count({where: where}).then(count=> {
            return this.findPage({
                where: where,
                attributes: ['content', 'read_date', 'id','created_at'],
                order:`created_at DESC`,
                include: [{
                    model: Users.sequlize,
                    as: 'sponsored_user',
                    attributes: ['user_name', 'avatar', 'id'],
                }],
            }, page, count, 2, pagesize);
        }).then(result=> {
            return this.update({
                status: STATUS.READ_YES,
                read_date: new Date()
            }, {
                where: Object.assign({
                    status: STATUS.READ_NO,
                }, where),
                transaction: t,
                lock: t.LOCK.UPDATE,
            }).then(()=> {
                return result;
            });
        }).then(msglist=> {
            msglist.list.map(msg=> {
                this.formateUserMsg(msg.dataValues);
            });
            return msglist;
        });
    }
}

export default new UsersMsg();