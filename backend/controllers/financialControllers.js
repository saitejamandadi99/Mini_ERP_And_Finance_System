const pool = require('../config/db')

const getBalanceSheet = async (req , res)=>{
    try{
        const assets = await pool.query(

                `select name, balance from accounts where type='Asset' order by id`
        )

        const liabilities  = await pool.query(

                `select name, balance from accounts where type='Liability' order by id`
        )

        const equity  = await pool.query(

                `select name, balance from accounts where type='Equity' order by id`
        )

        const totalAssets = assets.rows.reduce((a,b)=>a+Number(b.balance),0)
        const totalLiabilities = liabilities .rows.reduce((a,b)=>a+Number(b.balance),0)
        const totalEquity = equity.rows.reduce((a,b)=>a+Number(b.balance),0)
        return res.status(200).json({
            assets: assets.rows, 
            liabilities: liabilities .rows,
            equities:equity.rows,
            total:{
                totalAssets,
                totalEquity,
                totalLiabilities,
                balanceCheck: totalAssets - (totalLiabilities+totalEquity)
            }
        })
    }
    catch(error){
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const getProfitAndLoss = async (req, res)=>{
    try {
        const revenues = await pool.query(
            `select name, balance from accounts where type = 'Revenue' order by id`
        )

        const expenses = await pool.query(
            `select name, balance from accounts where type = 'Expense' order by id`
        )

        const totalRevenue = revenues.rows.reduce((a,b)=>a+Number(b.balance),0)
        const totalExpense = expenses.rows.reduce((a,b)=>a+Number(b.balance),0)

        const netProfit = totalRevenue - totalExpense

        return res.status(200).json({
            revenues :revenues.rows,
            expenses:expenses.rows,
            total:{
                totalRevenue,
                totalExpense,
                netProfit
            }
        })

        
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const getCashFlowStatement = async (req, res)=>{
    try {
        const cashAccounts = await pool.query(
            `select name, balance from accounts where name Ilike '%cash%' OR name Ilike '%bank%'`
        )

        const totalCash = cashAccounts.rows.reduce((a,b)=>a+Number(b.balance),0)
        return res.status(200).json({
            cashAccounts:cashAccounts.rows,
            totalCash
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports = {getBalanceSheet, getProfitAndLoss, getCashFlowStatement}