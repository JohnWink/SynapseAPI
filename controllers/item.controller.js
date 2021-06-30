const db = require ("../models");
const Item = db.items
const Stock = db.stocks
const Store = db.stores
const Product = db.products
exports.create = (req,res) =>{
 
    const idProduct = req.params.idProduct
    const marketPrice = req.body.marketPrice
    const storePrice = req.body.storePrice
    const dosageValue = req.body.dosageValue
    const dosageMeasure = req.body.dosageMeasure
    const idStores = req.body.idStores

    console.log("idStores: ", idStores)
    console.log("idStores length: ", idStores.length)
    let item = []

    for(let i = 0; i < idStores.length;i++){
        item.push({
            idStore:idStores[i],
            idProduct:idProduct,
            marketPrice: marketPrice,
            storePrice:storePrice,
            dosageValue:dosageValue,
            dosageMeasure:dosageMeasure
        })
    }

  
   
    Item.bulkCreate(item).then(data=>{
        return res.send(data)
    }).catch(err=>{
        return res.status(500).send({message: err.message || "Something went wrong while creating item"})
    })
}

exports.addItem = (req,res)=>{

    const idProduct = req.params.idProduct
    const marketPrice = req.body.marketPrice
    const storePrice = req.body.storePrice
    const dosageValue = req.body.dosageValue

    let itemBody = []
    let result
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
        result = data
        for(let i = 0 ; i < result.length; i++){
            
            itemBody.push({
                idProduct:idProduct,
                idStore:data[i].id,
                marketPrice:marketPrice,
                storePrice:storePrice,
                dosageValue:dosageValue
            })
    
          
        }

        
    
        const filteredItem = itemBody.reduce((acc, current) => {
            const x = acc.find(item => item.idStore === current.idStore);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
    
          Item.bulkCreate(filteredItem).then(data=>{
            res.send(data)
        }).catch(err=>{
            res.status(500).send({message:err.message||"Error while adding Item"})
        })
    }).catch((err)=>{
        res.status(500).send({
            message:err.message || `Error occurred while getting all stores by product` 
        })
    })

 


}



exports.findByProduct = (req,res) =>{
    const id = req.params.idProduct

    Item.findAll({
       where:{idProduct:id, active:true},
     
            include:[
                {
                    model:Stock,
                    as:'stocks',
                }
            ],
    }).then(data=>{

        res.send(data) // to grab the "Count" just use response.count on the frontend
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all stocks by items"})
    })
}


exports.findByStoreProduct = (req,res) =>{
    const idProduct = req.params.idProduct
    const idStore = req.params.idStore
    Item.findAll({
       where:{idProduct:idProduct,idStore:idStore, active:true},
     
            include:[
                {
                    model:Stock,
                    as:'stocks',
                }
            ],
    }).then(data=>{

        res.send(data) // to grab the "Count" just use response.count on the frontend
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all stocks by items"})
    })
}

exports.update = (req,res) =>{

    const id  = req.params.idItem
    const marketPrice = req.body.marketPrice
    const storePrice = req.body.storePrice
    const dosageValue = req.body.dosageValue
  

    const item = {
        marketPrice: marketPrice,
        storePrice:storePrice,
        dosageValue:dosageValue,
    }

    Item.update(item,
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"item updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update item`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while updating item"})
    })
}

exports.updateDosageMeasure = (req,res) =>{
    const dosageMeasure = req.body.dosageMeasure
    const idProduct = req.params.idProduct

    const item = {
        dosageMeasure: dosageMeasure,
    }

    Item.update(item,
        {where:{
            idProduct:idProduct, 
            active:true
        }}).then(num=>{
            if(num >=1 ){
                return res.send({
                    message:"item updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update item`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while updating item"})
    })
}

exports.activate = (req,res) =>{
    
    const id  = req.params.idItem

    Item.update({active:true},
        {where:{
            id:id, 
            active:false
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Item activated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't activate item`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while activating Item"})
    })
}

exports.delete = (req,res) =>{
    const id  = req.params.idItem

    Item.update({active:false},
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Item deleted"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't delete item`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while deleting Item"})
    })
}

exports.deleteByStore = (req,res) =>{
    const idStore  = req.params.idStore

    Item.update({active:false},
        {where:{
            idStore:idStore, 
            active:true
        }}).then(num=>{
            if(num == 1){
                Stock.update({active:false},
                    {where:{active:true},
                    include:[{
                        model:Item,
                        where:{iStore:idStore,active:false}
                    }]
                }).then(()=>{
                    return res.send({
                        message:"Items deleted"
                    })
                }).catch((err)=>{
                    res.status(500).send({message:err.message||"Error while deleting Items by store"})
                })
                
            }
            else{
                return res.status(404).send({
                    message:`Can't delete items from store`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while deleting Items by store"})
    })
}

