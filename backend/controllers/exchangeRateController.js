const pool = require('../config/db')

const addExchangeRates = async (req , res)=>{
    try {
        const {base_currency , target_currency , rate} = req.body
        if(!target_currency || !rate){
            return res.status(400).json({message:'target_currency and rate are required'})
        }
        const result = await pool.query(`
        INSERT INTO exchange_rates (base_currency, target_currency, rate)
        values($1,$2,$3) on conflict (base_currency, target_currency, date) do update set rate = excluded.rate returning * 
        `, [base_currency, target_currency, rate])
        return res.status(200).json({message:'Rate stored', rate: result.rows[0]})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const getRate = async (target_currency) => {
    const result = await pool.query(`
        SELECT rate FROM exchange_rates
        WHERE target_currency = $1
        ORDER BY date DESC
        LIMIT 1
    `, [target_currency]);

    return result.rows.length ? result.rows[0].rate : null;
};


module.exports = {addExchangeRates, getRate}