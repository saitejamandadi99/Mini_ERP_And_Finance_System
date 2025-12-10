const pool = require('../config/db')

const getRiskScore = async (req , res)=>{
    try {

        //over due invoices 
        const overdue  = await pool.query(`
        SELECT SUM(i.amount - COALESCE(p.total_paid,0)) AS overdue_amount
        FROM invoices i 
        LEFT JOIN (
                SELECT invoice_id, SUM(converted_amount) AS total_paid
                FROM payments GROUP BY invoice_id
        ) p ON i.id = p.invoice_id
        WHERE i.status IN ('Pending', 'Partially Paid')
        AND i.due_date < CURRENT_DATE;
            `)

        const overdueAmount = Number(overdue.rows[0].overdue_amount || 0)

        //receivable total outstanding customer invoices
        const receivables = await pool.query(`
        SELECT SUM(i.amount - COALESCE(p.total_paid,0)) as receivable from invoices i 
        left join (
                select invoice_id , sum(converted_amount) as total_paid from payments group by invoice_id
        ) p on i.id = p.invoice_id 
         where i.customer_id is not null            
            `)
        const receivableAmount  = Number(receivables.rows[0].receivable  || 0)

        //payables (vendors outstanding)
        const payables= await pool.query(`
            select sum(i.amount - COALESCE(p.total_paid,0)) as payable from invoices i 
            left join (
                select invoice_id , sum(converted_amount) as total_paid 
                from payments group by invoice_id 
            ) p on i.id = p.invoice_id
             where i.vendor_id is not null;
            `)
        const payableAmount = Number(payables.rows[0].payable || 0)

        //cash balance => assets containing cash or bank
        const cash = await pool.query(`
            select sum(balance) as cash_total from accounts where name  
            ILIKE '%cash%' or name ILIKE '%bank%' 
            `)
        const cashBalance = Number(cash.rows[0].cash_total || 0)

        let score = 0
        if(overdueAmount > 0) score += 20;
        if(overdueAmount > 5000) score += 20
        if(overdueAmount > 20000) score += 30
            //high -> risky
        if (receivableAmount > 20000)score += 10
        //high -> risky payables 
        if (payableAmount > 15000) score += 15 

        //lowcash -> high risky 
        if (cashBalance < 5000) score += 20
        else if (cashBalance < 1000) score += 40 

        if (score > 100) score = 100

        return res.status(200).json({
            risk_score : score, 
            data:{
                overdueAmount, 
                receivableAmount, 
                payableAmount,
                cashBalance
            }
        })

    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports = {getRiskScore}