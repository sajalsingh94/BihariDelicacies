const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const { initializeDatabase, db } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'bihari_delicacies_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// Static: uploaded images
app.use('/uploads', express.static(uploadsDir));

// API routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const recipeRoutes = require('./routes/recipes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/recipes', recipeRoutes);

// Serve frontend static files
const frontendDir = path.resolve(__dirname, '../frontend');
app.use(express.static(frontendDir));

// Serve index on root
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Let express.static handle other pages and assets

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Bihari Delicacies server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });