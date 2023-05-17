const { log } = require("debug/src/browser");

const { category } = require("../../model/connection");
const signup = require("../../helpers/user/signup");
let loginStatus,username;
exports.showSignup = (req,res)=>{
            
    res.render('user/signup',{emailStatus:true})
},



exports.postSignup=(req,res)=>{
    signup.doSignUp(req.body).then((response)=>{
        console.log(response)
        var emailStatus= response.status
        if(emailStatus){
            res.redirect('/login')
        }
        else{
            res.render('user/signup',{emailStatus})
        }

    })
}

