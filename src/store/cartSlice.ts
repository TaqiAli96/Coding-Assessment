
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import { RootState } from './store';
import { CartItem, CartState } from '@/interfaces/cartItemTypes';

const storedCartItems = sessionStorage.getItem("cartItems");
const initialState: CartState = {
    cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    searchTerm: ""
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, { payload }: PayloadAction<CartItem>) => {
            const index = state.cartItems.findIndex(
                (product) => product.id === payload.id
            );
            if (index >= 0) {
                state.cartItems[index].exists = true;

            } else {
                const tempProduct = { ...payload };
                state.cartItems.push(tempProduct);

            }
            sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },

        removefromCart: (state, { payload }: PayloadAction<CartItem>) => {
            const Index = !!state.cartItems && state.cartItems?.findIndex(
                (product) => product.id === payload.id
            );
            if (Index > -1) {
                state.cartItems.splice(Index, 1);
            }
        },

        updateCartTotalQuantity: (state) => {
            const totalQuantity = state.cartItems.reduce(
                (acc, cartItem) => acc + cartItem.cartQuantity,
                0
            );
            state.cartTotalQuantity = totalQuantity;
        },

        getTotals: (state) => {
            const grandTotal = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            const { total, quantity } = grandTotal;
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },


        increasedQuantity: (state, { payload }) => {
            const Index = state.cartItems.findIndex(
                (product) => product.id === payload.id
            );
            if (Index > -1) {
                if (state.cartItems[Index].cartQuantity >= 1) {
                    state.cartItems[Index].cartQuantity += 1;
                }
                toast.success(`${payload.title.slice(0, 10)} quantity increased`, {
                    position: "bottom-left",
                    autoClose: 800,
                });
            }
            sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decreasedQuantity: (state, { payload }) => {

            const Index = state.cartItems.findIndex(
                (product) => product.id === payload.id
            );

            if (state.cartItems[Index].cartQuantity > 1) {
                state.cartItems[Index].cartQuantity -= 1;

                toast.error(`${payload.title.slice(0, 10)} quantity decreased`, {
                    position: "bottom-left",
                    autoClose: 800,
                });

            } else if (state.cartItems[Index].cartQuantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (product) => product.id !== payload.id
                );

            }

            sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        setSearchItem: (state, { payload }) => {
            state.searchTerm = payload
        }
    },
});
export const { addToCart, getTotals, removefromCart, increasedQuantity, decreasedQuantity, setSearchItem } = cartSlice.actions;
export const cartItems = (state: RootState) => state.cart.cartItems;
export const cartTotalQuantity = (state: RootState) => state.cart.cartTotalQuantity;
export const cartTotalAmount = (state: RootState) => state.cart.cartTotalAmount;
export const searchTerm = (state: RootState) => state.cart.searchTerm





export default cartSlice.reducer;
