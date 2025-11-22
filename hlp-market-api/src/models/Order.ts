export interface Order {
    customerId: number;
    items: {
        productId: number;
        quantity: number;
        unitPrice: number;
    }[];
}