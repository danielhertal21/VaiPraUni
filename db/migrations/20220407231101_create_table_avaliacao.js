
exports.up = function(knex) {
    return knex.schema.createTable('avaliacao', table=>{
        table.integer('caronaId').unsigned().references('carona.id');
        table.integer('avaliacao');
        table.text('descricao');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('avaliacao');
};
