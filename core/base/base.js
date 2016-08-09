/**
 * Created by NX on 2016/8/8.
 */
import sequelize from './../../data/sequelize';
class Base {
    constructor(name, option, config) {
        this.sequlize = sequelize.define("user", option, Object.assign({
            freezeTableName: name,
            timestamps: false
        },config || {}));
        //this.sequlize.sync({force: true});
    }

    generateId(){
        return new Date().getTime() + parseInt(Math.random() * 10000);
    }


    /**1
     * 执行原生sql
     * @param sql
     * @param option
     * @returns {Promise}
     */
    static query(sql,option){
        return sequelize.query(sql,option);
    }

    /**
     * 插入一条数据
     * @param model
     * @returns {Promise.<Instance>}
     */
    insert(model){
        Object.assign({
            id:this.generateId()
        },model || {});
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