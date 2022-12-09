import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

export const fetchAllProducts=createAsyncThunk('products/fetchAll',async()=>{
    const response=await fetch('https://fakestoreapi.com/products')
    return await response.json();
})


const productsSlice=createSlice({
    name:"products",
    initialState:{
        value:[],
        loading:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.value=action.payload;
        })
    }
})

export default productsSlice.reducer;