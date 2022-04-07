
exports.up = function(knex) {
    return knex.schema.createTable('usuario', table=>{
        table.increments('id');
        table.string('nome');
        table.string('cpf', 11).notNull().unique();
        table.string('whatsapp');
        table.string('email').unique();
        table.string('usuario').unique();
        table.string('senha');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuario');
};
