/**
 * Created by NX on 2016/8/8.
 */
import sequelize from './../../data/sequelize';
class Base {
    constructor(name, option, config) {
        this.sequlize = sequelize.define(name, option, Object.assign({
            freezeTableName: name,
            timestamps: false
        }, config || {}));
        //this.sequlize.sync({force: true});
    }

    formatDate(date, fmt) {
        if(!(date instanceof Date)) date = new Date(date);
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    generateId() {
        return new Date().getTime() + parseInt(Math.random() * 10000);
    }

    /**1
     * 执行原生sql
     * @param sql
     * @param option
     * @returns {Promise}
     */
    static query(sql, option) {
        return sequelize.query(sql, option);
    }

    /**
     * 插入一条数据
     * @param model
     * @returns {Promise.<Instance>}
     */
    insert(model) {
        model = Object.assign({id: this.generateId()}, model || {});
        return this.sequlize.create(model);
    }

    /**
     * 查询第一个
     * @param option
     * @returns {*}
     */
    findOne(option) {
        return this.sequlize.findOne(option);
    }
}
export default Base;