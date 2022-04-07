
exports.up = function(knex) {
    return knex.schema.createTable('carona', table=>{
        table.increments('id');
        table.integer('agendamentoId').unsigned().references('agendamento.id');
        table.integer('passageiroId').unsigned().references('usuario.id');
        table.string('status'); // Aguardando, Confirmado, Finalizado
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carona');
};
