import { createSlice } from "@reduxjs/toolkit";

const initialState =JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
     name: 'cart',
     initialState,
     reducers:{
        addToCart(state, action){
            state.push(action.payload)
            // console.log(addToCart);
            //console.log("New cart state after adding:", state);
        },

        // addToCart(state, action) {
        //     const existingItem = state.find(item => item.id === action.payload.id);
        //     if (!existingItem) {
        //       state.push(action.payload);
        //     }
        //   },
        removeFromCart(state, action){
            return state.filter(item => item.id !== action.payload.id);
        },
        setCart(state, action) {
            return action.payload;
        }
        
     }
})
export const {addToCart,removeFromCart,setCart} = cartSlice.actions
export default cartSlice.reducer