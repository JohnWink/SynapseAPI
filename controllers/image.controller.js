const db = require ("../models");
const Image = db.images
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path')
const aws = require('aws-sdk');

const  spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com')
const s3 =  new aws.S3({endpoint: spacesEndpoint}) 


exports.upload = (req,res) =>{

    const id = req.params.idImage


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
            cb('Error: Images Only!')
        }
    }


    upload(req,res,(err)=>{
        if(err){
            console.log("error:", err)
            res.status(500).send({ message: err.message || "Ocorreu um erro"})
        }else{
            console.log("Files/videos Processed!")
            console.log("Image name and location: ", req.file.key)

            //res.send('test')

            if(req.file == undefined){
               return res.status(400).send({msg:"Error:no File Selected!"})
            }
                // CREATING CATEGORY
                let upload = `https://space-synapse.fra1.digitaloceanspaces.com/${req.file.key}`
              
             

                Image.update({image:upload},{where:{id:id}}).then(data=>{
                    return res.send({
                        message:"category's image uploaded"
                    })   
                }).catch(err => {
                   return res.status(500).send({
                        message: err.message || "Error while uploading image"
                    })
                })       
        }
    })
      
    
}

exports.create = (req,res) =>{

    const idProduct = req.params.idProduct
    const order = req.body.order

    const image ={
        idProduct: idProduct,
        order:order
    }

    Image.findOne({where:{idProduct:idProduct,order:order}}).then(data=>{
        if(data){
            return res.status(403).send("Can't have two images with the same order number")
        }
    })

    Image.create(image).then(data =>{
        return res.send(data)
    }).catch(err=>{
        return res.status(500).send({
            message: err.message || "Error while creating image"
        })
    })
}


exports.update = (req,res) =>{

    const id = req.params.idImage
    const order = req.body.order

    const image = {
        order:order
    }


    Image.findOne({where:{idProduct:idProduct,order:order}}).then(data=>{
        if(data){
            return res.status(403).send("Can't have two images with the same order number")
        }
    })

    Image.update(image,
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Image updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update Image with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while creating Image name"})
    })
      
    
}

exports.activate = (req,res) =>{

    const id  = req.params.idImage

    Image.update({active:true},
        {where:{
            id:id, 
            active:false
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Image activated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't activate Image with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while activating Image name"})
    })
    
}

exports.delete = (req,res) =>{

    const id  = req.params.idImage

    Image.update({active:false},
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"Image deleted"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't delete Image with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while activating Image name"})
    })
    
}

exports.findByProduct = (req,res) =>{
    const idProduct = req.params.idProduct

    Image.findAll({where:{idProduct:idProduct, active:true}}).then(data=>{
       return res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding Images by produt"})
    })
}