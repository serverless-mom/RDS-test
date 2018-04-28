const knex = require('knex');
const clone = require('clone');
const cfnCR = require('cfn-custom-resource');

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];

module.exports = async event => {
  if (event.RequestType !== 'Create') {
    return cfnCR.sendSuccess('seed', {}, event);
  }

  await createDatabase();

  const client = knex(connection);

  try {
    await migrate(client);
    await seed(client);
  } catch (err) {
    console.error(err.stack);
    
    await cfnCR.sendFailure(err.message, event);
  } finally {
    client.destroy();
  }

  await cfnCR.sendSuccess('seed', {}, event);
};

/**
 * knex.js doesn't easily support creating the initial DB within the server.
 * Connect without the database param, then perform a raw SQL query to create
 * the initial DB. Catch errors to see if they simply complain about the DB
 * already existing.
 */
const createDatabase = async () => {
  const connectionWithoutDB = clone(connection);
  const database = connectionWithoutDB.connection.database;

  delete connectionWithoutDB.connection.database;

  const client = knex(connectionWithoutDB);

  try {
    console.log(`Creating database '${database}'...`)
    
    await client.raw(`CREATE DATABASE ${database}`);

    console.log('Done');
  } catch (err) {
    if (err.code !== 'ER_DB_CREATE_EXISTS') {
      err.message = `Failed to create database '${database}': ${err.message}`;
      throw err;
    }

    console.log('Done (Database already exists)');
  } finally {
    await client.destroy();
  }
};

const migrate = async client => {
  console.log('Performing migrations...');

  await client.migrate.latest();

  console.log('Done');
};

const seed = async client => {
  console.log('Seeding database...');

  await client.seed.run();

  console.log('Done');
};