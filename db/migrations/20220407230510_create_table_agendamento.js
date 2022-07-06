
exports.up = function(knex) {
    return knex.schema.createTable('agendamento', table=>{
        table.increments('id');
        table.integer('motoristaId').unsigned().references('usuario.id');
        table.integer('vagas');
        table.string('localorigem');
        table.date('datasaida');
        table.time('horasaida');
        table.string('localdestino');
        table.date('datachegada');
        table.time('horachegada');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('agendamento');
};
