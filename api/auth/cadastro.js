let bcrypt = require('bcryptjs');

module.exports = app => {

    const { existsOrError, notExistsOrError, validationCPF } = app.api.validation;

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    return async (req, res) => {
        try {
            let { nome, cpf, whatsapp, email, password } = req.body;

            cpf = cpf.replace(/[^0-9]/g,'');

            existsOrError(nome, "Informe o nome");

            existsOrError(cpf, "Informe o CPF");
            validationCPF(cpf, "CPF Invalido");

            existsOrError(whatsapp, "Informe o whatsapp");
            existsOrError(email, "Informe o email");
            existsOrError(password, "Informe a senha");

            let usscpf = await app.db('usuario').where({ cpf }).first();
            notExistsOrError(usscpf, "CPF ja cadastrado");

            let ussemail = await app.db('usuario').where({ email }).first();
            notExistsOrError(ussemail, "Email ja cadastrado");

            password = encryptPassword(password);

            await app.db('usuario').insert({ nome, cpf, whatsapp, email, senha: password });

            return res.status(201).send({ status: true });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ status: false, result: err });
        }
    }

}