const pool = require('../config/db')

const getAccounts = async (req , res)=>{
    try {
        const result = await pool.query(`
                select * from accounts order by id asc;
            `)
        return res.status(200).json({message:'Accounts details fetched successfully', accounts: result.rows})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const createAccount = async (req , res)=>{
    try {
        const {name, type} = req.body
        if(!name || !type){
            return res.status(400).json({message:'All fields are required'})
        }
        const result = await pool.query(`
                insert into accounts (name, type) values($1,$2) returning *
            `,[name, type])
        return res.status(201).json({message:"Account created successfully", account: result.rows[0]})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
} 

const updateAccount = async (req, res)=>{
    try {
        const {id} = req.params
        const {name, type}= req.body 
        if(!id || !name || !type){
            return res.status(400).json({message:'All fields are required'})
        }        
        const result = await pool.query(`
            update accounts set name = $1, type=$2 where id = $3 returning *
            `,[name, type,id])
        
            return res.status(200).json({message:'Account updated', account:result.rows[0]})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
        
    }
}


const deleteAccount = async (req, res)=>{
    try {
        const {id} = req.params
        await pool.query(`
            delete from accounts where id =$1
            `,[id])
        return res.status(200).json({message:'Account deleted successfully'})
    } catch (error) {
         return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports = {getAccounts, createAccount, updateAccount, deleteAccount}