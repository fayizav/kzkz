const db = require('../../model/connection')
const multer = require('multer')
const category = require('../../helpers/admin/category')



exports.getCategory=(req,res)=>{
    category.viewAddCategory().then((response)=>{
      let viewCategory = response
      res.render('admin/add-category',{layout:"adminLayout",viewCategory,err:'false',adminStatus:true})
    })
    .catch((err)=>{
      console.log(err,'inside controller');
      res.render('admin/add-category',{layout:"adminLayout",err:'true',adminStatus:true, checkcat: checkcat })
      
    })
  },


  exports.postCategory=(req,res)=>{
   category.addCategory(req.body).then((response)=>{
       res.redirect('/admin/add-category')
    })

  },


  exports.deleteCategory=(req,res)=>{
   category.delCategory(req.params.id).then((response)=>{
      res.redirect('/admin/add-category')
    })
  },


  exports.editTheCategory= (req, res) => {
    category.findOneCategory(req.params.id).then((response) => {
      let editCat = response
    
      res.render("admin/edit-category", { layout: "adminLayout", editCat, adminStatus:true})
    })
  },
  
  exports.posttheCategory=(req, res) => {
    category.editPostCategory(req.params.id, req.body)
      .then((response) => {
        res.redirect('/admin/add-category');
      })
      .catch((err) => {
        res.redirect('/admin/add-category?error=' + encodeURIComponent(err.message));
      });
  }

