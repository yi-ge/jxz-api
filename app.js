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
    test,
} from "./routes";

app.use('/', test);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
    var err = new Error('Not Found');
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
