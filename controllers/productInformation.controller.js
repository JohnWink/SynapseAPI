const db = require ("../models");
const ProductInformation = db.productInformations;



exports.create = (req,res) =>{
    const language = req.body.language
    const name = req.body.name
    const description = req.body.description
    const summary = req.body.summary
    const id = req.params.idProduct

    ProductInformation.findOne({where:{idProduct:id,language:language}}).then(data=>{
        if(data){
            return res.status(403).send("Language already exists")
        }
    })
    const productInformation = {
        idProduct: id,
        language: language,
        name : name,
        description: description,
        summary : summary
    }

    ProductInformation.create(productInformation).then(data=>{
        return  res.send(data)
    }).catch(err =>{
        return  res.status(500).send({message:err.message||"Error while creating Production Information"})
    })

   
}

exports.update = (req,res) =>{
    const language = req.body.language
    const name = req.body.name
    const description = req.body.description
    const summary = req.body.summary
    const id = req.params.idProductInformation

     const productInformation = {
        language: language,
        name : name,
        description: description,
        summary : summary
    }

    ProductInformation.findOne({where:{idProduct:id,language:language}}).then(data=>{
        if(data){
            return res.status(403).send("Language already exists")
        }
    })
    
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