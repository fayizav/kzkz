
const listUsers=require('../../helpers/admin/userslist')
const db = require('../../model/connection')
const multer = require('multer')



const adminCredential={
  name:'fayiza',
  email:'admin@gmail.com',
  password:'admin123'
 }
 let adminStatus




exports.showDashboard=(req,res)=>{
    let check= req.session.admin
    if(adminStatus){
        res.render('admin/admin-dash',{layout:"adminLayout",check,adminStatus})
    }else{
        res.redirect('/admin/login')
    }
},

exports.getAdminLogin=(req, res)=> {
    if(req.session.adminloggedIn){
      res.render("admin/admin-dash",{layout:"adminLayout",adminStatus})
    }
    else{
      res.render("admin/login", { layout: "adminLayout", adminStatus});

    }
  },

exports.postAdminLogin=(req,res)=>{
    if(req.body.email==adminCredential.email && req.body.password==adminCredential.password){
        req.session.admin=adminCredential
       req.session.adminIn=true
       
       adminStatus=req.session.adminIn
       
      res.redirect('/admin')
    }
    
      else{
        adminloginErr=true
      
      res.redirect('/admin/login')
      }
      
     },


     exports.adminLogout=(req,res)=>{
        req.session.admin=null
       adminStatus=false
       req.session.adminIn=false
       
       res.render('admin/login',{ layout: "adminLayout", adminStatus})
     },

     

     exports.getUserlist=(req,res)=>{
      
       listUsers.listUsers().then((user)=>{
           res.render('admin/view-users',{layout:"adminLayout",user,adminStatus})
        })
     }