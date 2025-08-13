const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbFilePath = path.resolve(__dirname, 'data.sqlite');
const db = new sqlite3.Database(dbFilePath);

function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this); // this.lastID, this.changes
    });
  });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function initializeDatabase() {
  await runAsync('PRAGMA foreign_keys = ON;');

  await runAsync(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`);

  await runAsync(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image_path TEXT,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`);

  await runAsync(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    steps TEXT NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`);

  // Seed recipes if empty
  const recipeCount = await getAsync('SELECT COUNT(*) as count FROM recipes');
  if (!recipeCount || recipeCount.count === 0) {
    const seedRecipes = [
      {
        title: 'Litti Chokha',
        description: 'Roasted wheat balls stuffed with spiced sattu, served with mashed vegetables.',
        ingredients: JSON.stringify([
          '2 cups whole wheat flour',
          '1 cup sattu (roasted gram flour)',
          '2 tbsp mustard oil',
          '1 onion, finely chopped',
          '2 green chilies, chopped',
          'Salt, to taste',
        ]),
        steps: JSON.stringify([
          'Prepare stuffing with sattu, mustard oil, onion, chilies, salt.',
          'Knead flour with water into a firm dough. Stuff and shape balls.',
          'Roast over charcoal or bake at 200°C until cooked.',
          'Serve hot with chokha (mashed roasted eggplant, tomato, potato).',
        ]),
        image_url: 'https://images.unsplash.com/photo-1620460000000-000000000000?auto=format&fit=crop&w=800&q=60',
        category: 'Savouries',
      },
      {
        title: 'Thekua',
        description: 'Traditional deep-fried sweet made with whole wheat flour and jaggery.',
        ingredients: JSON.stringify([
          '2 cups whole wheat flour',
          '1 cup jaggery, melted',
          '2 tbsp ghee',
          'Fennel seeds, cardamom powder',
        ]),
        steps: JSON.stringify([
          'Mix flour with ghee and spices. Add jaggery syrup to form dough.',
          'Shape into discs and deep fry until golden brown.',
        ]),
        image_url: 'https://images.unsplash.com/photo-1617196037091-6a788f15b780?auto=format&fit=crop&w=800&q=60',
        category: 'Sweets',
      },
      {
        title: 'Khaja',
        description: 'Layered crispy sweet pastry soaked in sugar syrup.',
        ingredients: JSON.stringify([
          '2 cups refined flour',
          'Ghee for shortening',
          'Sugar syrup flavored with cardamom',
        ]),
        steps: JSON.stringify([
          'Make layered dough sheets with ghee. Roll, fold, and cut.',
          'Deep fry until crisp and soak in warm sugar syrup.',
        ]),
        image_url: 'https://images.unsplash.com/photo-1514512364185-4c2bcd0b9d2e?auto=format&fit=crop&w=800&q=60',
        category: 'Sweets',
      },
      {
        title: 'Sattu Sharbat',
        description: 'Cooling drink made with roasted gram flour, lemon, and spices.',
        ingredients: JSON.stringify([
          '4 tbsp sattu (roasted gram flour)',
          '1 lemon',
          'Black salt, roasted cumin, mint',
          'Chilled water',
        ]),
        steps: JSON.stringify([
          'Mix sattu with water, lemon juice, black salt, and cumin.',
          'Add ice and garnish with mint leaves.',
        ]),
        image_url: 'https://images.unsplash.com/photo-1546177461-98e9e76366e5?auto=format&fit=crop&w=800&q=60',
        category: 'Beverages',
      },
      {
        title: 'Anarsa',
        description: 'Rice flour and jaggery dough fried into crisp sweet discs.',
        ingredients: JSON.stringify([
          '2 cups rice flour',
          '1 cup jaggery',
          'Poppy seeds and ghee',
        ]),
        steps: JSON.stringify([
          'Mix rice flour with jaggery to form dough; rest overnight.',
          'Coat with poppy seeds and fry on low heat until golden.',
        ]),
        image_url: 'https://images.unsplash.com/photo-1604908554049-f053d5de0261?auto=format&fit=crop&w=800&q=60',
        category: 'Sweets',
      },
    ];

    for (const r of seedRecipes) {
      await runAsync(
        `INSERT INTO recipes (title, description, ingredients, steps, image_url, category) VALUES (?, ?, ?, ?, ?, ?)`,
        [r.title, r.description, r.ingredients, r.steps, r.image_url, r.category]
      );
    }
  }

  // Seed demo user/products if none
  const productCount = await getAsync('SELECT COUNT(*) as count FROM products');
  if (!productCount || productCount.count === 0) {
    const existingUser = await getAsync('SELECT id FROM users WHERE email = ?', ['demo@biharidelicacies.local']);
    let demoUserId;
    if (existingUser) {
      demoUserId = existingUser.id;
    } else {
      const hash = await bcrypt.hash('password123', 10);
      const inserted = await runAsync(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        ['Demo Seller', 'demo@biharidelicacies.local', hash]
      );
      demoUserId = inserted.lastID;
    }

    const demoProducts = [
      {
        name: 'Litti Chokha Platter',
        description: 'Authentic litti chokha with desi ghee, served hot.',
        price: 120,
        category: 'Savouries',
        image_path: null,
        featured: 1,
      },
      {
        name: 'Thekua (Box of 10)',
        description: 'Crunchy and flavorful thekua made with jaggery.',
        price: 150,
        category: 'Sweets',
        image_path: null,
        featured: 1,
      },
    ];

    for (const p of demoProducts) {
      await runAsync(
        'INSERT INTO products (user_id, name, description, price, category, image_path, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [demoUserId, p.name, p.description, p.price, p.category, p.image_path, p.featured]
      );
    }
  }
}

module.exports = {
  db,
  runAsync,
  getAsync,
  allAsync,
  initializeDatabase,
};