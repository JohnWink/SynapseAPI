const db = require ("../models");

const History = db.histories
const Stock = db.stocks
const Store = db.stores

exports.create = (req,res) =>{

    let idUser = null
    if(req.body.idUser !== ''){
        idUser = req.body.idUser
    }

    const history = {
        idUser:idUser,
        idStore:req.body.idStore,
        idStock: req.body.idStock

    }

    History.create(history).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while creating history"})
    })

   
}

exports.findAll=(req,res)=>{
    History.findAll({where:{active:true}}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding sales"})
    })
}


