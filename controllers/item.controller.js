const db = require ("../models");
const Item = db.items
const Stock = db.stocks

exports.create = (req,res) =>{
    const idStore = req.params.idStore
    const idProduct = req.params.idProduct
    const marketPrice = req.body.marketPrice
    const storePrice = req.body.storePrice
    const dosageValue = req.body.dosageValue
    const dosageMeasure = req.body.dosageMeasure

    const item = {
        idStore:idStore,
        idProduct:idProduct,
        marketPrice: marketPrice,
        storePrice:storePrice,
        dosageValue:dosageValue,
        dosageMeasure:dosageMeasure
    }
    Item.create(item).then(data=>{
        return res.send(data)
    }).catch(err=>{
        return res.status(500).send({message: err.message || "Something went wrong while creating item"})
    })
}

exports.update = (req,res) =>{

    const id  = req.params.idItem
    const marketPrice = req.body.marketPrice
    const storePrice = req.body.storePrice
    const dosageValue = req.body.dosageValue
    const dosageMeasure = req.body.dosageMeasure

    const item = {
        marketPrice: marketPrice,
        storePrice:storePrice,
        dosageValue:dosageValue,
        dosageMeasure:dosageMeasure
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
                    message:`Can't update item with the id:${id}`
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
                    message:`Can't activate item with the id:${id}`
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
                    message:`Can't delete item with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while deleting Item"})
    })
}
