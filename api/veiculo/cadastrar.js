module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation;

    return async (req, res) => {
        try {
            const { placa, cor, marca, modelo, ano } = req.body;

            existsOrError(placa, "Informe a placa");
            existsOrError(cor, "Informe a cor");
            existsOrError(marca, "Informe a marca");
            existsOrError(modelo, "Informe o modelo");
            existsOrError(ano, "Informe o ano");
            
            const usuarioId = req.userId;

            await app.db('vaiculo').insert({usuarioId, placa, cor, marca, modelo, ano});

            return res.sendStatus(201);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}