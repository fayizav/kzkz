const userslist = require('../../helpers/admin/userslist')
const db = require('../../model/connection')
const multer = require('multer')


exports.blockTheUser=(req,res)=>{
    userslist.blockUser(req.params.id).then((response)=>{
      res.redirect('/admin/view-users')
    })
  },

  exports.unblockTheUser=(req,res)=>{
   userslist.UnblockUser(req.params.id).then((response)=>{
      res.redirect('/admin/view-users')
    })
  }