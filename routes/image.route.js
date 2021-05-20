module.exports = app =>{
    const image = require ("../controllers/image.controller")

    app.get('/products/:idProduct/images', image.findByProduct)
    app.post('/products/:idProduct/images', image.create)
    app.put('/images/:idImage/upload', image.upload)
    app.put('/images/:idImage', image.update)
    app.put('/images/:idImage/activate', image.activate)
    app.delete('/images/:idImage', image.delete)

}