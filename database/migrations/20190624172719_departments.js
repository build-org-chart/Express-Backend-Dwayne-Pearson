
exports.up = function(knex, Promise) {
    return knex.schema.createTable('departments', tbl => {
        tbl
        .increments();
  
        tbl
        .string('department_head')
        .unique()
        .notNullable();
  
        tbl
        .string('manager', 255)
        .unsigned()
        .references('id')
        .inTable('managers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('departments');
  };
  