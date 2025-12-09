const pool = require('../config/db')


const createInvoice = async (req ,res)=>{
    try {
        const {customer_id, vendor_id, project_id, amount , currency, converted_amount , due_date} = req.body 
        if(!amount || !customer_id){
            return res.status(400).json({message:'Amount and customer id are required'})
        }
        const result = await pool.query(
            `
            insert into invoices (customer_id, vendor_id, project_id, amount , currency, converted_amount , due_date)  values ($1,$2,$3,$4,$5,$6,$7) returning *
            `, [customer_id, vendor_id || null, project_id || null, amount , currency, converted_amount , due_date]
        )

        return res.status(200).json({message:'Invoices created successfully', invoice : result.rows[0]})
        
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const getInvoices = async (req, res)=>{
    try {
        const result = await pool.query(
            `select * from invoices order by id asc `
        )
        return res.status(200).json({message:'Invoices fetched successfully', invoices: result.rows})
        
    } catch (error) {
        return res.status(500).json({message:error.message || "Internal server error"})
    }
}

const getInvoicesById = async (req, res)=>{
    try {
        const {id} = req.params 
        const invoice = await pool.query(
            `select * from invoices where id = $1`, [id]
        )
        if(invoice.rows.length === 0){
            return res.status(404).json({message:'Invoice not found'})
        }

        const payments = await pool.query(
            `select  * from payments where invoice_id = $1`,[id]
        )
        return res.status(200).json({message:'Details fetched successfully', invoice:invoice.rows[0], payments:payments.rows})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports = {createInvoice, getInvoices, getInvoicesById}