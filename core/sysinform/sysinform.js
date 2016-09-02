/**
 * Created by NX on 2016/8/8.
 */
import sysinform from './sysinform.config';

import SysInfoTemplate from './../sysinfotemplate/sysinfotemplate';
import Base from './../base';

const TYPE = {
    NOTICE:1,//通知
    NEWS:2//消息
},READSTATUS={
    YES:2, //已读
    NO:1 //未读
},CLASSIFY = {
    ARTICLE:1 //文章
};


class SysInform extends Base {
    constructor() {
        super("sys_inform", sysinform, {
            tableName: 'sys_inform'
        });
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
    createModel(type,classify,info_level,title,content,url,send_user,receive_user){
        let model = {
            id:this.generateId(),
            type:type,
            classify:classify,
            info_level:info_level,
            title:title,
            content:content,
            url:url,
            send_user:send_user,
            receive_user:receive_user,
            send_date:new Date(),
            read_date:new Date(),
            read_status:READSTATUS.NO,
            state:1
        };
        this.TYPE = TYPE;
        this.READSTATUS = READSTATUS;
        this.CLASSIFY = CLASSIFY;
        return model;
    }

    formatSysInform(inform){
        return inform;
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
    systemNnotification(classify,info_level,title,content,url,receive_user,t){
        return this.insert(this.createModel(TYPE.NOTICE,classify,info_level,title,content,url,null,receive_user),{
            transaction:t
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
    articleAuditPass(article_title,receive_user,url,t){
        return SysInfoTemplate.getTemplate(SysInfoTemplate.TEMPLATE.ARTICLE.AUDIO).then(template=>{
            if(!template) return SysInfoTemplate.errorPromise("审核模板不存在");
            let content = template.content.replace("#体验稿标题#",`#${article_title}#`);
            return this.systemNnotification(CLASSIFY.ARTICLE,1,null,content,url,receive_user,t);
        });
    }
}
export default new SysInform();