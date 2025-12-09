const pool = require('../config/db')
const {getRate} = require('./exchangeRateController')

const createInvoice = async (req ,res)=>{
    try {
        const {customer_id, vendor_id, project_id, amount , currency , due_date} = req.body 
        if(!amount || !customer_id){
            return res.status(400).json({message:'Amount and customer id are required'})
        }

        let converted_amount = amount 
        
        if(currency !== "USD"){
            const rate = await getRate(currency)
            if(!rate) return res.status(400).json({message:'Exchange rate not found'})
            
            converted_amount = Number(amount) * Number(rate)
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

const  getDueInvoices = async (req, res)=>{
    try {
        const result = await pool.query(
            `
            SELECT 
                i.*,
                (
                    i.amount - COALESCE(
                        (SELECT SUM(p.converted_amount) 
                        FROM payments p 
                        WHERE p.invoice_id = i.id), 
                    0)
                ) AS outstanding_amount
            FROM invoices i
            WHERE 
                (i.status = 'Pending' OR i.status = 'Partially Paid')
                AND i.due_date < CURRENT_DATE
            ORDER BY i.due_date ASC;
            `
        )
        return res.status(200).json({message:'Due Invoices Fetched successfully', due_invoices: result.rows})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const getReceivableSummary = async (req, res)=>{
    try {
        const result = await pool.query(`
            SELECT 
                c.id AS customer_id,
                c.name AS customer_name,
                SUM(i.amount - COALESCE(p.total_paid, 0)) AS receivable_amount
            FROM customers c
            LEFT JOIN invoices i ON c.id = i.customer_id
            LEFT JOIN (
                SELECT invoice_id, SUM(converted_amount) AS total_paid 
                FROM payments GROUP BY invoice_id
            ) p ON i.id = p.invoice_id
            WHERE i.status IN ('Pending', 'Partially Paid')
            GROUP BY c.id, c.name
            ORDER BY receivable_amount DESC;
        `);

        return res.status(200).json({
            message: "Receivable summary generated",
            receivables: result.rows
        });
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const getPayableSummary = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                v.id AS vendor_id,
                v.name AS vendor_name,
                SUM(i.amount - COALESCE(p.total_paid, 0)) AS payable_amount
            FROM vendors v
            LEFT JOIN invoices i ON v.id = i.vendor_id
            LEFT JOIN (
                SELECT invoice_id, SUM(converted_amount) AS total_paid 
                FROM payments GROUP BY invoice_id
            ) p ON i.id = p.invoice_id
            WHERE i.status IN ('Pending', 'Partially Paid')
            GROUP BY v.id, v.name
            ORDER BY payable_amount DESC;
        `);

        return res.status(200).json({
            message: "Payable summary generated",
            payables: result.rows
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {createInvoice, getInvoices, getInvoicesById, getDueInvoices, getReceivableSummary , getPayableSummary}