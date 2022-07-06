module.exports = app => {

    return async (req, res) => {
        try {

            let caronas = await app.db('agendamento as ag')
                .select(
                    'ag.id',
                    'ag.vagas',
                    'ag.localorigem',
                    'ag.localdestino',
                    'ag.horasaida',
                    'ag.horachegada',
                    'ag.motoristaId',
                    'us.nome as nomeMotorista',
                    'ca.passageiroId')
                .innerJoin('usuario as us', 'us.id', 'ag.motoristaId')
                .leftJoin('carona as ca', 'ca.agendamentoId', 'ag.id')
                .where({ 'ag.motoristaId': req.userId })
                .orWhere({ 'ca.passageiroId': req.userId })
                .orderBy('ag.id', 'desc');

            let NcaronasFeitas = 0, NcaronasPegas = 0;

            for (let carona of caronas) {
                if (!carona.passageiroId) {
                    NcaronasFeitas++;
                } else if (carona.motoristaId != carona.passageiroId) {
                    NcaronasPegas++;
                }
            }

            return res.send({ NcaronasFeitas, NcaronasPegas, caronas: caronas.splice(0, 5) });
        } catch (err) {
            return res.status(400).send({ erro: "Ocorreu um erro na busca \ntente novamente mais tarde." });
        }
    }
}