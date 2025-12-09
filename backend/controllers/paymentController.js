const pool = require('../config/db')

const recordPayment = async (req,res)=>{
    const client = await pool.connect()
    try {
        const {invoice_id, amount, currency, converted_amount, method, note } = req.body
        if(!invoice_id || !amount){
            return res.status(400).json({message: 'Amount and invoice_id are required'})
        }
        await client.query('BEGIN') 

        const invoiceResult = await client.query(`
            SELECT amount ,status from invoices where id =$1
            `,[invoice_id])
        if (invoiceResult.rows.length ===0){
            return res.status(404).json({message:'Invoice not found'})
        }
        const invoice = invoiceResult.rows[0]

        const paymentResult = await client.query(`
            SELECT COALESCE(SUM(converted_amount),0) as total_paid from payments where invoice_id =$1
            `,[invoice_id]) 
        const totalPaid = Number(paymentResult.rows[0].total_paid)  
        const outstanding = Number(invoice.amount) - totalPaid
        if(amount > outstanding){
            return res.status(400).json({message:'Payment exceed outstanding amount'})
        }

        const newPayment = await client.query(
            `insert into payments(invoice_id, amount, currency, converted_amount, method, note ) values ($1,$2,$3,$4,$5,$6) returning * `, [invoice_id, amount, currency || 'USD' , converted_amount || amount, method, note ]
        )
        const newTotalPaid = totalPaid + amount 
        let newStatus = 'Pending'
        if(newTotalPaid === Number(invoice.amount)) newStatus = 'Paid'
        else if (newTotalPaid > 0 ) newStatus ='Partially Paid'

        await client.query(
            `update invoices set status = $1 where id = $2`, [newStatus, invoice_id]
        )
        await client.query('COMMIT')

        return res.status(201).json({
            message:'Payment record success',
            payment: newPayment.rows[0],
            invoice_status: newStatus
        })
    } catch (error) {
        await client.query("ROLLBACK");
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
    finally{
        client.release()
    }
}

const getPaymentsForInvoice =  async (req, res)=>{
    try {
        const {invoice_id} = req.params
        const payments = await pool.query(
            `select * from payments where invoice_id = $1`,[invoice_id]
        )
        return res.status(200).json({message:'Fetched successfully', payments:payments.rows})
        
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports = {recordPayment, getPaymentsForInvoice}