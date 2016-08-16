import CryptoJS from 'crypto-js';
import sequelize from './../../data/sequelize';
class Base {
    constructor(name, option, config) {
        this.sequlize = sequelize.define(name, option, Object.assign({
            freezeTableName: name,
            timestamps: false
        }, config || {}));
    }

    /**
     * md5加密
     * @param str
     * @returns {*|string}
     */
    encrypMD5(str) {
        return CryptoJS.SHA1(str).toString();
    }

    /**
     * 返回错误的promise
     * @param errormsg
     * @returns {Promise}
     */
    errorPromise(errormsg) {
        return new Promise((resolve, reject)=> {
            reject(errormsg);
        });
    }

    /**
     * IP转换为INTEGER
     * @param ip
     * @returns {number}
     */
    ipToInt(ip) {
        let REG = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        let result = REG.exec(ip);
        if (!result) return 0;
        return (parseInt(result[1]) << 24
            | parseInt(result[2]) << 16
            | parseInt(result[3]) << 8
            | parseInt(result[4])) >>> 0;
    }

    /**
     * INTEGER转换为IP
     * @param INT
     * @returns {string}
     */
    intToIp(INT) {
        if (INT < 0 || INT > 0xFFFFFFFF) {
            throw ("The number is not normal!");
        }
        return (INT >>> 24) + "." + (INT >> 16 & 0xFF) + "." + (INT >> 8 & 0xFF) + "." + (INT & 0xFF);
    }

    /**
     * 格式化时间
     * @param date
     * @param fmt
     * @returns {*}
     */
    formatDate(date, fmt) {
        !(date instanceof Date) && (date = new Date(date));
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

    /**
     * 生成Id
     * @returns {number}
     */
    generateId() {
        return new Date().getTime() + parseInt(Math.random() * 10000);
    }

    /**
     * 生成添加时的模型
     * @returns {{}}
     */
    createModel() {
        return {id: this.generateId()};
    }

    /**
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
    insert(model, option) {
        return this.sequlize.create(model, option).catch(e=> {
            throw e;
        });
    }

    /**
     * 批量添加
     * @param insertList
     * @param option
     * @returns {Promise.<Array.<Instance>>}
     */
    bulkCreate(insertList, option) {
        return this.sequlize.bulkCreate(insertList, option).catch(e=> {
            throw e;
        });
    }


    /**
     * 查询所有
     * @param option 查询条件
     * @returns {*}
     */
    findList(option) {
        return this.sequlize.findAll(option).then(result=> {
            return {list: result};
        }).catch(e=> {
            throw e;
        });
    }

    /**
     * 根据条件查询一条数据
     * @param option
     * @returns {*|Promise.<T>}
     */
    findOnlyOne(option){
        return this.sequlize.findAll(option).then(result=>{
           return result[0];
        });
    }

    /**
     * 统计条数
     * @param option
     * @returns {*}
     */
    count(option) {
        return this.sequlize.count(option).catch(e=> {
            throw e;
        });
    }

    /**
     * 分页查询
     * @param option
     * @param page
     * @param count
     * @param sortType
     * @param pagesize
     * @returns {*|Promise.<T>}
     */
    findPage(option, page, count, sortType = 1, pagesize = 20) {
        pagesize = pagesize;
        page = page || 1;
        let pageSum = count % pagesize == 0 ? count / pagesize : parseInt(count / pagesize) + 1,
            data = {
                totalPage: pageSum,
                totalRecords: count,
                previousPage: page - 1 > 0 ? page - 1 : 1,
                pageSize: pagesize,
                hasPrevious: page > 1,
                hasNext: pageSum > page,
                sortType: sortType
            };
        return this.sequlize.findAll(Object.assign({
            limit: pagesize,
            offset: pagesize * (page - 1),
            order: `id ${sortType == 1 ? `ASC` : `DESC`}`
        }, option)).then(result=> {
            return Object.assign(data, {list: result});
        }).catch(e=> {
            throw e;
        });
    }

    /**
     * 通过id查询
     * @param id
     * @param options
     * @returns {*}
     */
    findById(id, options) {
        return this.sequlize.findById(id, options).catch(e=> {
            throw e;
        });
    }

    /**
     *
     * @param data 修改的字段
     * @param options 条件
     */
    update(data, options) {
        return this.sequlize.update(data, options).catch(e=> {
            throw e;
        });
    }

    destroy(option) {
        return this.sequlize.destroy(option).catch(e=> {
            throw e;
        });
    }

    /**
     * 事务管理
     * @param fn
     * @returns {*}
     */
    transaction(fn) {
        return sequelize.transaction(fn);
    }
}
export default Base;