import { OrderItem } from "./OrderItem";

export interface Order {
  id: string;
  customer_id: string;
  items: OrderItem[];
  price:number;
  qty:number;
  total_price: number;
  created_at:string;
}