
exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', tbl => {
      tbl.integer('sender_id')
      .notNullable();

      tbl
      .integer('recipient_id')
      .notNullable();

      tbl
      .string('subject', 128)
      .notNullable(); 

      tbl.string('content')
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('requests');
};
