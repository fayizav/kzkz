const { log } = require("debug/src/browser");
const otp= require('../../helpers/user/otp')

const { category } = require("../../model/connection");
let loginStatus,username;
exports.showotp=(req,res)=>{
    res.render('user/otplogin')
},
exports.postotp=(req,res)=>{
    otp.otpverification(req.body).then((response)=>{
        if(response.blocked){
        loginStatus=false
        res.redirect('/otplogin')
        }
        else{
        req.session.userIn=true
        loginStatus=true
        res.redirect('/')
        }
    })

    }