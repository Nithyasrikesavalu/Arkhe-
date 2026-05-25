import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
// import inquiryRoutes from './routes/inquiryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Database Connection
const initApp = async () => {
  await connectDB();
};

initApp();

// Middleware Setup
// Configure CORS to allow only the Vercel frontend domain (and localhost for development)
const allowedOrigins = [
  'https://arkhe-nsqt.vercel.app',
  // Development origins – keep them while debugging locally
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, server‑to‑server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      const msg = 'CORS policy: Origin not allowed – ' + origin;
      return callback(new Error(msg), false);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Respond to preflight (OPTIONS) requests for all routes
app.options('*', cors({ origin: allowedOrigins, credentials: true }));

// Base Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ARKHE Luxury Real Estate API',
    database: global.isMongoConnected ? 'Connected' : 'Disconnected (Fallback Mode Active)',
    version: '1.0.0',
  });
});

// Health Check Route
app.get('/health', (req, res) => {
  const status = global.isMongoConnected ? 'Connected' : 'Disconnected';
  res.json({
    database: status,
    message: status === 'Connected' ? 'Database is connected' : 'Running in fallback mode (no DB connection)',
  });
});

// API Routes
// app.use('/api/inquiries', inquiryRoutes);
app.use('/api/contacts', contactRoutes);

// Error handling middleware – must be the last middleware added
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n\x1b[35m==================================================\x1b[0m`);
  console.log(`\x1b[1m\x1b[36mARKHE LUXURY REAL ESTATE API is running on port ${PORT}\x1b[0m`);
  console.log(`\x1b[35m==================================================\x1b[0m\n`);
});

