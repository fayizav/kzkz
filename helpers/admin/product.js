const { log } = require('debug/src/node')
const db = require('../../model/connection')

exports.editProduct=(productId)=>{
    return new Promise(async(resolve,reject)=>{
        await db.products.findOne({_id:productId}).exec().then((response)=>{
            resolve(response)
        })
    })
},
exports.postEditProduct=(productId,editedData,filename)=>{
    return new Promise(async(resolve,reject)=>{
        await db.products.updateOne({_id:productId},{$set:{
        Productname:editedData.name,
        ProductDescription:editedData.description,
        Quantity:editedData.quantity,
        Price:editedData.price,
        category:editedData.category,
        Image:filename
       }}) .then((response)=>{
        console.log(response);

        resolve(response)
       }) 
    })
},
exports.deleteProduct=(productId)=>{
    return new Promise (async(resolve,reject)=>{
        await db.products.deleteOne({_id:productId}).then((response)=>{
            resolve (response)
        })
    })
},

exports.postAddProduct=(userData,filename)=>{
        
    return new Promise((resolve,reject)=>{
        uploadedImage= new db.products({
            Productname:userData.name,
            ProductDescription:userData.description,
            Quantity:userData.quantity,
            Image:filename,
            category:userData.category,
            Price:userData.Price
        })
        uploadedImage.save().then((data)=>{
            console.log(data,'monkey');
            resolve(data)
       
        })
    })
},

exports.getViewProducts=()=>{
    return new Promise(async(resolve,reject)=>{
        await db.products.find().exec().then((response)=>{
            resolve(response)
        })

    })
}


