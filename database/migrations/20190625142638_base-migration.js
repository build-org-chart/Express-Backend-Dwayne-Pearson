exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("companies", tbl => {
      tbl.increments();
      tbl.text("name").notNullable();
    })
    .createTable("departments", tbl => {
      tbl.increments();
      tbl.text("name").notNullable();
      tbl
        .integer("company_id")
        .references("id")
        .inTable("companies")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl //this is where the problem lies...
        .integer("department_head")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("users", tbl => {
      tbl.increments();

      tbl
        .string("username", 255)
        .notNullable()
        .unique();

      tbl.string("full_name", 255).notNullable();

      tbl
        .string("email", 255)
        .notNullable()
        .unique();

      tbl.string("password", 255).notNullable();

      tbl.string("title", 255).notNullable();

      tbl
        .integer("company_id")
        .references("id")
        .inTable("departments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("manager_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("department_id")
        .references("id") // issue here
        .inTable("departments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("account_type")
        .notNullable()
        .defaultTo(0);
    })
    .createTable("requests", tbl => {
      tbl.increments();

      tbl
        .integer("sender_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();

      tbl
        .integer("recipient_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();

      tbl.text("subject").notNullable();
      tbl.text("content").notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("companies")
    .dropTableIfExists("departments")
    .dropTableIfExists("users")
    .dropTableIfExists("requests");
};
