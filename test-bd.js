const mysql = require('mysql2/promise');
async function testConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  console.log('Conexión exitosa');
  await connection.end();
}
testConnection().catch(console.error);