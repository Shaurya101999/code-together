const User = require('../models/user')

module.exports.home = (req, res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/user');
    }
    return res.render('home');
}
// module.exports.signUp = (req, res) => {
//     if(req.isAuthenticated()){
//         return res.redirect('/user');
//     }
//     return res.render('sign_up');
// }
// module.exports.signIn = (req, res) => {
//     if(req.isAuthenticated()){
//         return res.redirect('/user');
//     }
//     return res.render('sign_in');
// }
// module.exports.createUser = (req, res) => {
//     console.log(req.body);
//     if(req.body.password != req.body.confirm_password){
//         console.log('Password and confirm password are not equal');
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(!user){
//             User.create(req.body, function(err, user){
//                 if(err){
//                     console.log(`Error in creating user ${err}`);
//                     return res.redirect('back');
//                 }
//                 return res.redirect('/sign-in');
//             });
//         }else{
//             console.log('User already exists');
//             return res.redirect('back');
//         }
//     })   
// }
// module.exports.createSession = (req, res) => {
//     return res.redirect('/user/');
// }