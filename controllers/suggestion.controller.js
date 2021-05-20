const db = require ("../models");
const Suggestion = db.suggestions;
const User = db.users

exports.create = (req,res) =>{

    const idUser = req.params.idUser
    const message = req.body.message
    const product = req.body.product


    const suggestion = {
        message: message,
        product: product,
        idUser: idUser
    }
    

    Suggestion.create(suggestion).then(data=>{
        return  res.send(data)
    }).catch(err =>{
        return  res.status(500).send({message:err.message||"Error while creating Suggestion"})
    })
}

exports.countByProduct = (req,res) =>{
    Suggestion.findAndCountAll({
        where:{active:true}, 
        attributes: ['product'],
        group: ['product'],
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all Products name"})
    })
}

exports.findByProduct = (req,res) =>{
    const product = req.body.product

    Suggestion.findAll({
        where:{active:true, product:product},
        attributes: ['message'],
        include: [{
            model: User,
            where:{active:true},
            attributes: ['id','email','name'],
        }]
                
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding suggestion by products"})
    })



}