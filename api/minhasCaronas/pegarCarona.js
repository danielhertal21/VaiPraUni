module.exports = app => {

    return async (req, res) => {
        try {

            const { id } = req.body;

            if (!id) {
                throw "Agendamento invalido";
            }

            await app.db('carona').insert({ agendamentoId: id, passageiroId: req.userId });


            return res.sendStatus(201);
        } catch (err) {
            return res.status(400).send({ erro: "Tente novamente mais tarde" });
        }
    }
}