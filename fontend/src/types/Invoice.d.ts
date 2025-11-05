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

export type CustomerResponse = {
  id?: string;
  fullName?: string;
  birthdate?: string;
  gender?: string;
  address?: string;
};

export type InvoiceResponse = {
  id: string;
  userId?: string;
  bookingId?: string;
  dateOfTransaction?: string;
  paymentMethodId?: string;
  status?: string;
  message?: string;
  totalCountOfAdult?: string;
  totalCountOfChildren?: string;
  totalCountOfToddler?: string;
  totalCountOfInfant?: string;
  totalChargeOfAdult?: string;
  totalChargeOfChildren?: string;
  totalChargeOfToddler?: string;
  totalChargeOfInfant?: string;
  totalExtraFee?: string;
  totalBookingTourExpense?: string;
  paymentUrl?: string;
  customerResponseList?: CustomerResponse[];
};
