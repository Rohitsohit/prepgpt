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
        res.json(newUser[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}



export const signin=async (req,res)=>{
    try {
        const { username, password } = req.body;
        console.log(username,password)
        const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
        if (user.length === 0) return res.status(400).json({ message: 'User not found' });
    
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });
    
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}



