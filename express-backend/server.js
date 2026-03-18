const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Replace these with your actual WSO2 Consumer Key and Secret
const CONSUMER_KEY = 'DDZ2KbZihxEsW2w8tuBa1b9QEeEa';
const CONSUMER_SECRET = 'nYfiXuf9PCuEwkwR0OEshajIpqAa';

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping_db',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

// POST login - gets OAuth2 token from WSO2 (fixes CORS issue)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }
  try {
    const response = await axios.post(
      'https://localhost:9443/oauth2/token',
      new URLSearchParams({
        grant_type: 'password',
        username: username,
        password: password,
        scope: 'openid'
      }),
      {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    res.json({ success: true, token: response.data.access_token });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Login failed. Check credentials.' });
  }
});

// GET all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, data: results });
  });
});

// GET single product by ID
app.get('/products/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: results[0] });
  });
});

// POST add new product
app.post('/products', (req, res) => {
  const { name, price, stock, description } = req.body;
  if (!name || !price || !stock) {
    return res.status(400).json({ success: false, error: 'Name, price and stock are required' });
  }
  db.query(
    'INSERT INTO products (name, price, stock, description) VALUES (?, ?, ?, ?)',
    [name, price, stock, description],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.status(201).json({ success: true, id: result.insertId, message: 'Product added!' });
    }
  );
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted!' });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Express backend running at http://localhost:${PORT}`);
  console.log(`   Try: http://localhost:${PORT}/products`);
});