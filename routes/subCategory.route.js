module.exports = app =>{
    const subCategory = require ("../controllers/subCategory.controller")
    const auth = require("../controllers/authentication")

    app.get('/categories/:idCategory/subCategories', auth.authenticateJWT,  subCategory.findByCategory)
    app.get('/subCategories/:idSubCategory', auth.authenticateJWT, subCategory.findOne)
    app.post('/categories/:idCategory/subCategories/', auth.authenticateJWT,  subCategory.create)
    app.put('/subCategories/:idSubCategory', auth.authenticateJWT, subCategory.update)
    app.put('/subCategories/:idSubCategory/upload', auth.authenticateJWT, subCategory.upload)
    app.put('/subCategories/:idSubCategory/activate', auth.authenticateJWT, subCategory.activate)
    app.delete('/subCategories/:idSubCategory', auth.authenticateJWT, subCategory.delete)
}