import { pool } from './Model/UserTable.js';

const sqlCommands = [
  `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS quizzes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(255) NOT NULL,
      question TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
  );`
];

async function executeAlterTableCommands() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    for (const command of sqlCommands) {
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
