var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UsersSchema = new Schema({
    username: {type: String},
    password: {type: String},
    time: {type: Date, default: Date.now}
});
var UsersModel = mongoose.model("users", UsersSchema);

const DB_URL = 'mongodb://127.0.0.1:27017/app_upgrade';

mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function (error, db) {
    console.log('Mongoose connection open to ' + DB_URL);
    UsersModel.find({}, function (error, cursor) {
        if (error || cursor.length <= 0) {
            var md5 = crypto.createHash('md5');
            var password = md5.update('123456').digest('hex');
            var data = {"username": "admin", "password": password, "time": new Date()};
            var project = new UsersModel(data);
            project.save(function (err) {
                if(err)
                {
                    console.log('Error:'+ err);
                }else{
                    if(err.result)
                    console.log(err.result.n);
                }
                db.close();
                return "";
            });
        }
    });
});


/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

exports.mongoose = mongoose;
exports.usersModel = UsersModel;
