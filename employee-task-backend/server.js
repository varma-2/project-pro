// server.js
const express = require('express');
const cors = require('cors');

console.log('🚀 Starting server.js...');

const app = express();

// runs db.js and creates DB + tables
require('./db');

const employeesRouter = require('./routes/employees');
const tasksRouter = require('./routes/tasks');

// Update CORS for production
app.use(cors({
  origin: [
    'https://your-frontend-app.vercel.app', // Your frontend URL
    'http://localhost:3000' // For local development
  ],
  credentials: true
}));

app.use(express.json());

app.use('/employees', employeesRouter);
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Employee & Task API is running',
    endpoints: {
      employees: '/employees',
      tasks: '/tasks'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Employee Task Management API'
  });
});

// Use Vercel's port or default to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📊 Employees endpoint: /employees`);
  console.log(`📋 Tasks endpoint: /tasks`);
  console.log(`❤️ Health check: /health`);
});