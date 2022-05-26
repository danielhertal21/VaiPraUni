
exports.up = function(knex) {
    return knex.schema.createTable('veiculo', table=>{
        table.increments('id');
        table.integer('usuarioId').unsigned().references('usuario.id');
        table.string('placa');
        table.string('cor');
        table.string('marca');
        table.string('modelo');
        table.integer('ano');
        table.boolean('ativo').defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('veiculo');
};
