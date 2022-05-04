let jwt = require('jsonwebtoken');

module.exports = app => {

    const { existsOrError, notExistsOrError, validationCPF } = app.api.validation;

    return async (req, res, next) => {
        try {
            let { authorization } = req.headers;

            existsOrError(authorization, "");

            authorization = authorization.replace("Bearer ", "");

            jwt.verify(authorization, process.env.JWT_SECRET_KEY, (err, decoded) => {
                notExistsOrError(err, "");
                req.userId = decoded.userId;
                req.userName = decoded.userName;
            });

            next();
        } catch (err) {
            return res.sendStatus(401);
        }
    }

}