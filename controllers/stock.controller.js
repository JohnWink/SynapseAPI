const db = require ("../models");
const Item = db.items;
const Stock = db.stocks


exports.create = (req,res) =>{
   const idItem = req.params.idItem

   Stock.create({idItem: idItem}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while creating stock"})
    })
}


exports.findByItem = (req,res) =>{
    const idItem = req.params.idItem

    Stock.findAll({where:{idItem: idItem , active:true}}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all stocks by items"})
    })
}

exports.countByItem = (req,res) =>{
    const idItem = req.params.idItem

    Stock.findAndCountAll({where:{idItem: idItem , active:true}}).then(data=>{
        res.send(data) // to grab the "Count" just use response.count on the frontend
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all stocks by items"})
    })
}





exports.delete = (req,res) =>{
    const id = req.params.idStock
    Stock.update({active:false},{where:{id:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"Stock deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete Stock with the id:${id}`
            })
        }
}).catch(err=>{
    res.status(500).send({message:err.message||"Error while deleting stock"})
})
}