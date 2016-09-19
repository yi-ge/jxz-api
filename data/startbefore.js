/**
 * Created by NX on 2016/9/19.
 * 程序启动时调用
 */
import {OrdersService} from './../service/public';

class OrderTime{
    constructor(){
        this.sendCatch = [];
        this.errorCatch = [];
        this.dayTimer = null;
        this.sendTimer = null;
        this.maxSendNumber = 3;
        this.advanceTimer = 0;
    }

    orderTimer(){
        let startDate = new Date(),intervalTime , endDate = new Date();
        endDate.setDate(endDate.getDate()+1);
        endDate.setHours(0,0,0);
        intervalTime = endDate.getTime() - startDate.getTime();
        this.dayTimer && clearTimeout(this.dayTimer);
        this.dayTimer = null;
        return setTimeout(()=>{
            this.init();
        },intervalTime);
    }

    sendOrderTimer(sendCount){
        let sendOrder = this.sendCatch[0];
        if(!sendOrder) return;
        let startDate = new Date(),endDate = new Date(sendOrder.expect_checkin_time),
            intervalTime = endDate.getTime() - startDate.getTime() - this.advanceTimer;
        sendCount = sendCount || 0;
        if(intervalTime <= 0){
            this.sendTimer && clearTimeout(this.sendTimer);
            this.sendTimer = null;
            return OrdersService.finishOrder(sendOrder.id).then(result=>{
                this.sendCatch.shift();
                return this.sendOrderTimer();
            }).catch(e=>{
                if(sendCount >= this.maxSendNumber){
                    console.log(`订单:${sendOrder.id}入住时间到后，发送短信失败`);
                    this.errorCatch.push(this.sendCatch.shift());
                    this.sendOrderTimer();
                }else this.sendOrderTimer(++sendCount);
            });
        }else {
            this.sendTimer = setTimeout(()=>{
                this.sendOrderTimer();
            },intervalTime);
        }
    }
    init(){
        this.dayTimer = this.orderTimer();
        return this.findCatch().then(()=>{
            if(this.sendCatch.length > 0) return this.sendOrderTimer();
        });
    }
    /**
     * 将当天没有完成的订单放入缓存并排序
     */
    findCatch(){
        return OrdersService.findNowDateNotFinish().then(result=>{
            result.list.map(order=>{
                this.sendCatch.push(order.dataValues);
            });

            this.sendCatch.sort((order,preOrder)=>{
                return new Date(order.expect_checkin_time) >= new Date(preOrder.expect_checkin_time);
            });
            return result;
        });
    }
}

const orderTimer = (()=>{
    let orderTimeT = new OrderTime();
    return orderTimeT.init.bind(orderTimeT);
})();

export {
    orderTimer
}

