require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user:'root',
  password: process.env.DB_PASSWORD || '',
  database:'test',
  waitForConnections: true,
  connectionLimit: 10,
  idleTimeout: 60000,
});



app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM student'); 
    res.send(rows);
  } catch (err) {
    console.error('Query Error:', err);
    res.status(500).send('internal server error');
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
