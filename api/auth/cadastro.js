
module.exports = app => {

    function cadastrar(req, res){
        console.log(req.body)
        return res.send('Funcionou');
    }

    return { cadastrar }
}