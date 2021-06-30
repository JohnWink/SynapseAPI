const db = require ("../models");
const Publicity = db.publicities;


const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path')
const aws = require('aws-sdk');

const  spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com')
const s3 =  new aws.S3({endpoint: spacesEndpoint}) 


exports.findAll = (req,res) =>{
    Publicity.findAll({where:{active:true}}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all publicity"})
    })
}

exports.create = (req,res) =>{

    const order = req.body.order
    const idLanguage = req.body.idLanguage

    const publicity = {
       order: order,
       idLanguage:idLanguage
    }

    Publicity.findOne({where:{order:order, idLanguage:idLanguage}}).then(data=>{
        if(data){
            return res.status(403).send("Order number already exists in that language")
        }else{
            Publicity.create(publicity).then(data=>{
                return  res.send(data)
            }).catch(err =>{
                return  res.status(500).send({message:err.message||"Error while creating Publicity"})
            })
        }
    })
    

    
}


exports.upload = (req,res) =>{

    const id = req.params.idPublicity

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)


    // FILES UPLOAD
    var upload = multer({
        storage: multerS3({
          s3: s3,
          bucket: 'space-synapse',
          acl: 'public-read',
          key: function (request, file, cb) {
            console.log(file);
            cb(null, uniqueSuffix+path.extname(file.originalname));
          }
        }),
        fileFiler:function(req,file,cb){
            checkFileType(file,cb);
        }
      }).single('upload');

      function checkFileType(file,cb){

        //Video formats: |mp4|mov|wmv|avi|avchd|flv|f4v|webm
        //But it's only images for now as categories only have images

        const filetypes = /jpeg|jpg|png|gif/;

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        const mimetype = filetypes.test(file.mimetype)

        if(mimetype && extname){
            return cb(null,true)
        }else{
            cb('Error: Images and Videos Only!')
        }
    }


    upload(req,res,(err)=>{
        if(err){
            console.log("error:", err)
            res.status(500).send({ message: err.message || "Ocorreu um erro"})
        }else{
            console.log("Files/videos Processed!")
            console.log("Publicity name and location: ", req.file.key)

            //res.send('test')

            if(req.file == undefined){
               return res.status(400).send({msg:"Error:no File Selected!"})
            }
                // CREATING CATEGORY
                let upload = `https://space-synapse.fra1.digitaloceanspaces.com/${req.file.key}`
              
              
                Publicity.update(
                    {   file:upload,
                        active: true
                    },
                    {where:{id:id}}).then(num=>{
                        if(num == 1){
                            return res.send({
                                message:"Publicity's image uploaded"
                            })
                        }
                        else{
                            return res.status(404).send({
                                message:`Can't upload Publicity's image with the id:${id}`
                            })
                        }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Error while uploading Publicity"
                    })
                })       
        }
    })
      
    
}



exports.update = (req,res) =>{

    const order = req.body.order
    const id = req.params.idPublicity
    const idLanguage = req.body.idLanguage
    
     const publicity = {
        order: order,
        idLanguage:idLanguage
    }

    Publicity.findOne({where:{order:order,idLanguage:idLanguage,active:true}}).then(data=>{
        if(data){
            return res.status(403).send("Order number already exists in that language")
        }else{
            Publicity.update(publicity,
                {where:{
                    id:id, 
                    active:true
                }}).then(num=>{
                    if(num == 1){
                        return res.send({
                            message:"Publicity updated"
                        })
                    }
                    else{
                        return res.status(404).send({
                            message:`Can't update Publicity with the id:${id}`
                        })
                    }
            }).catch(err=>{
                return res.status(500).send({message:err.message||"Error while updating Publicity"})
            })
        }
    })

  
}


exports.delete = (req,res) =>{
    const id = req.params.idPublicity

    Publicity.update({active:false},{where:{id:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"Publicity deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete Publicity with the id:${id}`
            })
        }
        }).catch(err=>{
            res.status(500).send({message:err.message||"Error while deleting Publicity"})
        })
}

exports.activate = (req,res) =>{
    const id = req.params.idPublicity

    Publicity.update({active:true},{where:{id:id, active:false }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"Publicity activated"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't activate Publicity with the id:${id}`
            })
        }
        }).catch(err=>{
            res.status(500).send({message:err.message||"Error while activating Publicity"})
        })
}