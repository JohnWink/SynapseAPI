module.exports = app =>{
    const user = require ("../controllers/user.controller")
    
    app.post('/users/signUp', user.signUp)
    app.post('/users/login', user.login)
    app.post('/users/admin/login', user.adminLogin)
    app.post('/users/admin/signup', user.adminSignup )
}