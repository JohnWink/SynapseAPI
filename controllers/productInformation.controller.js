const db = require ("../models");
const ProductInformation = db.productInformations;
const Category = db.categories
const SubCategory = db.subCategories
const Product = db.products
const Language = db.languages
const ProductCategory = db.products_categories
const ProductSubCategory = db.products_subCategories

exports.create = (req,res) =>{
    const idLanguage = req.body.idLanguage
    const name = req.body.name
    const description = req.body.description
    const summary = req.body.summary
    const idProduct = req.params.idProduct

    const idCategory = req.body.idCategory
    const idSubCategory = req.body.idSubCategory

    ProductInformation.findOne({where:{idProduct:idProduct,idLanguage:idLanguage}}).then(data=>{
        if(data){
            return res.status(403).send("Language already exists")
        }
    })
    const productInformation = {
        idProduct: idProduct,
        idLanguage: idLanguage,
        name : name,
        description: description,
        summary : summary
    }

    console.log("idCategory: ", idCategory)
    console.log("idSubCategory: ", idSubCategory)

   

    

    ProductInformation.create(productInformation).then(()=>{
        const productCategory = {
            idProduct:idProduct,
            idCategory: idCategory
        }
    
        ProductCategory.create(productCategory).then(()=>{
            if( idSubCategory != 'null'){
                const productSubCategory = {
                    idProduct: idProduct,
                    idSubCategory: idSubCategory
                }
                ProductSubCategory.create(productSubCategory).then(()=>{
                    return res.send({
                        message:"success"
                    })
                }).catch(err =>{
                    return  res.status(500).send({message:err.message||"Error while creating ProductSubCategory"})
                })

            }else{
                return res.send({
                    message:"success"
                })
            }

            
        }).catch(err =>{
            return  res.status(500).send({message:err.message||"Error while creating ProductCategory"})
        })
    }).catch(err =>{
        return  res.status(500).send({message:err.message||"Error while creating ProductInformation"})
    })

  


  



    
    

   
}

exports.findByLanguage = (req,res) =>{
    const idLanguage = req.params.idLanguage

    ProductInformation.findAll({
        where:{
            idLanguage:idLanguage, 
            active:true,
            //attributes:["id","name","summary", "description", "idLanguage"],
        },
        include:[
            {
                model:Product, 
                where:{active:true},
                //attributes:["id","minimumStock"],
                include:[
                    {
                        model:Category,
                        where:{active:true},
                        //attributes:["id","category"],
                    },
                    {
                        model:SubCategory,
                        //attributes:["id","subCategory"],
                    }
                ]
            },
        ]
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all Products by language"})
    })
}


exports.findByProduct = (req,res) =>{
    const idProduct = req.params.idProduct

    ProductInformation.findAll({
        where:{
            idProduct:idProduct, 
            active:true,
            //attributes:["id","name","summary", "description", "idLanguage"],
        },
        include:[
            {
                model:Product, 
                where:{active:true},
                //attributes:["id","minimumStock"],
                include:[
                    {
                        model:Category,
                        where:{active:true},
                        //attributes:["id","category"],
                    },
                    {
                        model:SubCategory,
                        //attributes:["id","subCategory"],
                    }
                ]
            },
            {
                model:Language,
                where:{active:true}
            }
        ]
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all Products by product"})
    })
}

exports.update = (req,res) =>{
    const name = req.body.name
    const description = req.body.description
    const summary = req.body.summary
    const id = req.params.idProductInformation

     const productInformation = {
        name : name,
        description: description,
        summary : summary
    }

    
    ProductInformation.update(productInformation,
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"ProductInformation updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update ProductInformation with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while updating ProductInformation"})
    })
}

exports.delete = (req,res) =>{
    const id = req.params.idProductInformation

    ProductInformation.update({active:false},{where:{id:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"ProductInformation deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete ProductInformation with the id:${id}`
            })
        }
        }).catch(err=>{
            res.status(500).send({message:err.message||"Error while deleting ProductInformation"})
        })
}

exports.deleteByProduct = (req,res) =>{
    const id = req.params.idProduct

    ProductInformation.update({active:false},{where:{idProduct:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"ProductInformations deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete ProductInformations with the product id:${id}`
            })
        }
        }).catch(err=>{
            res.status(500).send({message:err.message||"Error while deleting ProductInformations by product"})
        })
}