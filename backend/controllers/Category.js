const db = require('../config/db');

// 1. Get all Categories
exports.getCategories = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM categories");
        return res.status(200).json(rows);
    } catch (err) {
        console.error("Fetch Error:", err);
        return res.status(500).json({ message: "Server error while fetching categories" });
    }
};

// 2. Add a new Category
exports.addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }

    try {
        const q = "INSERT INTO categories (`name`) VALUES (?)";
        await db.query(q, [name]);
        return res.status(201).json({ message: "Category created successfully" });
    } catch (err) {
        // If the entry is a duplicate (Error Code 1062)
        if (err.errno === 1062) {
            return res.status(400).json({ message: "This category already exists!" });
        }
        console.error("Insert Error:", err);
        return res.status(500).json({ message: "Database error occurred" });
    }
};

// 3. Delete a Category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    
    try {
        const q = "DELETE FROM categories WHERE id = ?";
        const [result] = await db.query(q, [id]);

        // Check if anything was actually deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        return res.status(500).json({ message: "Error deleting category" });
    }
};