module.exports = app => {

    // Existe / erro
    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
        if (typeof value === 'object' && Object.values(value).length == 0) {
            throw msg
        }
    }

    /// Não pode existir / erro
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    // Valores iguais / erro
    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    /// Ativo / erro
    function inactiveOrError(value, msg) {
        if (!value) throw msg
    }

    // Validador de CNPJ;
    function validationCNPJ(cnpj, msg) {
        if (typeof cnpj !== 'string') {
            cnpj = cnpj.toString();
        }

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') throw msg;

        if (cnpj.length != 14)
            throw msg

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            throw msg

        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            throw msg

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            throw msg

        return
    }

    // Validador de CPF
    function validationCPF(cpf, msg) {
        if (typeof cpf !== 'string') {
            cpf = cpf.toString();
        }

        cpf = cpf.replace(/[^\d]+/g, '');

        var Soma;
        var Resto;
        Soma = 0;
        if (cpf == "00000000000") throw msg;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10))) throw msg;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11))) throw msg;

        return
    }


    return { existsOrError, notExistsOrError, equalsOrError, validationCNPJ, validationCPF, inactiveOrError }
}