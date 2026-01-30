const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: '103.195.101.224',
      port: 3306,
      user: 'nyxara_admin',
      password: 'Nyxara2024!',
      database: 'nyxara'
    });
    
    console.log('✅ Conexión exitosa a MySQL');
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('Resultado de consulta:', rows);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

testConnection();