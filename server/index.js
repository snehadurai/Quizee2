const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRouter = require('./routes/userRoute');
const quizRouter = require('./routes/quizRoute');
const analyticsRoute = require('./routes/analyticsRoute');

const app = express();
const PORT = 3000;

// Ensure critical environment variables are defined
if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined in the environment variables');
    process.exit(1);
}

app.use(cors({
    origin: 'http://localhost:5174', // Update this to the URL of your frontend
    credentials: true, // This is important if you're making requests with credentials (like cookies)
  }));
  

// Explicitly handle OPTIONS requests to avoid CORS preflight issues
app.options('*', cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter);
app.use('/api', quizRouter);
app.use('/api', analyticsRoute);

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Graceful shutdown on process termination
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected on app termination');
    process.exit(0);
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("working condition");
  });
  
  app.use("*", (req, res) => {
    res.status(404).json({
      message: 'Endpoint not found',
      status: 'Error',
    });
  });