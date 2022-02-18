const Code = require('../models/code');
module.exports.home = (req, res ) => {
    let newCode = new Code() ;
    newCode.save(function(err, data){
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            res.redirect('/code/screen/'+data._id);
        }
    });
    // res.render('coding-screen');
}
module.exports.code = (req, res) => {
    if(req.params.id){
        Code.findOne({ _id: req.params.id}, function(err, data){
            if(err){
                console.log(err);
                res.redirect('back');
            }
            if( data){
                res.render('coding-screen', {
                    sourceCode: data.sourceCode,
                    roomId : data.id
                });
            }
            else{
                console.log('Could not find this session');
            }
        })
    }
}