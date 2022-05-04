
module.exports = app => {

    const autenticar = async (req, res, next) => {
        
        
        return res.sendStatus(401);
        next();
    }

    return { autenticar }
}