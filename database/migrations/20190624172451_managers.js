
exports.up = function(knex, Promise) {
    return knex.schema.createTable('managers', tbl => {
        tbl
        .increments();
  
        tbl
        .string('manager_name', 255);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('managers');
  };



//truncate