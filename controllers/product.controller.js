const db = require ("../models");
const stockModel = require("../models/stock.model");
const Product = db.products;
const Item = db.items;
const ProductInformation = db.productInformations
const Category = db.categories
const SubCategory = db.subCategories
const image = db.images
const Stock = db.stocks
const Sequelize = require("sequelize");

exports.findOne = (req,res) =>{
    const id = req.params.idProduct

    Product.findOne({
        where:{id:id, active:true}, 
        include:[
                {model:Category, where:{active:true}},
                {model:SubCategory},
                {model:Item},
                {model:ProductInformation},
                ]
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding one Product"})
    })

}

exports.findByStore = (req,res) =>{
    const idStore = req.params.idStore
    Product.findAll({
        where:{active:true}, 
        include:[
                {model:Category, where:{active:true}},
                {model:SubCategory},
                {model:ProductInformation},
                {model:Item, where:{id:idStore,active:true}}
                ]
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all Products name"})
    })
}

exports.findAll = (req,res) =>{
   
// WARNING: THERE WILL BE SUBCATEGORIES AND PRODUCT INFORMATIONS THAT ARE DELETED WHICH WILL SHOW UP. PLEASE CHECK THIS ISSUE ON FRONT END
    Product.findAll({
        where:{active:true}, 
        include:[
                {model:Category, where:{active:true}},
                {model:SubCategory},
                {model:ProductInformation},
                {model:Item}
                ]
    }).then(data=>{
        let response = []
        console.log("data: ", data)
        for(let i= 0; i< data.length;i++){
            response[i] = {
                id: data[i].id,
                minimumStock: data[i].minimumStock,
                categories:[],
                subCategories:[],
                productInformations:[],
                items:[]
            }
         
          
            response[i].categories = (data[i].category)
            
          
            if(data[i].subCategory !== null){
                for(let j = 0;j<data[i].subCategory.length;j++){
                    if(data[i].subCategory[j].active){
                        response[i].subCategories.push(data[i].subCategory[j])
                    }
                }
            }
            
            if(data[i].productInformations !== null){
                for(let j = 0;j<data[i].productInformations.length;j++){
                    if(data[i].productInformations[j].active){
                        response[i].productInformations.push(data[i].productInformations[j])
                    }
                }
            }
           
            if(data[i].items !== null){
                for(let j = 0;j<data[i].items.length;j++){
                    if(data[i].items[j].active){
                        response[i].items.push(data[i].items[j])
                    }
                }
            }
           
        }
        res.send(response)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all Products name"})
    })

}

exports.create = (req,res) =>{
    const minStock = req.body.minStock
    const idCategory = req.body.idCategory
    const idSubCategory = req.body.idSubCategory


    const product = {
        minimumStock: minStock,
        idCategory : idCategory,
        idSubCategory: idSubCategory,
    }

    Product.create(product).then(data=>{
        return  res.send(data)
    }).catch(err =>{
        return  res.status(500).send({message:err.message||"Error while creating Product"})
    })

   
}

exports.update = (req,res) =>{
    const id = req.params.idProduct
    const minStock = req.body.minStock
    const idCategory = req.params.idCategory
    const idSubCategory = req.params.idSubCategory

     const product = {
        minimumStock: minStock,
        idCategory : idCategory,
        idSubCategory: idSubCategory,
    }
    Product.update(product,
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Product updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update Product with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while updating product"})
    })
}

exports.delete = (req,res) =>{
    const id = req.params.idProduct
    Product.update({active:false},{where:{id:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"Product deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete Product with the id:${id}`
            })
        }
}).catch(err=>{
    res.status(500).send({message:err.message||"Error while creating Product name"})
})
}



exports.activate = (req,res) =>{

    const id  = req.params.idProduct

    Product.update({active:true},
        {where:{
            id:id, 
            active:false
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"product activated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't activate product with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while activating product"})
    })
    
}



exports.findByStore = (req,res) =>{
    const id = req.params.idStore

    Product.findAll({
       
        include:[
            {
                model:Item,
                as:'items',
                where:{idStore:id},
                include:[
                    {
                        model:Stock,
                        as:'stocks',
                        where:{active:false},
                    }
                ],
            },
            {
                model:ProductInformation,
                as:'productInformations',
                where:{active:true, language:'portuguese'}
            } 
        ],
    }).then(data=>{

        res.send(data) // to grab the "Count" just use response.count on the frontend
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all stocks by items"})
    })
}