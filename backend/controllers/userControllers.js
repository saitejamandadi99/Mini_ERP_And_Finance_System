const pool = require('../config/db')

const getUsers = async (req , res)=>{
    try {
        const result = await pool.query(
            `
            select id, name, email,role_id from users 
            `
        )
        res.status(200).json({message:'User details fetched successfully', results: result.rows})
        
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const updateUserRole = async (req, res)=>{
    try {
        const {userId,role_id} = req.body 
        const userExists = await pool.query(`
            select email from users where id = $1            
            `, [userId])

        if(userExists.rows.length===0){
            return res.status(400).json({message:'user not found'})
        }
        const updateQuery = await pool.query(
            `
            update users set role_id = $1 where id = $2 returning id, name, email, role_id
            `,[role_id,userId]
        )
        return res.status(201).json({message:'User role updated successfully', user:updateQuery.rows[0]})
        
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}



const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params
        await pool.query(`
            delete from users where id = $1
            `,[id])
        return res.status(200).json({message:'user deleted successfully'})
        
    } catch (error) {
        return res.status(500).json({message:error.message|| 'Internal server error'})
    }

}

module.exports = {getUsers, updateUserRole, deleteUser}