
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
        .string('email')
        .unique()
        .notNullable();

        tbl
        .string('title', 255);
        
        tbl
        .string('full_name', 255)
        .unique()
        .notNullable();
        
        tbl
        .integer('company_id', 255)
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        tbl
        .integer('manager_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        
        tbl
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        tbl
        .integer('account_type');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  