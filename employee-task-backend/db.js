
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

console.log('📁 Initializing SQLite...');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(' Error opening database:', err.message);
  } else {
    console.log(' Connected to SQLite database at', dbPath);
  }
});

db.serialize(() => {
  console.log('🛠 Creating employees table if not exists...');
  db.run(
    `
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'ACTIVE',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) {
        console.error(' Error creating employees table:', err.message);
      } else {
        console.log(' Employees table ready');
        
        db.get('SELECT COUNT(*) as count FROM employees', (err, row) => {
          if (!err && row.count === 0) {
            console.log('📝 Inserting sample employees...');
            db.run(`INSERT INTO employees (name, email, role, status) VALUES 
              ('John Doe', 'john.doe@company.com', 'Software Engineer', 'ACTIVE'),
              ('Jane Smith', 'jane.smith@company.com', 'Product Manager', 'ACTIVE'),
              ('Mike Johnson', 'mike.johnson@company.com', 'Designer', 'INACTIVE')`, 
              (err) => {
                if (err) {
                  console.error(' Error inserting sample employees:', err.message);
                } else {
                  console.log(' Sample employees inserted');
                }
              }
            );
          }
        });
      }
    }
  );

  console.log('🛠 Creating tasks table if not exists...');
  db.run(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'TODO',
      priority TEXT NOT NULL DEFAULT 'MEDIUM',
      due_date TEXT,
      employee_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE SET NULL
    )
  `,
    (err) => {
      if (err) {
        console.error(' Error creating tasks table:', err.message);
      } else {
        console.log(' Tasks table ready');
        
        // Insert sample tasks if table is empty
        db.get('SELECT COUNT(*) as count FROM tasks', (err, row) => {
          if (!err && row.count === 0) {
            console.log(' Inserting sample tasks...');
            db.run(`INSERT INTO tasks (title, description, status, priority, due_date, employee_id) VALUES 
              ('Implement user authentication', 'Add login and signup functionality', 'IN_PROGRESS', 'HIGH', '2024-02-15', 1),
              ('Design dashboard UI', 'Create modern dashboard design', 'TODO', 'MEDIUM', '2024-02-20', 3),
              ('API documentation', 'Document all backend endpoints', 'DONE', 'LOW', '2024-02-10', 2)`, 
              (err) => {
                if (err) {
                  console.error(' Error inserting sample tasks:', err.message);
                } else {
                  console.log(' Sample tasks inserted');
                }
              }
            );
          }
        });
      }
    }
  );
});

// Add error handling for database operations
db.on('error', (err) => {
  console.error(' Database error:', err.message);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log(' Closing database connection...');
  db.close((err) => {
    if (err) {
      console.error(' Error closing database:', err.message);
    } else {
      console.log(' Database connection closed');
    }
    process.exit(0);
  });
});

module.exports = db;
