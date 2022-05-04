let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = app => {

    const { existsOrError } = app.api.validation;

    const singin = async (req, res) => {
        try {
            const { usuario, senha } = req.body;

            let us = await app.db('usuario').select('id', 'nome', 'senha').where({ email: usuario }).orWhere({ cpf: usuario }).first();

            existsOrError(us, "Usuário ou senha invalido");

            if (!bcrypt.compareSync(senha, us.senha)) {
                throw "Usuário ou senha invalido";
            }

            let jwtSecretKey = process.env.JWT_SECRET_KEY;

            const token = jwt.sign({ userId: us.id, userName: us.nome }, jwtSecretKey, { expiresIn: "2h", algorithm: 'HS512' });


            return res.send({ token });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    return { singin }
}