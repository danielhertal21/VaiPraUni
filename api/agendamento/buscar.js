module.exports = app => {

    return async (req, res) => {
        try {

            const search = req.query.search;


            let agendamentos = [];

            if (search) {
                agendamentos = await app.db('agendamento as ag')
                    .select(
                        'ag.id',
                        'ag.vagas',
                        'ag.localorigem',
                        'ag.localdestino',
                        'ag.horasaida',
                        'ag.horachegada',
                        'ag.motoristaId',
                        'us.nome as nomeMotorista')
                    .innerJoin('usuario as us', 'us.id', 'ag.motoristaId')
                    .joinRaw(`left join carona as ca ON ca.agendamentoId = ag.id`)
                    .where('localdestino', 'like', '%' + search + '%')
                    .where('ag.motoristaId', '!=', req.userId);
            } else {
                agendamentos = await app.db('agendamento as ag')
                    .select(
                        'ag.id',
                        'ag.vagas',
                        'ag.localorigem',
                        'ag.localdestino',
                        'ag.horasaida',
                        'ag.horachegada',
                        'ag.motoristaId',
                        'ca.passageiroId',
                        'us.nome as nomeMotorista')
                    .innerJoin('usuario as us', 'us.id', 'ag.motoristaId')
                    .leftJoin('carona as ca ', 'ca.agendamentoId', '=', 'ag.id')
                    .where('ag.motoristaId', '!=', req.userId);
            }

            agendamentos = agendamentos.filter(function (value, index, arr) {
                if (value.passageiroId != req.userId) {
                    return true;
                } else {
                    return false
                }
            });

            return res.send(agendamentos);
        } catch (err) {
            console.log(err)
            return res.status(400).send(err);
        }
    }
}