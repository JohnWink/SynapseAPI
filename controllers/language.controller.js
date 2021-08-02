const db = require ("../models");
const Language = db.languages;
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path')
const aws = require('aws-sdk');

const  spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com')
const s3 =  new aws.S3({endpoint: spacesEndpoint}) 






exports.create = (req,res) =>{

    const order = req.body.order
    const languageName = req.body.language

    const language = {
       order: order,
       language: languageName
    }

    Language.findOne({where:{order:order, active: true}}).then(data=>{
        if(data){
            return res.status(403).send("Order number already exists")
        }else{
            Language.create(language).then(data=>{
                return  res.send(data)
            }).catch(err =>{
                return  res.status(500).send({message:err.message||"Error while creating Language"})
            })
        }
    })
    

    
}





exports.upload = (req,res) =>{


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
            console.log("Image name and location: ", req.file)

            //res.send('test')

            if(req.file == undefined){
               return res.status(400).send({msg:"Error:no File Selected!"})
            }
                // CREATING CATEGORY
                let upload = `https://space-synapse.fra1.digitaloceanspaces.com/${req.file.key}`
              
              
                Language.update(
                    {image:upload},
                    {where:{id:req.params.idLanguage}}).then(num=>{
                        if(num == 1){
                            Language.update({active:true},
                                            {where:{id:req.params.idLanguage}
                                            }).then(num=>{
                                                if(num == 1){
                                                    return res.send({
                                                        message:"Language's image uploaded"
                                                    })
                                                }else{
                                                    return res.status(404).send({
                                                        message:`Can't activate Language`
                                                    })
                                                }
                                            })
                          
                        }
                        else{
                            return res.status(404).send({
                                message:`Can't upload Language's image`
                            })
                        }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Error while uploading Language image"
                    })
                })       
        }
    })
      
    
}

exports.update = (req,res)=>{
    const id  = req.params.idLanguage

    const language = {
        language:req.body.language,
        order:req.body.order
    }

    Language.update(language,
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Language updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update Language`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while updating Language"})
    })
}

exports.activate = (req,res) =>{

    const id  = req.params.idLanguage

    Language.update({active:true},
        {where:{
            id:id, 
            active:false
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"language activated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't activate language with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while activating language"})
    })
    
}

exports.findAll = (req,res) =>{
    Language.findAll({where:{active:true}}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all language"})
    })
}


exports.delete = (req,res) =>{
    const id = req.params.idLanguage
    Language.update({active:false},{where:{id:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"language deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete language with the id:${id}`
            })
        }
}).catch(err=>{
    res.status(500).send({message:err.message||"Error while deleting language"})
})
}