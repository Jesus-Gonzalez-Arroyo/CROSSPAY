export interface Transaction {
  divisa: string;
  amount: string;
  description: string;
  name_user: string;
  type_document: string;
  transaction_date: string;
  num_card: string;
  card_expiration_date: string;
  code_card: string;
}

export interface TransactionResponse {
  id: string;
  divisa: string;
  amount: string;
  description: string;
  name_user: string;
  type_document: string;
  transaction_date: string;
}