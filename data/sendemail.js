import NodeMailer from 'nodemailer';
import  SysParameterService from './../service/public/sysparameterservice';
const PARAM = {
    EMAIL:'email',
    PASSWORD:'email_pwd'
};

class NodeMailerConfig{
    constructor(){}

    resizeInit(){
        let sys_email,sys_email_password,host;
        return SysParameterService.findKey(PARAM.EMAIL).then(email=>{
            sys_email = email.param_value;
            return SysParameterService.findKey(PARAM.PASSWORD);
        }).then(password=>{
            sys_email_password = password.param_value;
            host = sys_email.replace(/^[a-zA-Z1-9]+\@{1}/ig,"smtp.");
            console.log(sys_email);
            console.log(sys_email_password);
            console.log(host);
            return {
                email:sys_email,
                password:sys_email_password,
                host:host,
                port:465,
                transport:NodeMailer.createTransport({
                    host:host,
                    port:465,
                    auth:{
                        user:sys_email,
                        pass:sys_email_password,//"lswuaddrlhrxbjaa" //tipilbmymrwlbjbh
                    }
                })
            };
        });
    }

    /**
     * @param tomail 接收地址
     * @param subject 邮件头
     * @param text 类容
     */
    getMailOptions(formemail,tomail,subject,text){
        return {
            from: formemail,
            to: tomail,
            subject: subject,
            text: text
        };
    }

    /**
     * 发送邮件
     * @param tomail
     * @param subject
     * @param text
     * @returns {Promise}
     */
    sendMail(tomail,subject,text){
        return this.resizeInit().then(({email,transport})=>{
            return new Promise((resolve,reject)=>{
                transport.sendMail(this.getMailOptions(email,tomail,subject,text),(error,info)=>{
                    if(error) reject(error);
                    resolve(info);
                })
            });
        });
    }
}

export default new NodeMailerConfig();