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
    console.log("urlpath======>",req.path);
    next();
});
app.use('/', wetchat);
app.use('/manage', manage);

app.use((data, req, res, next)=> {
    console.log({
        code: 200,
        message: "成功",
        data: data,
    });
    if (typeof data == 'object')
        res.json({
            code: 200,
            message: "成功",
            data: data,
        });
    else next();
});

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    var err = new Error('资源没找到');
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
        msg: err.message
    });
});

module.exports = app;
