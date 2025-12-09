const pool = require('../config/db')

const createJournalEntry = async ( req , res)=>{
    const client = await pool.connect()
    try {
        const {description, lines} = req.body
        if(!description || !lines ||lines.length<2){
            return res.status(400).json({message:'description and 2 lines are required'})
        }
        let totalDebit=0,totalCredit =0
        lines.forEach(line=>{
            totalDebit+=Number(line.debit || 0)
            totalCredit += Number(line.credit || 0)
        })
        if (totalCredit !== totalDebit){
            return res.status(400).json({message:'Debits and Credits must balance'})
        }
        await client.query("BEGIN")

        const jeResult = await client.query(
            `INSERT INTO journal_entries (description, status)
            VALUES ($1, 'Pending') returning *`,[description]
        )
        const journalEntryId = jeResult.rows[0].id

        for (const line of lines){
            await client.query(
                `
                INSERT INTO journal_entry_lines (journal_id, account_id, debit, credit)
                VALUES ($1,$2,$3,$4)
                `,[journalEntryId, line.account_id, line.debit || 0 , line.credit || 0]

            )
        }

        await client.query("COMMIT")
        return res.status(201).json({message:"Journal Entry Created", journal_entry:{id:journalEntryId, description, status:'Pending', lines}})
    } catch (error) {
        await client.query("ROLLBACK")
        return res.status(500).json({message:error.message || 'Internal server error '})
    }
    finally{
        client.release()
    }
}

const approveJournalEntry = async (req, res) => {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        // Check JE exists
        const je = await client.query(
            `SELECT * FROM journal_entries WHERE id = $1`,
            [id]
        );

        if (je.rows.length === 0) {
            return res.status(404).json({ message: "Journal Entry not found" });
        }

        if (je.rows[0].status === "Approved") {
            return res.status(400).json({ message: "Already approved" });
        }

        // Get journal entry lines
        const lines = await client.query(
            `SELECT * FROM journal_entry_lines WHERE journal_id = $1`,
            [id]
        );

        await client.query("BEGIN");

        // Auto-update account balances based on account type
        for (const line of lines.rows) {
            const account = await client.query(
                `SELECT type, balance FROM accounts WHERE id = $1`,
                [line.account_id]
            );

            const type = account.rows[0].type;
            let balance = Number(account.rows[0].balance);

            // Apply debit/credit rules
            if (line.debit > 0) {
                if (type === "Asset" || type === "Expense"){ 
                    balance += line.debit
                }
                else{
                    balance -= line.debit
                } 
            }

            if (line.credit > 0) {
                if (type === "Asset" || type === "Expense") {
                    balance -= line.credit
                }
                else{
                    balance += line.credit;
                }
            }

            // Update account balance
            await client.query(
                `UPDATE accounts SET balance = $1 WHERE id = $2`,
                [balance, line.account_id]
            );
        }

        // Mark JE as approved
        await client.query(
            `UPDATE journal_entries SET status = 'Approved' WHERE id = $1`,
            [id]
        );

        await client.query("COMMIT");

        return res.status(200).json({
            message: "Journal Entry Approved and Posted to Ledger"
        });

    } catch (error) {
        await client.query("ROLLBACK");
        return res.status(500).json({ message: error.message });
    } finally {
        client.release();
    }
};



//GET ALL JOURNAL ENTRIES
const getJournalEntries = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM journal_entries ORDER BY date DESC
        `);

        return res.status(200).json(result.rows);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {createJournalEntry,approveJournalEntry,getJournalEntries};