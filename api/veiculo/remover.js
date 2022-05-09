module.exports = app => {

    const { existsOrError } = app.api.validation;

    return async (req, res) => {
        try {
            const { id } = req.params;

            existsOrError(id, "");

            const usuarioId = req.userId;

            let veic = await app.db('vaiculo').where({ id, usuarioId, ativo: true }).first();

            existsOrError(veic, "Nenhum veiculo encontrado");

            await app.db('vaiculo').update({ ativo: false }).where({ id, usuarioId });

            return res.sendStatus(200);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}