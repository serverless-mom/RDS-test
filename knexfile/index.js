let host;

// Grab host from Stackery environment info if available
if (process.env.STACKERY_PORTS) {
  const dbInfo = JSON.parse(process.env.STACKERY_PORTS)[0][0];

  host = dbInfo.address;
}

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'mySecretPW',
      database: 'accounts'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host,
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'accounts'
    }
  }
};
