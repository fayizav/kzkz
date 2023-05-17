


module.exports={
    userAuth:(req,res,next)=>{
        if (req.session.loggedIn)
            {next()}
        else{
            res.redirect("/login")
        }
    },

    adminAuth:(req,res,next)=>{
        if (req.session.adminIn){
            next()
        }else{
            res.redirect('/admin/login')
        }
    }

}