var mongoose = require("mongoose");
const db =mongoose .connect("mongodb://0.0.0.0:27017/kurthis", {
        useNewUrlParser: true,
        useUnifiedTopology: true })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


 const addressSchema=new mongoose.Schema({

  user: {type: String},
  address:[{
    name:{type:String},
    contactNumber:{type:Number},
    firstLine: {type: String},
    secondLine:{type:String},
    city:{type:String},
    state:{type:String},
    pincode:{type:Number}
  }]
})

  

  
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  products: {type:Array},
    
  
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: Object,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'placed', 'shipped', 'delivered', 'cancelled','returned'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  uniqueId:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Order', orderSchema);




 const userschema= new mongoose.Schema({

  user:{
    type:String,
    
  },
    username:{
        type:String,
        required: true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    access:{
        type:Boolean,default:false

    },
    CreatedAt:{
        type:Date,
        default:Date.now,
    }, 
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    blocked:{
      type:Boolean,default:false
  },
  address:[addressSchema]
 })


 const productSchema=new mongoose.Schema({
    Productname:{
      type:String
    },
    ProductDescription:{
      type:String
    },
    Quantity:{
      type:Number
    },
    Image:{
      type:Array,
     
    },
    Price:{
    type:Number
    },
    category:{
      type:String
    },
   
  
    })
   
  


 const categorySchema= new mongoose.Schema({
    CategoryName:{
        type:String
    }
 })
 const cartSchema=new mongoose.Schema({
  userid:mongoose.SchemaTypes.ObjectId,
  products:[]

 })
 const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const couponSchema=new mongoose.Schema({
  code:String,
  discount:Number,
  limit:Number,
  min:Number,
  expire:Date
})








 module.exports={
    user : mongoose.model('user',userschema),
    category : mongoose.model('category',categorySchema),
    products : mongoose.model('products',productSchema),
    cart: mongoose.model('usercarts', cartSchema),
    address:mongoose.model('address',addressSchema),
    order:mongoose.model('Order',orderSchema),
    wallet: mongoose.model("wallet", walletSchema),
    coupon:mongoose.model("coupon",couponSchema)
    // address:mongoose.model('')

 }
 