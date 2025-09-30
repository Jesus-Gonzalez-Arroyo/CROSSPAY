import { Request, Response } from 'express'
import { createTransaction, getAllTransactions } from '../services/transactions.service'
import { Transaction } from '../types/transactions.type'

export async function createTransactionHandler(req: Request, res: Response) {
  try {
    const transaction: Transaction = req.body
    
    if (transaction.amount) {
      if (typeof transaction.amount === 'string') {
        const cleanAmount = transaction.amount.replace(/\./g, '')
        transaction.amount = cleanAmount
      }
      
      if (transaction.amount as number <= 0) {
        return res.status(400).json({ 
          error: 'El monto debe ser mayor a 0', 
          status: 400 
        })
      }
    }
    
    const createdTransaction = await createTransaction(transaction)
    res.status(201).json({ message: 'Transacción registrada', createdTransaction })
  } catch (error) {
    console.error('Error crear transacción:', error)
    res.status(500).json({ error: 'Error al registrar transacción', status: 500 })
  }
}

export async function getTransactionsHandler(_req: Request, res: Response) {
  try {
    const transactions = await getAllTransactions()
    res.json(transactions)
  } catch (error) {
    console.error('Error obtener transacciones:', error)
    res.status(500).json({ error: 'Error al obtener transacciones', status: 500 })
  }
}
