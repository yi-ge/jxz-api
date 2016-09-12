import {SysCoin} from './../../../core';
class SysCoinService {
    /**
     * 添加精选币字典
     * @param level
     * @param name
     * @param rule_money
     * @param get_coin
     * @param creater
     * @returns {*}
     */
    addSysCoin(level,name,rule_money,get_coin,creater){
        return SysCoin.transaction(t=>{
            return SysCoin.insert(SysCoin.createModel(level,name,rule_money,get_coin,creater,creater),{
                transaction:t,
            });
        }).then(coin=>{
            return SysCoin.formatSysCoin(coin.dataValues);
        });
    }

    /**
     * 获取列表 （所有列表）
     * @returns {*}
     */
    findList(){
        return SysCoin.findList().then(coinlist=>{
            coinlist.list.map(coin=>{
                SysCoin.formatSysCoin(coin);
            });
            return coinlist;
        })
    }

    /**
     * 获取状态正常的列表
     */
    findNormalList(){
        return SysCoin.findNormalList().then(list=>{
            list.list.map(coin=>{
                SysCoin.formatSysCoin(coin);
            });
            return list;
        });
    }

    /**
     * 改变数据状态
     * @param id
     * @param status
     * @param modifier
     * @returns {*}
     */
    changeSysCoinStatus(id,status,modifier){
        return SysCoin.transaction(t=>{
            return SysCoin.changeStatus(id,status,modifier,t);
        }).then(()=>{
            return SysCoin.findById(id);
        }).then(coin=>{
            return SysCoin.formatSysCoin(coin);
        });
    }

    /**
     * 编辑数据
     * @param id
     * @param level
     * @param name
     * @param rule_money
     * @param get_coin
     * @param modifier
     * @returns {*}
     */
    editSysCoin(id,level,name,rule_money,get_coin,modifier){
        let updateObject = {};
        level != void(0) && (updateObject.level = level);
        name != void(0) && (updateObject.name = name);
        rule_money != void(0) && (updateObject.rule_money = rule_money);
        get_coin != void(0) && (updateObject.get_coin = get_coin);
        modifier != void(0) && (updateObject.modifier = modifier);
        if(Object.keys(updateObject).length == 0 || !id) return SysCoin.errorPromise("参数错误");
        return SysCoin.transaction(t=>{
            return SysCoin.update(updateObject,{
                where:{id:id},
                transaction:t,
                lock: t.LOCK.UPDATE,
            });
        }).then(()=>{
            return SysCoin.findById(id);
        }).then(coin=>{
            return SysCoin.formatSysCoin(coin);
        });
    }
}
export default new SysCoinService();