const express = require('express');
const mysql = require('mysql');
const path = require('path'); // Import path module

const app = express();

// MySQL Connection
const connection = mysql.createConnection({
    host: 'mysql',
    user: 'myuser',
    password: 'mypassword',
    database: 'mydb'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS student (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      cgba FLOAT,
      age INT
    )
  `;
  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table: ' + err.stack);
      return;
    }
    console.log('Table created successfully');
  });
  const insertDataQuery = `
  INSERT INTO student (name, age,cgba)
  VALUES ('Ahmad', 21,4.0)
`;

connection.query(insertDataQuery, (err, result) => {
  if (err) {
    console.error('Error inserting data: ' + err.stack);
    return;
  }
  console.log('Starting data inserted successfully');
});
  
});
app.get('/data', (req, res) => {
    connection.query('SELECT * FROM student', (err, rows) => {
      if (err) {
        console.error('Error retrieving data: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(rows);
    });
  });
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});