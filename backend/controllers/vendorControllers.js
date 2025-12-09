const pool = require('../config/db')

const  getVendors = async (req , res)=>{
    try {
        const result = await pool.query(
            `select * from vendors`
        )
        return res.status(200).json({message:'Vendors fetched successfully', vendors: result.rows})
    } catch (error) {
        return res.status(500).json({message:error.message || "Internal server error"})
    }
}

const createVendor = async(req, res)=>{
    try {
        const {name, email , phone, address} = req.body
        if(!name){
            return res.status(400).json({message:'Name is required'})
        }
        const result = await pool.query(
            `insert into vendors (name , email, phone, address) values ($1, $2,$3,$4) returning *`, [name, email, phone, address]
        )
        return res.status(200).json({message:'Vendor created successfully', vendor:result.rows[0]   })
    } catch (error) {
        return res.status(500).json({message:error.message || "Internal server error"})
    }
}

const updateVendor = async(req, res)=>{
    try {
        const {id} = req.params 
        const {name, email , phone, address} = req.body 
        const result = await pool.query(
            `update vendors set name=$1 , email=$2, phone=$3, address =$4 where id = $5 returning *`,[name, email, phone, address, id]
        )
        return res.status(200).json({message:'Vendors updated successfully' , vendor : result.rows[0]})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const deleteVendor = async (req, res)=>{
    try {
        const {id} = req.params 
        await pool.query(
            `delete from vendors where id = $1`,[id]
        )
        return res.status(200).json({message:'Vendor deleted successfully'})
        
    } catch (error) {
        return res.status(500).json({message:error.message || "Internal server error"})
    }
}


module.exports = {getVendors, createVendor, updateVendor, deleteVendor}