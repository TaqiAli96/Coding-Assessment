
"use client"
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError, selectProducts, selectLoading, selectError } from '../../store/productSlice';
import axios, { CancelTokenSource } from 'axios';
import Navbar from '../components/Navbar';
import ProductsListing from '../components/ProductsListing';
import LayoutWrapper from '../LayoutWrapper';



export default function Products() {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        let cancelTokenSource: CancelTokenSource | undefined;

        const getProducts = async () => {
            try {
                dispatch(setLoading());
                cancelTokenSource = axios.CancelToken.source();
                const response = await axios.get('https://fakestoreapi.com/products', {
                    cancelToken: cancelTokenSource.token,
                });

                dispatch(setProducts(response.data));
            } catch (error: any) {
                if (axios.isCancel(error)) {
                    return;
                }
                dispatch(setError(error.message || 'Error fetching products'));
            }
        };

        getProducts();
        return () => {
            if (cancelTokenSource) {
                cancelTokenSource.cancel('Component unmounted. Cancelling request.');
            }
        };
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Fragment>
        <LayoutWrapper>
            <div className='flex flex-col'>
                <Navbar />
                <ProductsListing products={products} />
            </div>
        </LayoutWrapper>
        </Fragment>
    );
}