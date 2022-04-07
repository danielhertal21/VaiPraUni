
exports.up = function(knex) {
    return knex.schema.createTable('agendamento', table=>{
        table.increments('id');
        table.integer('motoristaId').unsigned().references('usuario.id');
        table.integer('vagas');
        table.string('origem');
        table.string('destino');
        table.datetime('horario');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('agendamento');
};
