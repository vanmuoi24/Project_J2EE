export type InvoiceItem = {
  name: string;
  dob?: string;
  price: number;
};

export type InvoiceRequest = {
  bookingId: string;
  paymentMethod: string;
  items: InvoiceItem[];
};

export type InvoiceResponse = {
  code: number;
  message?: string;
  result?: {
    id: string;
    bookingId?: string;
    amount?: number;
    paymentMethod?: string;
    createdAt?: string;
  } | null;
};
