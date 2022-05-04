let bcrypt = require('bcryptjs');

module.exports = app => {

    const { existsOrError, notExistsOrError, validationCPF } = app.api.validation;

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    return async (req, res) => {
        try {
            let { nome, cpf, whatsapp, email, senha } = req.body;

            existsOrError(nome, "Informe o nome");
            existsOrError(cpf, "Informe o cpf");
            validationCPF(cpf, "Cpf Invalido");
            existsOrError(whatsapp, "Informe o whatsapp");
            existsOrError(email, "Informe o email");
            existsOrError(senha, "Informe a senha");
            
            let usscpf = await app.db('usuario').where({ cpf }).first();
            notExistsOrError(usscpf, "CPF ja cadastrado");
            
            let ussemail = await app.db('usuario').where({ email }).first();
            notExistsOrError(ussemail, "Email ja cadastrado");

            senha = encryptPassword(senha);

            await app.db('usuario').insert({nome, cpf, whatsapp, email, senha});

            return res.status(201).send({nome, cpf, whatsapp, email});
        } catch (err) {
            return res.status(400).send(err);
        }
    }

}