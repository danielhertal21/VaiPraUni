


module.exports = app => {


    return async (req, res) => {

        const query = req.query;
        const email = query?.email;

        try {

            const { existsOrError, notExistsOrError, validationCPF } = app.api.validation;

            existsOrError(email, 'E-mail não informado!');

            const perfil = await app.db('usuario').select().where({ email: email }).first();

            existsOrError(perfil, 'Usuário não localizado!');

            delete perfil.senha;

            return res.status(200).json({ ...perfil });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ status: false, result: err });
        }
    }
}