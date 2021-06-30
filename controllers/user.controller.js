const db = require ("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const nodemailerConfig = require('../config/nodemailer.config')






exports.signUp = (req,res) =>{
    if(!req.body.name || !req.body.email || !req.body.password ||
        !req.body.address || !req.body.nif || !req.body.nipc){
            res.status(400).send({
                message:"Empty Fields"
            })
            return
        }
        console.log("user: ", req.body.name)
        bcrypt.hash(req.body.password, 10, function(err,hash){
            const user = {
                name:req.body.name,
                email:req.body.email,
                password:hash,
                address:req.body.address,
                nif:req.body.nif,
                nipc:req.body.nipc,
                publicity:req.body.publicity
            }   
    
            User.create(user).then(data=>{
                sendSignUpMail(data.email, data.id)
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error while creating User"
                })
            })
        })
      
}

exports.adminSignup = (req,res) =>{
    if(!req.body.email || !req.body.password){
            res.status(400).send({
                message:"Empty Fields"
            })
            return
        }
        console.log("user: ", req.body.name)
        bcrypt.hash(req.body.password, 10, function(err,hash){
            const user = {
                email:req.body.email,
                password:hash,
                admin:true,
                active:true
            }   
    
            User.create(user).then(data=>{
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error while creating User"
                })
            })
        })
}

function sendSignUpMail(email, idUser){

    var token = jwt.sign({id:idUser}, nodemailerConfig.secret, {
        expiresIn: new Date().getTime() +  10 * 60 * 100000 // expires in 1000 min
    });

    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'devjohnwink@gmail.com',
            pass:'higvebgbfblcfgni'
        }
    })

    var mailOptions = {
        from:'devjohnwink@gmail.com',
        to:email,
        subject:"Registo Synapse",
        html:'<h1>Obrigado registar! Por favor confirme a sua conta  no link abaixo!</h1><a href="https://mealset.herokuapp.com/confirm/'+token+'"><H2>Clique aqui!</H2></a>'
    }

    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
            console.log("Erro: ", err.message)
        }else{
            console.log('Message sent: ' + info.response);
           console.log("Email enviado")
        }
    })
}


exports.login = (req,res) => {
    User.findOne({where:{active:true, email: req.body.email}}).then(data =>{

        if(data === null){
            return res.status(404).send({
                message:"User Not Found"
            })
            
        }

        bcrypt.compare(req.body.password, data.password,function(hashErr,hashRes){
            if(hashRes){
                var token = jwt.sign({ id: data.id }, nodemailerConfig.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(201).send({
                    token:token,
                    idUser:data.id,
                    name: data.name,
                    address: data.address,
                    nif: data.nif,
                    nipc: data.nipc,
                })
            }else{
                return res.status(401).send({
                    message:"Passwords don't match"
                })
            }
        })

     
    })
}

exports.adminLogin = (req,res) =>{
    User.findOne({where:{active:true, admin:true, email: req.body.email}}).then(data =>{

        if(data === null){
            return res.status(404).send({
                message:"User Not Found"
            })
            
        }

        bcrypt.compare(req.body.password, data.password,function(hashErr,hashRes){
            if(hashRes){
                var token = jwt.sign({ id: data.id }, nodemailerConfig.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(201).send({
                    token:token,
                    idUser:data.id,
                    address: data.address,
                })
            }else{
                return res.status(401).send({
                    message:"Passwords don't match"
                })
            }
        })

     
    })
}