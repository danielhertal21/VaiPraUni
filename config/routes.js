const express = require('express');

module.exports = app => {

    app.route('/api/cadastro').post(app.api.auth.cadastro);
    app.route('/api/login').post(app.api.auth.login);


    app.route('/api/agendamento')
        .all(app.api.auth.autenticar)
        .get(app.api.agendamento.buscar)
        .post(app.api.agendamento.criar);

    app.route('/api/minhascaronas')
        .all(app.api.auth.autenticar)
        .get(app.api.minhasCaronas.buscar)
        .post(app.api.minhasCaronas.pegarCarona);

    app.route('/api/veiculo')
        .all(app.api.auth.autenticar)
        .get(app.api.veiculo.buscar);

    app.route('/api/veiculo/cadastrar')
        .all(app.api.auth.autenticar)
        .post(app.api.veiculo.cadastrar);

    app.route('/api/veiculo/remover/:id')
        .all(app.api.auth.autenticar)
        .post(app.api.veiculo.remover);
}