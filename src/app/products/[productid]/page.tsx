"use client"
import React from 'react';
import { selectProducts } from '@/store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import LayoutWrapper from '@/app/LayoutWrapper';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import { CartItem } from '@/interfaces/cartItemTypes';
import { addToCart, cartItems, removefromCart } from '@/store/cartSlice';


const Product = ({ params }: {
    params: {
        productid: number; id: number
    }
}) => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const paramsId = params.productid && parseInt(String(params.productid), 10);
    const selectedProduct = !!products && products.find((product) => product.id === paramsId);

    if (!selectedProduct) {
        return (
            <LayoutWrapper>
                <Navbar />
                <div className='w-[65rem] m-auto mt-10'>
                    <Link href={`/`}>
                        <div className='font-Montserrat font-light'>Back</div>
                    </Link>
                    <div className='mt-7'>Product not found.</div>
                </div>
            </LayoutWrapper>
        );
    }

    const { id, category, description, image, price, title } = selectedProduct;
    const CartItems = useSelector(cartItems)
    const updateCart = (product: CartItem) => {
        const productExists = !!CartItems && CartItems.find((item) => item.id === product.id)
        if (!productExists) {
            dispatch(addToCart(product));
            toast.success(`Item Added in to the cart`, {
                position: "bottom-left",
                autoClose: 800,
            });
        } else {
            dispatch(removefromCart(product))
            toast.error(`Item removed from the cart`, {
                position: "bottom-left",
                autoClose: 800,
            });
        }
    };

    return (
        <LayoutWrapper>
            <Navbar />
            <div className='w-[70rem]  m-auto mt-10'>
                <Link href={`/`}>
                    <div className='font-Montserrat font-light my-16'>Back</div>
                </Link>
                <div className='flex gap-20 h-[450px]'>
                    <div className='w-[400px]'>
                        <img src={image} className='w-full h-full' />
                    </div>
                    <div className='w-1/2 flex flex-col h-[450px'>
                        <div className='font-Montserrat font-bold text-3xl h-[6rem]'>{title}</div>
                        <div className='flex flex-col'>
                            <div className='text-Gray font-Montserrat font-thin mt-4 mb-1'>Category</div>
                            <div>{category}</div>
                            <div className='text-Gray font-Montserrat mt-4 font-light mb-1'>Description</div>
                            <div className='font-normal overflow-auto h-[6em] '>{description}</div>
                            <div className='text-Gray font-Montserrat mt-4 font-light mb-1'>Price</div>
                            <div className='font-bold'>${price}</div>
                            <div className='mt-auto'></div>
                            {CartItems.find((item) => item.id === id) ? (
                                <button className="flex items-center bg-LightCoral border-black border-1 text-DarkCandyAppleRed py-5 rounded-lg justify-center  w-full mt-5" onClick={() => updateCart({
                                    id, category, description, image, price, title,
                                    cartQuantity: 1, exists: false
                                })}>
                                    <span className="text-sm font-light mr-1">Remove from Cart</span>

                                </button>) : (
                                <button className="flex items-center bg-black text-white py-5 rounded-lg justify-center  w-full mt-5" onClick={() => updateCart({
                                    id, category, description, image, price, title,
                                    cartQuantity: 1, exists: false
                                })}>
                                    <span className="text-sm font-light mr-1">Buy Now</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Product;



