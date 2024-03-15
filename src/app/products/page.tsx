
"use client"
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundUp } from "react-icons/io";
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
    const [displayScroller, setDisplayScroller] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop } = document.documentElement;
            setDisplayScroller(scrollTop > window.innerHeight / 2);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let cancelTokenSource: CancelTokenSource | undefined;

        const getProducts = async () => {
            try {
                dispatch(setLoading());
                cancelTokenSource = axios.CancelToken.source();
                const response = await axios.get('https://fakestoreapi.com/products', {
                    cancelToken: cancelTokenSource.token,
                });
                setTimeout(() => {

                    dispatch(setProducts(response.data));
                }, 1000);
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
        return (<div className='loader'></div>)
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Fragment>
            <div className='sticky top-0  bg-[#f6f6f6]'>
                <Navbar />
            </div>
            <LayoutWrapper>
                <div className='flex flex-col'>
                    <ProductsListing products={products} />
                </div>
            </LayoutWrapper>
            {displayScroller && (
                <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
                    width: 50, height: 50, background: "#000",
                    borderRadius: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    bottom: 5,
                    right: 30,
                    cursor: 'pointer',
                    // opacity: 0
                }}>
                    <IoIosArrowRoundUp color='#fff' size={30} />
                </div>
            )}
        </Fragment >
    );
}