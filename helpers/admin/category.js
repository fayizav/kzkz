const { log } = require('debug/src/node')
const db = require('../../model/connection')

exports.findAllcategories=()=>{
    return new Promise (async(resolve,reject)=>{
        await db.category.find().exec().then((response)=>{
            resolve(response)
        })

    })
},
exports.addCategory=(data) => {
    return new Promise(async (resolve, reject) => {
      const existingCat = await db.category.findOne({ CategoryName: { $regex: new RegExp(`^${data.category}$`, 'i') } });
      if (existingCat==null) {
        const catData = new db.category({ CategoryName: data.category });
      await catData.save();
      resolve(catData);
      }
    })
      },
    
      

  
      exports.viewAddCategory= ()=>{
    return new Promise(async(resolve,reject)=>{
        await db.category.find().exec().then((response)=>{
            resolve(response)
        })
    }) 
},

exports.delCategory=(delete_id)=>
{
    console.log(delete_id);
    return new Promise(async(resolve, reject) => {
      await db.category.deleteOne({_id:delete_id}).then((response)=>
      {          
        resolve(response)
      })
        
    })
},


exports.findOneCategory=(categoryId)=>{
    return new Promise(async(resolve,reject)=>{
        await db.category.findOne({_id:categoryId}).then((response)=>{
            console.log(response,'aaduuuuuuuuuuuuuuuu');
        resolve(response)
        })
    })
},

exports.editPostCategory=(categoryId, data) => {
    return db.category.findOne({ CategoryName: data.categoryname, _id: { $ne: categoryId } })
      .then((catExists) => {
        if (catExists) {
          throw new Error('Category with same name already exists');
        } else {
          return db.category.updateOne({ _id: categoryId }, { $set: { CategoryName: data.categoryname } });
        }
      });
  }
  
