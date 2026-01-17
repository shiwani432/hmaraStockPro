const db = require('../config/db');

exports.getProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        const sql = 'INSERT INTO products (name, category, price, quantity) VALUES (?, ?, ?, ?)';
        await db.query(sql, [name, category || 'General', price, quantity]);
        res.status(201).json({ message: "Product added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: "Deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Yahan category extract kar rahe hain
        const { name, category, price, quantity } = req.body; 
        // SQL mein category column ko include kiya
        await db.query(
            'UPDATE products SET name = ?, category = ?, price = ?, quantity = ? WHERE id = ?',
            [name, category || 'General', price, quantity, id]
        );
        res.json({ message: "Updated!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};