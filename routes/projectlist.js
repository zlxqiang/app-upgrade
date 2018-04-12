var express = require('express');
var router = express.Router();
var project_list = require('../model/projectlist');
var project_model = require('../model/project');


router.get('/querylist', function(req, res, next) {
    var page = req.query.page || 1;
    var size = req.query.size || 10;

    if(typeof page == 'string'){
        page = parseInt(page);
    }

    if(typeof size == 'string'){
        size = parseInt(size);
    }

    project_list.query(page,size,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'查询成功list',data:data});
    });

});

router.post('/add', function(req, res, next) {
    if(!req.session.user){
        return res.send({code:400,msg:'未登录'});
    }

    var name = req.body.name ;

    if(!name){
        return res.send({code:400,msg:'参数未传'});
    }

    project_list.add(name,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'添加成功',data:data});
    });
});

router.post('/delect', function(req, res, next) {
    var id = req.body.id ;
    if(!id){
        return res.send({code:400,msg:'参数未传'});
    }
    if(!req.session.user){
        return res.send({code:400,msg:'未登录'});
    }
    project_list.del(id,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'删除成功'});
    });
});

router.post('/update', function(req, res, next) {
    var id = req.body.id ;
    if(!id){
        return res.send({code:400,msg:'参数未传'});
    }
    if(!req.session.user){
        return res.send({code:400,msg:'未登录'});
    }
    var name = req.body.name ;

    project_list.update(id,name,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'更新成功',data:data});
    });
});

//工程
router.get('/detail', function(req, res, next) {
    return res.render('project',{id:req.query.id});
});

module.exports = router;
