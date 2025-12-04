import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from './config.js';
import { router } from './routes.js';
import { authMiddleware, createCorsMiddleware, loggerMiddleware } from './middleware.js';
import cors from 'cors'; 
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Wellness & Preventive Care API' });
});

app.use('/api', router);

// Basic protected ping for testing tokens
app.get('/api/secure-ping', authMiddleware, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
});

mongoose
  .connect("mongodb+srv://rahulkumareee21_db_user:gW1ScaYtgd72ltWy@cluster0.lnq6mxv.mongodb.net/?appName=Cluster0")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });




