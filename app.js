import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 路由
 */
import {
    wetchat,
    manage,
} from "./routes";

app.use((req, res, next)=> {
    console.log("urlpath======>", req.path);
    console.log("param========>",req.body);
    next();
});
//路由
app.use('/', wetchat);
app.use('/manage', manage);

//返回数据处理中间件
app.use((obj, req, res, next)=> {
    obj.$promise.then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == "string" ? e : obj.msg});
    });
});

//数据返回接口
app.use((data, req, res, next)=> {
    console.log(data);
    if (typeof data == 'object' || typeof data == 'number')
        res.json({
            code: 200,
            message: "成功",
            data: data,
        });
    else next();
    console.log('=========end=========')
});

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    var err = new Error('资源没有找到');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next)=> {
        res.status(err.status || 500);
        res.json({
            code: err.status || 500,
            msg: err.message
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.json({
        code: err.status || 500,
        msg: "服务器内部错误"|| err.message
    });
});

module.exports = app;
