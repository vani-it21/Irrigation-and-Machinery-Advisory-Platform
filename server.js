const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const cron = require("node-cron"); // To schedule tasks
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");

  // Create the `schedules` table if it doesn't exist
  const createSchedulesTable = `CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vegetable_name VARCHAR(255),
    date DATE,
    time_in_hrs FLOAT,
    part INT,
    email_id VARCHAR(255),
    farmer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  db.query(createSchedulesTable, (err) => {
    if (err) throw err;
    console.log("Schedules table ready");
  });
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vani.it21@bitsathy.ac.in", // Your Gmail address
    pass: "mtyw wfxy rlty drin", // Replace with the App Password generated from Google
  },
  secure: false, // Set to true if using port 465, otherwise set to false for port 587
  tls: {
    rejectUnauthorized: false, // Ignores the self-signed certificate error
  },
});

// Function to send email
const sendEmail = (email, scheduleDetails) => {
  const mailOptions = {
    from: "vani.it21@bitsathy.ac.in",
    to: email,
    subject: "irrigation of today -reg",
    text: `A schedule has been created:\n\n${scheduleDetails}`,
  };

  return transporter.sendMail(mailOptions);
};

// Sign-up route
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (`username`, `phone_no`, `aadhar_no`, `farmers_id`, `email_id`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.phone_no,
    req.body.aadhar_no,
    req.body.farmers_id,
    req.body.email_id,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.status(500).json("Error");
    }
    return res.status(201).json(data);
  });
});

// Login route
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email_id`=? AND `farmers_id` = ? AND `phone_no` = ?";

  db.query(sql, [req.body.email_id, req.body.farmers_id, req.body.phone_no], (err, data) => {
    if (err) {
      return res.status(500).json("Error");
    }
    if (data.length > 0) {
      console.log("Success");
      return res.status(200).json("Success");
    } else {
      console.log("Failed");
      return res.status(401).json("Failed");
    }
  });
});

// Route to store schedule in the database
app.post('/api/schedules', async (req, res) => {
  const { name, rows, email_id, farmer_id } = req.body; // Include farmer_id
  console.log("Data received: ", req.body);

  if (!name || !rows || rows.length === 0 || !email_id || !farmer_id) {
    return res.status(400).json({ message: 'Invalid schedule data' });
  }

  const insertScheduleQuery = "INSERT INTO schedules (vegetable_name, date, time_in_hrs, part, email_id, farmer_id) VALUES (?, ?, ?, ?, ?, ?)";
  const updateScheduleQuery = "UPDATE schedules SET time_in_hrs = ?, part = ? WHERE vegetable_name = ? AND date = ? AND email_id = ? AND farmer_id = ?";

  const insertPromises = rows.map(async (row) => {
    const values = [name, row.date, row.timeinHrs, row.part, email_id, farmer_id];

    const checkQuery = "SELECT * FROM schedules WHERE vegetable_name = ? AND date = ? AND email_id = ? AND farmer_id = ?";
    const existingSchedule = await new Promise((resolve, reject) => {
      db.query(checkQuery, [name, row.date, email_id, farmer_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (existingSchedule.length > 0) {
      return new Promise((resolve, reject) => {
        db.query(updateScheduleQuery, [row.timeinHrs, row.part, name, row.date, email_id, farmer_id], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        db.query(insertScheduleQuery, values, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  });

  try {
    await Promise.all(insertPromises);
    res.status(200).json({ message: 'Schedules stored/updated successfully' });
  } catch (err) {
    console.error('Error during schedule storage:', err);
    res.status(500).json({ message: 'Failed to store/update schedules' });
  }
});

// Scheduled task to run at 4 AM every day
// This will run the task every minute
cron.schedule('30 10 * * *', async () => {
  console.log("Running scheduled task every minute for testing...");

  // The rest of your code remains the same
  const today = new Date().toISOString().slice(0, 10);
  const scheduleQuery = "SELECT * FROM schedules WHERE date = ? ORDER BY date";

  try {
    const todaySchedules = await new Promise((resolve, reject) => {
      db.query(scheduleQuery, [today], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (todaySchedules.length > 0) {
      const emailPromises = todaySchedules.map((schedule) => {
        const scheduleDetails = `Date: ${schedule.date}, Vegetable: ${schedule.vegetable_name}, Time in Hrs: ${schedule.time_in_hrs}, Part: ${schedule.part}`;
        return sendEmail(schedule.email_id, scheduleDetails);
      });

      await Promise.all(emailPromises);

      // Delete the sent schedules
      const deletePromises = todaySchedules.map((schedule) => {
        return new Promise((resolve, reject) => {
          db.query("DELETE FROM schedules WHERE id = ?", [schedule.id], (err) => {
            if (err) return reject(err);
            resolve();
          });
        });
      });

      await Promise.all(deletePromises);
      console.log("Emails sent and schedules deleted.");
    } else {
      console.log("No schedules for today.");
    }
  } catch (err) {
    console.error("Error during scheduled task:", err);
  }
});
// Create the `machinery` table if it doesn't exist
const createMachineryTable = `CREATE TABLE IF NOT EXISTS machinery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  operation VARCHAR(255),
  machinery VARCHAR(255),
  date DATE,
  email_id VARCHAR(255),
  farmer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(createMachineryTable, (err) => {
  if (err) throw err;
  console.log("Machinery table ready");
});

// Route to store machinery schedules in the database
app.post('/api/machinery', async (req, res) => {
  const { rows, email_id, farmer_id } = req.body;

  if (!rows || rows.length === 0 || !email_id || !farmer_id) {
    return res.status(400).json({ message: 'Invalid machinery data' });
  }

  const insertMachineryQuery = "INSERT INTO machinery (operation, machinery, date, email_id, farmer_id) VALUES (?, ?, ?, ?, ?)";
  const updateMachineryQuery = "UPDATE machinery SET operation = ?, machinery = ? WHERE date = ? AND email_id = ? AND farmer_id = ?";

  const insertPromises = rows.map(async (row) => {
    const values = [row.operation, row.machinery, row.date, email_id, farmer_id];

    const checkQuery = "SELECT * FROM machinery WHERE date = ? AND email_id = ? AND farmer_id = ?";
    const existingMachinery = await new Promise((resolve, reject) => {
      db.query(checkQuery, [row.date, email_id, farmer_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (existingMachinery.length > 0) {
      return new Promise((resolve, reject) => {
        db.query(updateMachineryQuery, [row.operation, row.machinery, row.date, email_id, farmer_id], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        db.query(insertMachineryQuery, values, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  });

  try {
    await Promise.all(insertPromises);
    res.status(200).json({ message: 'Machinery schedules stored/updated successfully' });
  } catch (err) {
    console.error('Error during machinery storage:', err);
    res.status(500).json({ message: 'Failed to store/update machinery schedules' });
  }
});

// Scheduled task for machinery notifications
cron.schedule('30 10 * * *', async () => {
  const today = new Date().toISOString().slice(0, 10);
  const machineryQuery = "SELECT * FROM machinery WHERE date = ? ORDER BY date";

  try {
    const todayMachinery = await new Promise((resolve, reject) => {
      db.query(machineryQuery, [today], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (todayMachinery.length > 0) {
      const emailPromises = todayMachinery.map((machinery) => {
        const machineryDetails = `Date: ${machinery.date}, Operation: ${machinery.operation}, Machinery: ${machinery.machinery}`;
        return sendEmail(machinery.email_id, machineryDetails);
      });

      await Promise.all(emailPromises);

      // Delete the sent machinery schedules
      const deletePromises = todayMachinery.map((machinery) => {
        return new Promise((resolve, reject) => {
          db.query("DELETE FROM machinery WHERE id = ?", [machinery.id], (err) => {
            if (err) return reject(err);
            resolve();
          });
        });
      });

      await Promise.all(deletePromises);
      console.log("Emails sent and machinery schedules deleted.");
    } else {
      console.log("No machinery schedules for today.");
    }
  } catch (err) {
    console.error("Error during scheduled machinery task:", err);
  }
});


// Start the server
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});





/*const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const cron = require("node-cron"); // To schedule tasks
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");

  // Create the `schedules` table if it doesn't exist
  const createSchedulesTable = `CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vegetable_name VARCHAR(255),
    date DATE,
    time_in_hrs FLOAT,
    part INT,
    email_id VARCHAR(255),
    farmer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  db.query(createSchedulesTable, (err) => {
    if (err) throw err;
    console.log("Schedules table ready");
  });
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vani.it21@bitsathy.ac.in", // Your Gmail address
    pass: "mtyw wfxy rlty drin", // Replace with the App Password generated from Google
  },
  secure: false, // Set to true if using port 465, otherwise set to false for port 587
  tls: {
    rejectUnauthorized: false, // Ignores the self-signed certificate error
  },
});

// Function to send email
const sendEmail = (email, scheduleDetails) => {
  const mailOptions = {
    from: "vani.it21@bitsathy.ac.in",
    to: email,
    subject: "irrigation of today -reg",
    text: `A schedule has been created:\n\n${scheduleDetails}`,
  };

  return transporter.sendMail(mailOptions);
};

// Sign-up route
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (`username`, `phone_no`, `aadhar_no`, `farmers_id`, `email_id`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.phone_no,
    req.body.aadhar_no,
    req.body.farmers_id,
    req.body.email_id,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.status(500).json("Error");
    }
    return res.status(201).json(data);
  });
});

// Login route
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email_id`=? AND `farmers_id` = ? AND `phone_no` = ?";

  db.query(sql, [req.body.email_id, req.body.farmers_id, req.body.phone_no], (err, data) => {
    if (err) {
      return res.status(500).json("Error");
    }
    if (data.length > 0) {
      console.log("Success");
      return res.status(200).json("Success");
    } else {
      console.log("Failed");
      return res.status(401).json("Failed");
    }
  });
});

// Route to store schedule in the database
app.post('/api/schedules', async (req, res) => {
  const { name, rows, email_id, farmer_id } = req.body; // Include farmer_id
  console.log("Data received: ", req.body);

  if (!name || !rows || rows.length === 0 || !email_id || !farmer_id) {
    return res.status(400).json({ message: 'Invalid schedule data' });
  }

  const insertScheduleQuery = "INSERT INTO schedules (vegetable_name, date, time_in_hrs, part, email_id, farmer_id) VALUES (?, ?, ?, ?, ?, ?)";
  const updateScheduleQuery = "UPDATE schedules SET time_in_hrs = ?, part = ? WHERE vegetable_name = ? AND date = ? AND email_id = ? AND farmer_id = ?";

  const insertPromises = rows.map(async (row) => {
    const values = [name, row.date, row.timeinHrs, row.part, email_id, farmer_id];

    const checkQuery = "SELECT * FROM schedules WHERE vegetable_name = ? AND date = ? AND email_id = ? AND farmer_id = ?";
    const existingSchedule = await new Promise((resolve, reject) => {
      db.query(checkQuery, [name, row.date, email_id, farmer_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (existingSchedule.length > 0) {
      return new Promise((resolve, reject) => {
        db.query(updateScheduleQuery, [row.timeinHrs, row.part, name, row.date, email_id, farmer_id], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        db.query(insertScheduleQuery, values, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  });

  try {
    await Promise.all(insertPromises);
    res.status(200).json({ message: 'Schedules stored/updated successfully' });
  } catch (err) {
    console.error('Error during schedule storage:', err);
    res.status(500).json({ message: 'Failed to store/update schedules' });
  }
});

// Scheduled task to run at 4 AM every day
// This will run the task every minute
cron.schedule('30 10 * * *', async () => {
  console.log("Running scheduled task every minute for testing...");

  // The rest of your code remains the same
  const today = new Date().toISOString().slice(0, 10);
  const scheduleQuery = "SELECT * FROM schedules WHERE date = ? ORDER BY date";

  try {
    const todaySchedules = await new Promise((resolve, reject) => {
      db.query(scheduleQuery, [today], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (todaySchedules.length > 0) {
      const emailPromises = todaySchedules.map((schedule) => {
        const scheduleDetails = `Date: ${schedule.date}, Vegetable: ${schedule.vegetable_name}, Time in Hrs: ${schedule.time_in_hrs}, Part: ${schedule.part}`;
        return sendEmail(schedule.email_id, scheduleDetails);
      });

      await Promise.all(emailPromises);

      // Delete the sent schedules
      const deletePromises = todaySchedules.map((schedule) => {
        return new Promise((resolve, reject) => {
          db.query("DELETE FROM schedules WHERE id = ?", [schedule.id], (err) => {
            if (err) return reject(err);
            resolve();
          });
        });
      });

      await Promise.all(deletePromises);
      console.log("Emails sent and schedules deleted.");
    } else {
      console.log("No schedules for today.");
    }
  } catch (err) {
    console.error("Error during scheduled task:", err);
  }
});


// Start the server
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
*/