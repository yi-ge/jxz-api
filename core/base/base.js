/**
 * Created by NX on 2016/8/8.
 */
import sequelize from './../../data/sequelize';
class base {
    constructor(name, option, config) {
        this.sequlize = sequelize.define("user", option, Object.assign({
            freezeTableName: name,
            timestamps: false
        },config || {}));
    }

    findOne(option) {
        return this.sequlize.findOne(option);
    }

    findById(id) {
        return this.sequlize.findById(id);
    }

    insert(base){
        console.log("=============");
        console.log(base);
        console.log("=============");
        return this.sequlize.create(base);
    }
}
export default base;