module.exports = app => {

    return async (req, res) => {
        try {

            let body = req.body;

            body.motoristaId = req.userId;

            await app.db('agendamento').insert(body)

            return res.sendStatus(201);
        } catch (err) {
            return res.status(400).send({ erro: "Erro ao fazer o agendamento" });
        }
    }
}