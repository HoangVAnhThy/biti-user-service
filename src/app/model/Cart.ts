import { Product } from "./Product"
export interface Cart{
    product?: Product,
    quantity?:number,
    totalPrice?: number,
    totalPriceString?: string //For view
}