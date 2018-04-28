const knex = require('knex');

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];

/**
 * Fetch list of accounts from database and respond with an array of account
 * names.
 */
module.exports = async message => {
  const client = knex(connection);

  try {
    const records = await client('accounts').select('name');
    
    return records.map(record => record.name);
  } finally {
    client.destroy();
  }
};