export interface Order {
  orderId?: string;
  customerId: string;
  customerName?: string;
  productId: string;
  orderDate?: Date;
  orderAmount: number;
  quantity: number;
  status?: string;
}
