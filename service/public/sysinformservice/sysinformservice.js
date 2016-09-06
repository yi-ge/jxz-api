import {SysInform} from './../../../core';
class SysInformService {
    /**
     * 是否有没有读取的系统通知
     * @param user_id
     * @returns {*}
     */
    isNewNotice(user_id) {
        return SysInform.isNewMsg(user_id, SysInform.TYPE.NOTICE);
    }

    /**
     * 查询用户系统通知
     * @param user_id
     */
    findUsersSysNotice(user_id, page, pagesize) {
        return SysInform.transaction(t=> {
            return SysInform.findUserMsgList(user_id,SysInform.TYPE.NOTICE, page, pagesize,t);
        });
    }

    /**
     * 有新的动态
     * @param user_id
     */
    isNewDynamic(user_id) {
        return SysInform.isNewMsg(user_id, {
            $in: [SysInform.TYPE.PRAISE, SysInform.TYPE.COLLECT, SysInform.TYPE.CONCERN],
        });
    }

    /**
     * 查询动态
     * @param user_id
     * @param page
     * @param pagesize
     */
    findUserDynamic(user_id, page, pagesize) {
        return SysInform.transaction(t=> {
            return SysInform.findUserMsgList(user_id,{
                $in: [SysInform.TYPE.PRAISE, SysInform.TYPE.COLLECT, SysInform.TYPE.CONCERN],
            }, page, pagesize,t);
        });
    }

    /**
     * 有新的文章评论
     * @param user_id
     */
    isNewComment(user_id) {
        return SysInform.isNewMsg(user_id, SysInform.TYPE.COMMENT);
    }

    /**
     * 查询评论
     * @param user_id
     * @param page
     * @param pagesize
     */
    findUseComment(user_id, page, pagesize) {
        return SysInform.transaction(t=> {
            return SysInform.findUserMsgList(user_id,SysInform.TYPE.COMMENT, page, pagesize,t);
        });
    }
}
export default new SysInformService();