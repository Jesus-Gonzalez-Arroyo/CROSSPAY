import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction, TransactionResponse } from '../../models/transactions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Transactions {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createTransaction(infoPay: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, infoPay);
  }

  getTransactions(): Observable<TransactionResponse[]> {
  return this.http.get<TransactionResponse[]>(`${this.apiUrl}/transactions`);
}
}
