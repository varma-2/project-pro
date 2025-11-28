
const express = require('express');
const cors = require('cors');

console.log(' Starting server.js...');

const app = express();

require('./db');

const employeesRouter = require('./routes/employees');
const tasksRouter = require('./routes/tasks');

app.use(cors({
  origin: [
    'https://project-pro-21.vercel.app', // Your actual frontend URL
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:1234'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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


app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Employee Task Management API'
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Employees endpoint: /employees`);
  console.log(` Tasks endpoint: /tasks`);
  console.log(` Health check: /health`);
});
