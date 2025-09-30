export interface Transaction {
  id?: number;
  divisa: string;
  amount: number | string;
  description: string;
  name_user: string;
  type_document: string;
  num_card: string;
  card_expiration_date: Date;
  code_card: string;
  transaction_date?: Date;
}
