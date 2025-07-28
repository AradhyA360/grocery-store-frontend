export interface Customer {
  customerId?: string;
  fullName: string;
  email: string;
  password?: string;
  address: string;
  contactNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
