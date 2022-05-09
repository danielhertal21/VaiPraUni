module.exports = app => {


    return async (req, res) => {
        try {

            const usuarioId = req.userId;

            let veic = await app.db('vaiculo').where({ usuarioId, ativo: true });

            return res.send(veic);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}