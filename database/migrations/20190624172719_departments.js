
exports.up = function(knex, Promise) {
    return knex.schema.createTable('departments', tbl => {
        tbl
        .increments();

        tbl
        .string('name', 255)
        .notNullable();

        tbl
        .integer('company_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  
        tbl
        .integer('department_head')
        .notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('departments');
  };
  