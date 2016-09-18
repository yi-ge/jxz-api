/**
 * Created by NX on 2016/8/8.
 */
import sysinform from './sysinform.config';
import SysInfoTemplate from './../sysinfotemplate/sysinfotemplate';
import Users from './../users/users';
import Base from './../base';
const TYPE = {
    NOTICE: 1, //系统通知,
    NEWS: 2, //消息
    PRAISE: 3, //点赞文章
    COLLECT: 4, //收藏文章
    CONCERN: 5, //关注用户
    COMMENT: 6, //评论文章
}, READSTATUS = {
    YES: 2, //已读
    NO: 1 //未读
}, CLASSIFY = {
    ARTICLE: 1, //文章
    USER:2, //用户
},MAXMSGCONTENTLENGTH = 200;
class SysInform extends Base {
    constructor() {
        super("sys_inform", sysinform, {
            tableName: 'sys_inform'
        });
        this.TYPE = TYPE;
        this.READSTATUS = READSTATUS;
        this.CLASSIFY = CLASSIFY;
        this.MAXMSGCONTENTLENGTH = MAXMSGCONTENTLENGTH;
    }

    /**
     *
     * @param type 消息类型，1通知2消息
     * @param classify 消息分类1文章
     * @param info_level 消息级别
     * @param title 消息标题
     * @param content 消息内容
     * @param url 消息连接
     * @param send_user 发送人
     * @param receive_user 接受人
     *         send_date 发送时间
     *         read_date 阅读时间
     *         read_status 读取消息状态0未读1已读
     * @returns {{id: number, type: *, classify: *, info_level: *, title: *, content: *, url: *, send_user: *, receive_user: *, send_date: Date, read_date: Date, read_status: number, state: number}}
     */
    createModel(type, classify, info_level, title, content, url, send_user, receive_user) {
        let model = {
            id: this.generateId(),
            type: type,
            classify: classify,
            info_level: info_level,
            title: title,
            content: content != void(0) ? this.substrContent(content) : content,
            url: url,
            send_user: send_user,
            receive_user: receive_user,
            send_date: new Date(),
            read_date: new Date(),
            read_status: READSTATUS.NO,
            state: 1
        };
        this.TYPE = TYPE;
        this.READSTATUS = READSTATUS;
        this.CLASSIFY = CLASSIFY;
        return model;
    }

    /**
     * 截取存入数据库内容长度
     * @param content
     * @param reduceLen
     * @returns {*}
     */
    substrContent(content , reduceLen = 0){
        if(content.length < MAXMSGCONTENTLENGTH - reduceLen) return content;
        return content.substr(0,MAXMSGCONTENTLENGTH - reduceLen-1);
    }

    formatSysInform(inform) {
        inform.send_date != void(0) && (inform.send_date = this.formatDate(inform.send_date, "yyyy-MM-dd hh:mm:ss"));
        inform.read_date != void(0) && (inform.read_date = this.formatDate(inform.read_date, "yyyy-MM-dd hh:mm:ss"));
        return inform;
    }

    /**
     * 有新的消息
     * @param receive_user
     * @param type
     */
    isNewMsg(receive_user,type){
        let where = {
            receive_user: receive_user,
            type: type,
            read_status: READSTATUS.NO
        };
        return this.count({where: where}).then(count=> {
            let status = true;
            if (count == 0) status = false;
            return {isread: status};
        });
    }

    /**
     * 查询用户消息
     * @param receive_user
     * @param type
     * @param page
     * @param pagesize
     */
    findUserMsgList(receive_user, type , page, pagesize,t){
        let where = {
            receive_user: receive_user,
            type: type,
        };
        return this.count({where: where}).then(count=> {
            return this.findPage({
                where: where,
                include:[{
                    model:Users.sequlize,
                    attributes:['user_name','id','account_name','avatar'],
                }],
                order:`send_date DESC`
            }, page, count, 2, pagesize);
        }).then(result=> {
            return this.update({read_status: READSTATUS.YES,read_date:new Date()}, {
                where: Object.assign({
                    read_status: READSTATUS.NO,
                }, where),
                transaction: t,
                lock: t.LOCK.UPDATE,
            }).then(()=>{
                return result;
            });
        }).then(infos=> {
            infos.list.map(info=> {
                this.formatSysInform(info.dataValues);
            });
            return infos;
        });
    }


    /**
     * 系统通知
     * @param classify
     * @param info_level
     * @param title
     * @param content
     * @param url
     * @param receive_user
     * @param t
     * @returns {Promise.<Instance>}
     */
    systemNnotification(classify, info_level, title, content, url, receive_user, t) {
        return this.insert(this.createModel(TYPE.NOTICE, classify, info_level, title, content, url, null, receive_user), {
            transaction: t
        });
    }

    /**
     * 文章审核通过后通知作者
     * @param content
     * @param url
     * @param receive_user
     * @param t
     * @returns {Promise.<Instance>}
     */
    articleAuditPass(article_title, receive_user, url, t) {
        return SysInfoTemplate.getTemplate(SysInfoTemplate.TEMPLATE.ARTICLE.AUDIO).then(template=> {
            if (!template) return SysInfoTemplate.errorPromise("审核模板不存在");
            let content = template.content.replace("#体验稿标题#", `#${article_title}#`);
            return this.systemNnotification(CLASSIFY.ARTICLE, 1, "系统通知", content, url, receive_user, t);
        });
    }

    /**
     * 预约确认后发送通知
     * @param vip_id
     * @param house_name
     * @param coin
     * @param t
     * @returns {*}
     */
    userConfirmAppointment(vip_id,house_name,coin,t){
        return SysInfoTemplate.getTemplate(SysInfoTemplate.TEMPLATE.ORDER.MAKE_CONFIRMED).then(template=>{
            if (!template) return SysInfoTemplate.errorPromise("预约确认模板不存在");
            let content = template.content.replace("#酒店名称#",`#${house_name}#`);
            content.replace("#数量#",coin);
            return this.systemNnotification(CLASSIFY.USER,1,"系统通知",content,null,vip_id,t);
        });
    }

    /**
     * 预约变更后通知
     * @param vip_id
     * @param house_name
     * @param coin
     * @param t
     */
    usersChangeConfirmAppointment(vip_id,house_name,coin,t){
        let content = `精选者会员，您的酒店#${house_name}#已预订成功！`;
        if(coin > 0) content += `本次退还精选币#数量#`;
        if(coin < 0) content += `本次消费精选币#数量#`;
        return this.systemNnotification(CLASSIFY.USER,1,"系统通知",content,null,vip_id,t);
    }

    /**
     * 用户与文章相关的消息
     * @param type
     * @param send_user
     * @param receive_user
     * @param title
     * @param content
     * @param url
     * @param t
     * @returns {Promise.<Instance>}
     */
    userToArticleMsg(type, send_user, receive_user, title, content, url, t) {
        return this.insert(this.createModel(type,CLASSIFY.ARTICLE,1,title,content,url,send_user,receive_user),{
            transaction:t
        });
    }

    /**
     * 用户与用户相关消息
     * @param type
     * @param send_user
     * @param receive_user
     * @param title
     * @param content
     * @param t
     * @returns {Promise.<Instance>}
     */
    userToUserMsg(type, send_user, receive_user, title, content,url, t){
        return this.insert(this.createModel(type,CLASSIFY.USER,1,title,content,url,send_user,receive_user),{
            transaction:t
        });
    }
}
export default new SysInform();