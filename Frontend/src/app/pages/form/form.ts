import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {Transactions} from '../../core/services/transactions/transactions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  
  paymentForm: any;
  isLoading = false;

  constructor(private fb: FormBuilder, private transactionService: Transactions) {
    this.paymentForm = this.fb.group({
      divisa: ['COP', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      description: [''],
      name_user: ['', Validators.required],
      type_document: ['Cédula', Validators.required],
      num_card: ['', [Validators.required, this.cardNumberValidator]],
      card_expiration_date: ['', [Validators.required, this.expirationDateValidator]],
      code_card: ['', [Validators.required, this.securityCodeValidator]],
    });
  }

  /**
   * Validador para número de tarjeta, verifica formato y longitud
   * @param control AbstractControl
   * @returns ValidationErrors | null
   */
  
  cardNumberValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const cardNumber = control.value.replace(/\s/g, '');
    
    if (!/^\d+$/.test(cardNumber)) {
      return { invalidCardNumber: true };
    }
    
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return { invalidCardLength: true };
    }
    
    return null;
  }

  /**
   * Valida la fecha de vencimiento de la tarjeta en formato MM/AA
   * @param control AbstractControl
   * @returns ValidationErrors | null
   */

  expirationDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const value = control.value.replace(/\D/g, '');
    
    if (value.length !== 4) {
      return { invalidExpirationFormat: true };
    }
    
    const month = parseInt(value.substring(0, 2));
    const year = parseInt(value.substring(2, 4)) + 2000;
    
    if (month < 1 || month > 12) {
      return { invalidMonth: true };
    }
    
    const currentDate = new Date();
    const expirationDate = new Date(year, month - 1);
    
    if (expirationDate <= currentDate) {
      return { cardExpired: true };
    }
    
    return null;
  }

  /**
   * Valida el código de seguridad de la tarjeta (CVV/CVC)
   * @param control AbstractControl
   * @returns ValidationErrors | null
   */

  securityCodeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const code = control.value.replace(/\D/g, '');
    
    if (code.length < 3 || code.length > 4) {
      return { invalidSecurityCode: true };
    }
    
    return null;
  }

  /**
   * Formatea el número de tarjeta en bloques de 4 dígitos mientras se escribe
   * @param event event del input
   */

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length > 23) {
      formattedValue = formattedValue.substring(0, 23);
    }
    this.paymentForm.patchValue({ num_card: formattedValue });
  }

  /**
   * Formatea la fecha de vencimiento en formato MM/AA mientras se escribe
   * @param event event del input
   */
  
  formatExpirationDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.paymentForm.patchValue({ card_expiration_date: value });
  }

  /**
   * Formatea el código de seguridad en el input mientras se escribe
   * @param event event del input
   */

  formatSecurityCode(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    this.paymentForm.patchValue({ code_card: value });
  }

  /**
   * Construye la fecha de la transacción en formato legible
   * @returns string con la fecha formateada
   */

  private buildTransactionDate(): string {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours24 = now.getHours();
    const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    
    const hoursFormatted = String(hours12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hoursFormatted}:${minutes}:${seconds} ${ampm}`;
  }

  /**
   * Maneja el envío del formulario de pago, validando y utilizando el servicio Transactions
   */

  onSubmit() {
    this.isLoading = true;

    if (!this.paymentForm.valid) {
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.paymentForm.value.transaction_date = this.buildTransactionDate();
    this.transactionService.createTransaction(this.paymentForm.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Transacción creada con éxito',
          icon: 'success'
        });

        this.paymentForm.reset({
          divisa: 'COP',
          type_document: 'Cédula'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la transacción.',
          icon: 'error'
        })
        console.error('Error transacción:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
