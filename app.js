require('dotenv').config();
const express = require('express');
const mongoDB = require('./db/mongo');
const sqlModel = require('./models/ProductSQL');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/api', productRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 3000;

async function start() {
  await mongoDB.connect();
  await sqlModel.init();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
