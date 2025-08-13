const express = require('express');
const multer = require('multer');
const path = require('path');
const { runAsync, allAsync, getAsync } = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_.]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { featured, category } = req.query;
    let query = 'SELECT p.*, u.name as seller_name FROM products p JOIN users u ON p.user_id = u.id';
    const where = [];
    const params = [];
    if (featured === '1' || featured === 'true') {
      where.push('p.featured = 1');
    }
    if (category) {
      where.push('p.category = ?');
      params.push(category);
    }
    if (where.length > 0) {
      query += ' WHERE ' + where.join(' AND ');
    }
    query += ' ORDER BY p.created_at DESC';

    const rows = await allAsync(query, params);
    res.json({ products: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Specific summary routes BEFORE param routes
router.get('/summary/categories', async (req, res) => {
  try {
    const rows = await allAsync(
      'SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY category'
    );
    res.json({ categories: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/by-category', async (req, res) => {
  try {
    const rows = await allAsync(
      'SELECT p.*, u.name as seller_name FROM products p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC'
    );
    const grouped = {};
    for (const r of rows) {
      if (!grouped[r.category]) grouped[r.category] = [];
      grouped[r.category].push(r);
    }
    res.json({ grouped });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id (place AFTER specific routes)
router.get('/:id', async (req, res) => {
  try {
    const product = await getAsync(
      'SELECT p.*, u.name as seller_name, u.email as seller_email FROM products p JOIN users u ON p.user_id = u.id WHERE p.id = ?',
      [req.params.id]
    );
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/products (authenticated)
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: 'Name, description, price, and category are required.' });
    }

    const priceNumber = Number(price);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      return res.status(400).json({ error: 'Price must be a non-negative number.' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await runAsync(
      `INSERT INTO products (user_id, name, description, price, category, image_path, featured) VALUES (?, ?, ?, ?, ?, ?, 0)`,
      [req.session.userId, name, description, priceNumber, category, imagePath]
    );

    const product = await getAsync('SELECT * FROM products WHERE id = ?', [result.lastID]);
    res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;