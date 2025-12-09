const pool = require('../config/db')
const { getRate } = require('./exchangeRateController');

const recordPayment = async (req, res) => {
    const client = await pool.connect();
    try {
        const { invoice_id, amount, currency, method, note } = req.body;

        if (!invoice_id || !amount) {
            return res.status(400).json({ message: "invoice_id and amount required" });
        }

        await client.query("BEGIN");

        let converted_amount = amount;

        if (currency !== 'USD') {
            const rate = await getRate(currency);
            if (!rate) return res.status(400).json({ message: "Exchange rate missing" });

            converted_amount = Number(amount) * Number(rate);
        }

        const newPayment = await client.query(
            `
            INSERT INTO payments (invoice_id, amount, currency, converted_amount, method, note)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *
            `,
            [invoice_id, amount, currency, converted_amount, method, note]
        );

        await client.query("COMMIT");
        res.status(201).json({ message: "Payment recorded", payment: newPayment.rows[0] });

    } catch (error) {
        await client.query("ROLLBACK");
        res.status(500).json({ message: error.message });
    } finally {
        client.release();
    }
};


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