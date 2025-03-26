module.exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex.schema.createTable("todoitems", function (table) {
        table.increments("id").primary();
        table.integer("userid").notNullable().references("id").inTable("users").onDelete("CASCADE");
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.boolean("marked").defaultTo(false);
        table.boolean("isdeleted").defaultTo(false);
      });
    });
};

module.exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("todoitems")
    .then(() => knex.schema.dropTableIfExists("users"));
};
