let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = app => {

    const { existsOrError } = app.api.validation;

    return async (req, res) => {
        try {
            const b64auth = (req.headers.authorization || '').split(' ')[1] || '';

            const [usuario, senha] = Buffer.from(b64auth, 'base64').toString().split(':')

            let us = await app.db('usuario')
            .select('id', 'nome', 'senha').where({ email: usuario }).first();

            existsOrError(us, "Usuário ou senha invalido");
            
            if (!bcrypt.compareSync(senha, us.senha)) {
                throw "Usuário ou senha invalido";
            }
            
            const token = jwt.sign({ userId: us.id, userName: us.nome }, process.env.JWT_SECRET_KEY, { expiresIn: "2h", algorithm: 'HS256' });
            
            return res.send({ token });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

}