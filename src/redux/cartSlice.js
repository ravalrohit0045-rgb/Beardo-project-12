import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        addToCart: (state, action) => {

            const existingItem = state.cartItems.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                });

            }

        },

        removeFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter(
                item => item.id !== action.payload
            );

        },

        increaseQty: (state, action) => {

            const item = state.cartItems.find(
                item => item.id === action.payload
            );

            if (item) {

                item.quantity++;

            }

        },

        decreaseQty: (state, action) => {

            const item = state.cartItems.find(
                item => item.id === action.payload
            );

            if (item) {

                if (item.quantity > 1) {

                    item.quantity--;

                } else {

                    state.cartItems = state.cartItems.filter(
                        p => p.id !== action.payload
                    );

                }

            }

        },

        clearCart: (state) => {

            state.cartItems = [];

        }

    }

});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;