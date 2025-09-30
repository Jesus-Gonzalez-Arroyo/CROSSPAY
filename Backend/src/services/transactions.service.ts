import { pool } from '../config/db'
import { Transaction } from '../types/transactions.type'

export async function createTransaction(transaction: Transaction): Promise<number> {
    const {
        name_user, type_document, num_card, card_expiration_date, code_card,
        divisa, amount, description, transaction_date
    } = transaction

    const result = await pool.query(
        `INSERT INTO transactions 
    (name_user, type_document, num_card, card_expiration_date, code_card, divisa, amount, description, transaction_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
        [name_user, type_document, num_card, card_expiration_date, code_card, divisa, amount, description, transaction_date]
    )

    return result.rows[0]
}

export async function getAllTransactions(): Promise<Transaction[]> {
    const result = await pool.query(`
    SELECT id, divisa, amount, description, name_user, type_document, transaction_date
    FROM transactions
    ORDER BY transaction_date DESC
  `)

    return result.rows
}
