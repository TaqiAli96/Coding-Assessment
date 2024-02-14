export interface CartItem {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    cartQuantity: number;
    exists: boolean
}

export interface CartState {
    cartItems: CartItem[];
    cartTotalQuantity: number,
    cartTotalAmount: number,
    searchTerm?: string
}
