
const { log } = require("debug/src/browser");

const { category } = require("../../model/connection");
const address = require('../../helpers/user/adddress')

let loginStatus,username;
exports.userprofile=(req,res)=>{
    res.render('user/userprofile')
},

exports.userprofileaddress=(req,res)=>{
    const userId = req.session.user._id;

    address.getAddresses(userId).then((addresses) => {
    res.render('user/userprofileaddress',{addresses,username})

})
},

exports.postaddress=(req, res) => {
    console.log(req.body,'zzzzzzzzzzzzzzzzzzzzzzzzz');
    const userId = req.session.user._id;
    console.log(req.session.user._id,'my faullllllllllllllllllllllt');
    

    const add=req.body
    const newAddress = {
    user: userId,
    address: {
    name: req.body.name,
     contactNumber: req.body.contactNumber,
    firstLine: req.body.firstLine,
    secondLine: req.body.secondLine,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode
    }
    };
    address.address(userId,add).then((response) => {
    console.log(newAddress,'pigggggggggggg');
    res.redirect("/userprofileaddress");
    });
},
exports.editAddress=(req,res)=>{
    let user
    if(req.session.user){
      user=req.session.user._id
    }
    address.editUserAddress(req.params.id).then((response)=>{
      resolve(resolve)
      res.render("user/userprofileaddress",{response})
    })
  },
  exports.getEditAddress=(req, res) => {
    console.log("lllllllllllllllllllllllll");
    let user = req.session.user._id;

   address.editUserAddress(req.params.id).then((address) => {
      res.render("user/edit-address", { loginheader: true, address });
    });
  },
  exports.postEditaddress=(req, res) => {
    console.log("inside postEdIT");
    let user = req.session.user._id;

    address.postEdituseraddr(req.params.id, req.body, user).then(() => {
      res.redirect("/profile");
    });
  },
  exports.deleteAddress=(req, res) => {
    console.log("inside delete cart");
    let addressId = req.params.id;
    address.deleteUseraddress(addressId).then((response) => {
      res.redirect("/profile");
    });
  }
 


