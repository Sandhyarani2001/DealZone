import { createSlice } from "@reduxjs/toolkit";
import {  collection, deleteDoc, doc, query, where, getDocs, addDoc  } from 'firebase/firestore'
import {fireDB} from '../firebase/FirebaseConfig'

// original


// const userData = JSON.parse(localStorage.getItem('user'))



// // add to cart
// const add = async (action) => {
//     const item = { ...action.payload,email: userData?.user?.email}
//     try {
//         const itemRef = collection(fireDB, 'cart')
//         await addDoc(itemRef, item)
//     }
//     catch (error) {
//         console.log(error);
//     }
// }



//updated

const getUserData = () => JSON.parse(localStorage.getItem('user')) || {};

// Add to cart function
const add = async (action) => {
    const userData = getUserData();
    const email = userData?.user?.email;

    // Ensure email is valid before proceeding
    if (!email) {
        console.error("User email is undefined. Cannot add to cart.");
        return;
    }

    const item = { ...action.payload, email };
    try {
        const itemRef = collection(fireDB, 'cart');
        await addDoc(itemRef, item);
    } catch (error) {
        console.log(error);
    }
};




// delete from cart
// const removeItem = async (action) => {
//     try{
//         await deleteDoc(doc(fireDB, 'cart', action.payload.id))
//       }
//       catch(error){
//         console.log(error);
//       }
// }




const removeItem = async (itemId) => {
    try {
        console.log("Attempting to delete item with ID:", itemId);

        // Query Firestore to find the document with the matching itemId
        const q = query(collection(fireDB, 'cart'), where("id", "==", itemId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((document) => {
            const docId = document.id; // This is the Firestore Document ID
            deleteDoc(doc(fireDB, 'cart', docId)); // Delete the document using its Firestore Document ID
            console.log("Item successfully deleted with Firestore Document ID:", docId);
        });

        if (querySnapshot.empty) {
            console.log("No matching document found!");
        }
    } catch (error) {
        console.log("Error deleting item:", error);
    }
};








const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
// const initialState = [];



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state,action){
            localStorage.setItem('cart', JSON.stringify(action.payload));
            return action.payload
        },
        
        // addToCart(state, action) {
        //     // state.push({...action.payload,email: userData.user.email})
        //     state.push({...action.payload,email: userData?.user?.email})
        //     add(action)
        //     localStorage.setItem('cart', JSON.stringify(state));
        //     console.log(userData?.user?.email);
        // },


        addToCart(state, action) {
            const userData = getUserData();
            const email = userData?.user?.email;

            if (!email) {
                console.error("User email is undefined. Cannot add to cart.");
                return state;
            }

            state.push({ ...action.payload, email });
            add(action);
            localStorage.setItem('cart', JSON.stringify(state)); // Update local storage
            console.log(userData?.user?.email);
        },


        // removeFromCart(state, action) {
        //     const itemId = action.payload.id;
        //     console.log("Removing item with ID:", itemId);
        //     removeItem(itemId);  // Removing item from Firestore
        //     return state.filter(item => item.id !== itemId);
            
        // }


        removeFromCart(state, action) {
            const itemId = action.payload.id;
            console.log("Removing item with ID:", itemId);
            removeItem(itemId); // Remove item from Firestore
            const updatedState = state.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(updatedState)); // Update local storage
            return updatedState;
        }


        
        
        
    }

    
})

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;




