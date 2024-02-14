import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ProductsState from '../interfaces/productsStateTypes';
import Product from '../interfaces/productTypes';

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;
export const selectProducts = (state: { products: ProductsState }) => state.products.data;
export const selectLoading = (state: { products: ProductsState }) => state.products.loading;
export const selectError = (state: { products: ProductsState }) => state.products.error;

export default productsSlice.reducer;