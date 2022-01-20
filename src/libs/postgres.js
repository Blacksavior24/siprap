const { Client} = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'ward',
    password: 'admin123',
    database: 'sismarket'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
