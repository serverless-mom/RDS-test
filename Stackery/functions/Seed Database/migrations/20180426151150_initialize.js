exports.up = knex => knex.schema.createTable('accounts', table => {
  table.increments();
  table.string('name').notNull().unique();
});

exports.down = knex => knex.schema.dropTable('accounts');