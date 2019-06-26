
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('companies', tbl => {
        tbl
        .increments();
  
        tbl
        .string('name', 255)
        .unique()
        .notNullable();
    })

    .createTable('departments', tbl => {
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
    })

    .createTable('users', tbl => {
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
      .integer('account_type')
      .defaultTo(0);
    })

    .createTable('requests', tbl => {
      tbl
      .increments();

      tbl
      .integer('sender_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      tbl
      .integer('recipient_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      tbl
      .text('subject', 128)
      .notNullable(); 

      tbl.text('content')
      .notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('companies')
    .dropTableIfExists('departments')
    .dropTableIfExists('users')
    .dropTableIfExists('requests');
  };
