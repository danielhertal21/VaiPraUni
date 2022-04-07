
exports.up = function(knex) {
    return knex.schema.createTable('vaiculo', table=>{
        table.increments('id');
        table.integer('usuarioId').unsigned().references('usuario.id');
        table.string('placa');
        table.string('cor');
        table.string('marca');
        table.string('modelo');
        table.integer('ano');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('veiculo');
};
