import express from 'express';
import cors from 'cors';
import path from 'path';
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import { fileURLToPath } from 'url';

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// DB connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('DB Connected'))
  .catch((e) => console.error('DB connection error:', e));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Dynamically import route files safely
const routesPath = path.join(__dirname, 'routes');
for (const file of readdirSync(routesPath)) {
  if (file.endsWith('.js')) {
    const routeModule = await import(path.join(routesPath, file));
    if (routeModule.default && typeof routeModule.default === 'function') {
      app.use('/api', routeModule.default);
    } else {
      console.warn(`⚠️ Skipped ${file} — no default Express router export`);
    }
  }
}

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
