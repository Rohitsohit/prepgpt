import { pool } from './Model/UserTable.js';

const alterTableCommands = [
  'select * from users'
];

async function executeAlterTableCommands() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    for (const command of alterTableCommands) {
      const [results] = await connection.query(command);
      console.log('SQL command executed successfully', results);
    }
  } catch (err) {
    console.error('Error executing the SQL commands:', err);
  } finally {
    if (connection) {
      await connection.release();
      console.log('Connection closed');
    }
  }
}

executeAlterTableCommands();
