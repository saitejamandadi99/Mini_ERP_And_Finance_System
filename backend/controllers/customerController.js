const pool = require('../config/db')

const getCustomers = async (req , res)=>{
    try {
        const result = await pool.query(
            `
            select * from Customers order by id asc
            `
        )
        return res.status(200).json({message:'Customers details fetched successfully', customers: result.rows})
    } catch (error) {
        return res.status(500).json({message:error.message||'Internal server error'})
    }
}

const createCustomer = async (req , res)=>{
    try {
        const {name, email, phone, address} = req.body
        if (!name){
            return res.status(400).json({message:'Name is required'})
        }
        const result = await pool.query(
            `insert into customers (name, email, phone , address) values ($1,$2,$3,$4) returning *`,[name, email, phone, address]
        )
        return res.status(200).json({message:"Customer created successfully", customer:result.rows[0]})
        
    } catch (error) {
         return res.status(500).json({message:error.message||'Internal server error'})
    }
}

const updateCustomer = async (req, res)=>{
    try {
        const {id} = req.params 
        const {name, email , phone, address} = req.body 
        const result = await pool.query(
            `update customers set name=$1, email = $2, phone =$3, address =$4 where id = $5 returning *`,[name, email, phone, address, id]
        )
        return res.status(200).json({message:'Customer updated successfully', customer:result.rows[0]})
        
    } catch (error) {
        return res.status(500).json({message:error.message||'Internal server error'})
    }
}

const deleteCustomer = async (req, res)=>{
    try {
        const {id} = req.params
        await pool.query(
            `delete from customers where id = $1`,[id]
        )
        return res.status(200).json({message:'Customer deleted successfully'})
    } catch (error) {
        return res.status(500).json({message:error.message||'Internal server error'})       
    }
}

module.exports = {getCustomers, createCustomer , updateCustomer, deleteCustomer}