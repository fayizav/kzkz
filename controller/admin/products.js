const category = require('../../helpers/admin/category')
const product= require('../../helpers/admin/product')
const db = require('../../model/connection')
const multer = require('multer')


exports.addProducts=(req, res) =>{
    category.findAllcategories().then((availCategory)=>{
      res.render("admin/add-product", { layout:"adminLayout",adminStatus:true,availCategory})
    })

    
  },


  exports.postProducts=(req,res)=>{
    console.log('bodyyyyyy',req.body);
   
    let images=req.files.map(a=>a.filename);
   
    product.postAddProduct(req.body,images).then((response)=>{
     console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
      console.log(response);
      res.redirect('/admin/view-product')
  })
},


exports.viewProducts=(req,res)=>{
    product.getViewProducts().then((response)=>{
      console.log(response);
      res.render("admin/view-product",{ layout:"adminLayout",response,adminStatus:true})
    })
  },

  exports.editProduct=(req,res) =>{

    category.viewAddCategory().then((response)=>{
  
      var procategory=response
       product.editProduct(req.params.id).then((response)=>{
        editproduct=response
       
        
        console.log(editproduct);
        console.log(procategory);
      res.render('admin/edit-viewproduct',{ layout: "adminLayout" ,editproduct,procategory,adminStatus:true});
  
    })})
    
    
  
  },
    
  //posteditaddproduct
  
  
  exports.post_EditProduct=(req,res) =>{
    console.log(req.body);
    console.log(req.file);
    
    product.postEditProduct(req.params.id, req.body,req?.file?.filename).then((response)=>{
      console.log(response);
      res.redirect('/admin/view-product')
    })
  
    
  },

   //delete view product 
  
  
   exports.deleteTheProduct=(req,res) =>{
    
    product.deleteProduct(req.params.id).then((response)=>{

      res.redirect('/admin/view-product')
    })
    
  }


