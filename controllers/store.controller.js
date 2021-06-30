const db = require ("../models");
const Store = db.stores;
const History = db.histories
const Item = db.items
const Product = db.products

exports.create = (req,res) => {
     const store = {
         name:req.body.name,
         address:req.body.address,
         email:req.body.email,
         phone:req.body.phone
     }

     Store.create(store).then(data=>{
         res.status(201).send(data)
     }).catch(err =>{
         res.status(500).send({
             message:err.message || "Some error occurred while creating a store"
         })
     })

    
}

exports.update = (req,res) =>{
    const id  = req.params.id

    const store = {
        name:req.body.name,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone
    }

    Store.update(store,{
        where:{id:id}
    }).then(num=>{
        if(num == 1){
           return res.send({
                message:"store updated"
            })
        }else{
            return res.send({
                message:`Can't update store with the id:${id}`
            })
        }
        
        
    }).catch(err =>{
        res.status(500).send({
            message:err.message || `Error occurred while updating with the id:${id}` 
        })
    })
}

exports.delete = (req,res) =>{
    const id  = req.params.id

    Store.update({active:0},{
        where:{id:id}
    }).then(num=>{
        if(num ==1){
            return res.send({
                message:"store deleted"
            })
        }else{
            return res.send({
                message:`Can't delete store with the id:${id}`
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message:err.message || `Error occurred while deleting with the id:${id}` 
        })
    })
}

exports.getAll = (req,res) =>{

    Store.findAll({where:{active:true}})
    .then(data=>{
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message:err.message || `Error occurred while getting all stores` 
        })
    })
}

exports.findByProduct = (req,res) =>{

    const idProduct = req.params.idProduct
    Store.findAll({
        where:{active:true},
        include:[
            {
                model:Item,
                where:{active:true},
                include:[{
                    model:Product,
                    where:{id:idProduct, active:true}
                }]
            },
        ]
    }).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.status(500).send({
            message:err.message || `Error occurred while getting all stores by product` 
        })
    })
}

exports.findAllSales = (req,res) =>{
    Store.findAll({
        attributes:['id','name'],
   
        
        include:[
            {
                model:History,
                as:'histories',
                attributes:['idStock'],
                group:['idStock']
            },
        ],
    }).then(data=>{
        res.send(data) // to grab the "Count" just use response.count on the frontend
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all sales"})
    })
}