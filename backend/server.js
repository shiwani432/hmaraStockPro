const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./config/db'); // Ek dot (.) rakha hai kyunki config folder backend ke andar hai
const productRoutes = require('./routes/productRoutes');

const app = express();

// CORS aur JSON setup
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

const SECRET_KEY = "my_super_secret_key_123";

// --- LOGIN API ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Database se user check kar rahe hain
        const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

        if (rows.length > 0) {
            const token = jwt.sign({ user: email }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// --- AUTO USER & TABLE SETUP ---
const setupUser = async () => {
  try {
    // 1. Users table banayega
    await db.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255))`);
    
    // 2. CATEGORIES TABLE BANAYEGA (Yeh line add ki hai taaki Render ka error khatam ho jaye)
    await db.query(`CREATE TABLE IF NOT EXISTS categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) UNIQUE)`);
    console.log("✅ Tables (users & categories) check ho gayi!");

    // 3. Check karega user hai ya nahi
    const [rows] = await db.query("SELECT * FROM users WHERE email = 'shiwani@gmail.com'");
    if (rows.length === 0) {
      // 4. User dalega
      await db.query("INSERT INTO users (email, password) VALUES ('shiwani@gmail.com', 'shiwani@123')");
      console.log("✅ User 'shiwani@gmail.com' database mein add ho gaya!");
    }
  } catch (err) { console.log("Setup Error: " + err.message); }
};
setupUser();

app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📂 Database path is: ./config/db`);
});