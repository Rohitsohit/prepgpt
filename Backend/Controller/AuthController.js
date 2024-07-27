import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../Model/UserTable.js";


export const signup= async(req,res)=>{
    try {
        const { username, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password,7);
    
        const [result] = await pool.query(
          'INSERT INTO users (username, password) VALUES (?, ?)',
          [username, hashedPassword]
        );
    
        const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
        console.log(newUser)
        res.json(newUser[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}



export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (rows.length === 0) return res.status(400).json({ message: 'User not found' });
    
    const user = rows[0]; // Extract the first user from the result
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username }); // Include the username in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}




