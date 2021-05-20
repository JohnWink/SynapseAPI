const db = require ("../models");
const Support = db.supports;



exports.create = (req,res) =>{

    const contact = req.body.contact

    const support = {
        contact: contact
    }
    

    Support.create(support).then(data=>{
        return  res.send(data)
    }).catch(err =>{
        return  res.status(500).send({message:err.message||"Error while creating Support"})
    })
}

exports.findOne = (req,res)=>{
    const id = req.params.idSupport

    Support.findOne({where:{id:id,active:true}}).then(data=>{
        if(data){
           return res.send(data)
        }
        return res.status(404).send("Support not found")
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding one Support"})
    })  
}

exports.update = (req,res) =>{
    const id = req.params.idSupport
    const contact = req.body.contact

    const support = {
        contact: contact
    }
    
    Support.update(support,
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Support updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update Support with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while updating Support"})
    })

}

exports.delete = (req,res) =>{

    const id = req.params.idSupport

    Support.update({active:false},{where:{id:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"Support deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete Support with the id:${id}`
            })
        }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while deleting Support"})
    })
}

exports.activate = (req,res) =>{

    const id  = req.params.idSupport

    Support.update({active:true},
        {where:{
            id:id, 
            active:false
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Support activated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't activate Support with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while activating Support"})
    })
    
}

