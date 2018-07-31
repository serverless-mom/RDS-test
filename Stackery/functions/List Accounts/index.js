const knex = require('knex');

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];

//var iopipe = require('@iopipe/iopipe')({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNTIzMmYwZi0yYmIxLTQzZTEtOTljZC1kMmJhNDc2ZWJmOTEiLCJqdGkiOiJjZGVmMmQ3NC1iOGYzLTQzYzgtOTBkNS0yMWNlNzg2NTFhM2QiLCJpYXQiOjE1MzMwNjEzOTMsImlzcyI6Imh0dHBzOi8vaW9waXBlLmNvbSIsImF1ZCI6Imh0dHBzOi8vaW9waXBlLmNvbSxodHRwczovL21ldHJpY3MtYXBpLmlvcGlwZS5jb20vZXZlbnQvLGh0dHBzOi8vZ3JhcGhxbC5pb3BpcGUuY29tIn0.UvWdEuZA8PI2eZmIiJ9YzpkUtzooCR0v1P9iTp61Gas" });
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