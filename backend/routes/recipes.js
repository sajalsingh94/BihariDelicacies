const express = require('express');
const { allAsync, getAsync } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await allAsync('SELECT * FROM recipes ORDER BY created_at DESC');
    res.json({ recipes: rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      ingredients: JSON.parse(r.ingredients),
      steps: JSON.parse(r.steps),
      image_url: r.image_url,
      category: r.category,
    })) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const r = await getAsync('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    if (!r) return res.status(404).json({ error: 'Not found' });
    res.json({ recipe: {
      id: r.id,
      title: r.title,
      description: r.description,
      ingredients: JSON.parse(r.ingredients),
      steps: JSON.parse(r.steps),
      image_url: r.image_url,
      category: r.category,
    } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;