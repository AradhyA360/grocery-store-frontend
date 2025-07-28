export interface Product {
  productId?: string;
  productName: string;
  price: number;
  quantity: number;
  reserved?: number;
  customerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
