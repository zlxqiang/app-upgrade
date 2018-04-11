var mongoose = require('../mongoose').mongoose;
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name : { type:String },
});

var ProjectModel = mongoose.model("projectlist", ProjectSchema);

function add(name,callback) {
    ProjectModel.find({name:name},function (err,data) {
        if(err){
            return callback(err,null);
        }
        if(data.length > 0){
            return callback('项目已存在',null);
        }
        var project = new ProjectModel({ name: name});
        project.save(function (err) {
            if (err){
                return callback(err,null);
            }
            return callback(null,null);
        });
    });

}

function del(id,callback) {
    var objid = mongoose.Types.ObjectId(id);
    ProjectModel.remove({_id:objid},function(error, result) {
            if (error) {
                console.log('Error:' + error);
                callback(error,null)
            } else {
                console.log(result.result.n);
                callback(null,result)
            }
        }
    )
}

function update(id,name,callback) {
    ProjectModel.findById(id,function (err,info) {
        if(err){
            return callback(err,null);
        }
        if(!info){
            return callback('项目不存在',null);
        }

        var param = {
            name: name || info.name
        };

        ProjectModel.findByIdAndUpdate(id, param, callback);
    });

}

function query(page,size,callback) {
    ProjectModel.find().skip( (page-1)*size ).limit(size).sort({time:-1}).exec(function (err, res) {
        if (err) {
            return callback(err,null);
        }
        return callback(null,res);
    })

}

exports.add = add;
exports.del = del;
exports.update = update;
exports.query = query;

