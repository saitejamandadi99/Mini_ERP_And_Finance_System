const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req , res)=>{
    try {
        const {name, email,password, role_id} = req.body

        if(!name || !email ||!password || !role_id){
            return res.status(400).json({message:'All fields are required.'})
        }

        const existingUser = await pool.query(`select * from users where email = $1`, [email]); 

        if(existingUser.rows.length > 0){
            return res.status(400).json({message:'Email already exists'})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await pool.query(
            `insert into users (name, email, password_hash, role_id)
              values ($1, $2, $3, $4) returning id, name, email , role_id
            `,[name, email, hashedPassword, role_id]
        )

        return res.status(201).json({message:'User created successfully', user:newUser.rows[0]})
        
    } catch (error) {
        return res.status(500).json({message:error.message||'Internal server error'})
    }
}

const loginUser = async (req, res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message:'All fields are required'})
        }

        const existingUser = await pool.query(
            `select * from users where email = $1`,[email]
        )
        const user = existingUser.rows[0]
        if(!user){
            return res.status(400).json({message:'User does not exists'})
        }
        
        const  isPasswordMatch = await bcrypt.compare(password, user.password_hash )
        if(!isPasswordMatch){
            return res.status(400).json({message:'Invalid Password or email'})
        }

        const token = jwt.sign(
            {
                id:user.id, role_id:user.role_id
            }, 
            process.env.JWT_SECRET, 
            {expiresIn:'8d'}
        )
        return res.status(200).json({message:'User logged in successfully', token: token, user:{id:user.id, name:user.name, email:user.email, role_id:user.role_id}})

    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports={registerUser, loginUser}