const db = require ("../models");
const Category = db.categories;
const SubCategory = db.subCategories
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path')
const aws = require('aws-sdk');

const  spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com')
const s3 =  new aws.S3({endpoint: spacesEndpoint}) 


exports.create = (req,res) =>{
    const category = {
        category:req.body.category
    }

    Category.create(category).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while creating category name"})
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
            console.log("Image name and location: ", req.file.key)

            //res.send('test')

            if(req.file == undefined){
               return res.status(400).send({msg:"Error:no File Selected!"})
            }
                // CREATING CATEGORY
                let upload = `https://space-synapse.fra1.digitaloceanspaces.com/${req.file.key}`
              
              
                Category.update(
                    {image:upload},
                    {where:{id:req.params.idCategory}}).then(num=>{
                        if(num == 1){
                            return res.send({
                                message:"category's image uploaded"
                            })
                        }
                        else{
                            return res.status(404).send({
                                message:`Can't upload category's image with the id:${id}`
                            })
                        }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Error while uploading Category image"
                    })
                })       
        }
    })
      
    
}


exports.update = (req,res)=>{
    const id  = req.params.idCategory

    const category = {
        category:req.body.category
    }

    Category.update(category,
        {where:{
            id:id, 
            active:true
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"category updated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't update category with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while updating category"})
    })
}

exports.activate = (req,res) =>{

    const id  = req.params.idCategory

    Category.update({active:true},
        {where:{
            id:id, 
            active:false
        }}).then(num=>{
            if(num == 1){
                return res.send({
                    message:"category activated"
                })
            }
            else{
                return res.status(404).send({
                    message:`Can't activate category with the id:${id}`
                })
            }
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while activating category"})
    })
    
}

exports.findAll = (req,res) =>{
    Category.findAll({where:{active:true}, include:[{model:SubCategory, where:{active:true}}]}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding all categories"})
    })
}

exports.findOne = (req,res)=>{
    const id = req.params.idCategory

    Category.findOne({where:{id:id,active:true}}).then(data=>{
        if(data){
           return res.send(data)
        }
        return res.status(404).send("Category not found")
    }).catch(err=>{
        res.status(500).send({message:err.message||"Error while finding one category"})
    })  
}

exports.delete = (req,res) =>{
    const id = req.params.idCategory
    Category.update({active:false},{where:{id:id, active:true }}).then(num=>{
        if(num == 1){
            return res.send({
                message:"category deleted"
            })
        }
        else{
            return res.status(404).send({
                message:`Can't delete category with the id:${id}`
            })
        }
}).catch(err=>{
    res.status(500).send({message:err.message||"Error while deleting category"})
})
}