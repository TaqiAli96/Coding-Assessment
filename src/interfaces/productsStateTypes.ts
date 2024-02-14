import Product from "./productTypes";

interface ProductsState {
    data: Product[];
    loading: boolean;
    error: string | null;
}
export default ProductsState