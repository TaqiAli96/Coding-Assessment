"use client"
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { ReactComponent as ShoppingCartIcon } from "../../../public/ShoppingCartIcon";
import { addToCart, cartItems, removefromCart, searchTerm } from "../../store/cartSlice"
import Product from '@/interfaces/productTypes';
import { CartItem } from '@/interfaces/cartItemTypes';
import Link from 'next/link';

const ProductsListing = ({ products }: { products: Product[] }) => {
    const postperpage = 10

    const dispatch = useDispatch();
    const CartItems = useSelector(cartItems)
    const SearchTerm = useSelector(searchTerm)
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10;

    const filteredProducts = products.filter(product =>
        product.category.toLowerCase().includes(SearchTerm?.toLowerCase() || '')
    );
    const lastIndex = postperpage * currentPage
    const firstIndex = postperpage - lastIndex
    const totalRows = filteredProducts.length
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const renderdData = filteredProducts.slice(firstIndex, lastIndex)
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };
    const updateCart = (product: CartItem) => {

        const productExists = CartItems.find((item) => item.id === product.id)
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
        <Fragment>
            <div className='flex flex-wrap gap-6 py-16'>
                {renderdData && renderdData.length > 0 ? renderdData.map(({ id, category, description, image, price, title }) => (
                    <div className='w-cardWidth h-cardHeight shadow-xl px-5 pt-5 rounded-xl bg-white' key={id}>
                        <Link href={`/products/${id}`}>

                            <div className='h-cardImageheight m-auto w-cardImageWidth pb-2'>
                                <img
                                    src={image}
                                    alt={title}
                                    className='w-full h-full'
                                />
                            </div>
                            <p className='font-Montserrat font-bold h-[1.5rem] mt-4 overflow-hidden line-clamp-3'>{title}</p>
                            <p className='font-Montserrat text-sm font-light'>{category}</p>
                            <p className='font-Montserrat text-sm font-light h-[5rem] mt-4 overflow-hidden line-clamp-3'>
                                {description}
                            </p>
                            <p className='text-sm font-light pt-3'>Price: <span className='font-Montserrat font-bold text-xl'>${price}</span></p>
                        </Link>
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
                                <span className="text-sm font-light mr-1">Add to Cart</span>
                                <ShoppingCartIcon />
                            </button>
                        )}
                    </div>
                ))
                    : "No Data found s"}


            </div>
            <div className="flex gap-3 py-2 justify-center items-center pr-2 text-lightgray z-30 relative pt-5">

                <div
                    onClick={prevPage}
                    className={` bg-new-grey py-1 px-4 text-custom-white rounded-lg cursor-pointer ${currentPage === 1 || lastIndex === 0
                        ? "text-lightgray cursor-not-allowed pointer-events-none"
                        : ""
                        }`}
                >
                    {"<"}
                </div>
                <div className="bg-new-grey py-1 px-4 text-custom-white rounded-lg cursor-pointer whitespace-nowrap">
                    Page {currentPage} of{" "}
                    {Math.ceil(filteredProducts.length / rowsPerPage)}
                </div>
                <div
                    onClick={nextPage}
                    className={`bg-new-grey py-1 px-4 rounded-lg text-custom-white cursor-pointer ${lastIndex >= totalRows &&
                        "text-lightgray cursor-not-allowed pointer-events-none"
                        }`}
                >
                    {">"}
                </div>

            </div>
        </Fragment>
    )
}

export default ProductsListing
