const express = require('express');

module.exports = app => {

    // app.post('/login', app.api.access.auth.signin);
    // app.post('/logado', app.api.access.auth.validateToken);

    // app.route('/')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.gerence.home.get)

    app.route('/api/cadastro').post(app.api.auth.cadastro.cadastrar);
    app.route('/api/login').post(app.api.auth.login.singin);


    app.route('/api/teste')
        .all(app.api.auth.middleware.autenticar)
        .post((req, res)=>{
            return res.send();
        })
}