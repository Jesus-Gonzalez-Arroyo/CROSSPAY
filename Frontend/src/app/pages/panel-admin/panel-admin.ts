import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Transactions } from '../../core/services/transactions/transactions';
import { Transaction, TransactionResponse } from '../../core/models/transactions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin implements OnInit {
  transactions: TransactionResponse[] = [];
  loading = true;

  constructor(private transactionService: Transactions) { }

  /**
   * Inicializa el componente y carga las transacciones usando el servicio Transactions
   */

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data: TransactionResponse[]) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las transacciones.',
        });
        console.error('Error admin:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Formatea un monto
   * @param amount monto a formatear
   * @returns monto formateado
   */

  formatAmount(amount: string): string {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(parseFloat(amount));
  }
}
