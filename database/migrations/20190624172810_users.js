
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl
        .increments();
  
        tbl
        .string('username', 255)
        .notNullable()
        .unique()
  
        tbl
        .string('password', 255)
        .notNullable();
  
        tbl
        .string('company', 255);
        
        tbl
        .string('full_name', 255)
        .unique()
        .notNullable();
  
        tbl
        .string('title', 255)
        .notNullable();
  
        tbl
        .string('department')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  