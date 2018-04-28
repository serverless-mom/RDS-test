// knex.js doesn't do upserts natively, so use raw INSERT IGNORE query string
exports.seed = knex => knex.raw("INSERT IGNORE INTO accounts (name) VALUES ('Stackery')");