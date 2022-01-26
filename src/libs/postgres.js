const { Client} = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'arte',
    password: 'admin123',
    database: 'siprap'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
