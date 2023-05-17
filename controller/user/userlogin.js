const { log } = require("debug/src/browser");
const cart = require('../../helpers/user/cart')


const login = require("../../helpers/user/login");
const { category } = require("../../model/connection");

    exports.showLogin=(req,res)=>{
        if(req.session.loggedIn){
          const username = req.session.user.username
            res.render('user/userhome',{loggedInStatus:false,username})
        }
        else{
            res.render('user/login')
        }
        
    },
    exports.getHome= async(req,res)=>{
        let userId;
        let userData=req.session.user
    
        if(req.session.user){
          
           userId = req.session.user._id;
      
            const cartCount = await cart.getCartCount(userId);
            const username = req.session.user.username
            req.session.cartCount=cartCount
          
            if(cartCount){
                res.render('user/userhome',{loggedInStatus:true, cartCount,userData,username})
            } else {
                res.render('user/userhome',{loggedInStatus:true,userData,username})
            }
           
        }else{
            res.render('user/userhome',{loggedInStatus:false})
        }
    }, 

    exports.postLogin= (req, res) => {
      console.log('checkinggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
        try {
          login
            .dologin(req.body)
            .then((response) => {
                console.log(response.user,'jhsgdhshgdgh')
              let loggedInStatus = response.loggedInStatus;
              let blockedStatus = response.blockedStatus;
              let username = response.user.username;
              console.log(username);
            
    
              if (loggedInStatus == true) {
                req.session.loggedIn = true;
                req.session.user = true
                req.session.user = response.user;
                console.log(req.session);
    
                res.redirect("/");
              } else {
                res.render("user/login", { loggedInStatus, blockedStatus });
              }
            })
            .catch(() => {
              res.render("error");
            });
        } catch {
          res.render("error");
        }
      },
      exports.userlogout=(req,res)=>{
        req.session.loggedIn = false;
    req.session.user = null;
    res.redirect("/login");

    }

