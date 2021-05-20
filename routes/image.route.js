module.exports = app =>{
    const image = require ("../controllers/image.controller")
    const auth = require("../controllers/authentication")
    app.get('/products/:idProduct/images', auth.authenticateJWT, image.findByProduct)
    app.post('/products/:idProduct/images', auth.authenticateJWT, image.create)
    app.put('/images/:idImage/upload',auth.authenticateJWT,  image.upload)
    app.put('/images/:idImage', auth.authenticateJWT,  image.update)
    app.put('/images/:idImage/activate', auth.authenticateJWT,  image.activate)
    app.delete('/images/:idImage', auth.authenticateJWT,  image.delete)

}