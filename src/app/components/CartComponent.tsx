"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toast } from "react-toastify";
import LayoutWrapper from '../LayoutWrapper'
import Navbar from './Navbar'
import { cartItems, increasedQuantity, decreasedQuantity, cartTotalAmount } from "../../store/cartSlice"

const CartComponent = () => {
    const dispatch = useDispatch();
    const CartItems = useSelector(cartItems)
    const totalAmount = useSelector(cartTotalAmount)
    return (
        <LayoutWrapper>
            <Navbar />

            <div className='flex pt-16 gap-7'>
                <div className='w-cartItemsSectionWidth flex flex-col'>
                    <div className='pb-5'> <Link href={'/'}>Back</Link></div>
                    <div className='text-black text-2xl font-Montserrat px-2'>Your Cart</div>
                    <div className='flex justify-between w-cartTableHeaderWidth ml-auto text-Gray font-light text-base'>
                        <div>
                            Name
                        </div>
                        <div className='pl-9'>
                            Price
                        </div>
                        <div className='pr-16'>
                            Quantity
                        </div>
                    </div>

                    {CartItems && CartItems.length > 0 ? CartItems.map((items) => {
                        const { title } = items
                        const updateTitle = title.split(' ').slice(0, 3).join(' ')
                        return (

                            <div className='flex justify-between shadow-xl h-[120px] px-8 items-center bg-white rounded-2xl font-Montserrat my-5'>
                                <div className='w-cartImageWidth h-cartImageHeight'
                                >
                                    <img src={items.image} className='w-1/2 h-full' />
                                </div>
                                <div className='overflow-hidden  w-cartTitleWidth text-start'>
                                    <span className='text-ellipsis font-light text-base'>{updateTitle}</span>
                                </div>
                                <div className='font-Poppins  w-cartPriceWidth text-start'>
                                    ${parseInt((items.price * items.cartQuantity).toString(), 10)}
                                </div>

                                <div className='flex gap-2  w-cartQuantityWidth justify-end'>
                                    <div className='bg-black px-4 py-1 rounded-md text-white cursor-pointer'
                                        onClick={() => dispatch(increasedQuantity(items))}
                                    >+</div>
                                    <div className='text-lg'> {items.cartQuantity}</div>
                                    <div className='bg-black px-4 py-[.2rem] rounded-md text-white cursor-pointer'
                                        onClick={() => dispatch(decreasedQuantity(items))}
                                    >-</div>
                                </div>
                            </div>
                        )
                    }) : (<div className='flex justify-center items-center flex-col my-14'>
                        <div>Cart is Empty....</div>
                        <div className='text-blue-800 my-1'>

                            <Link href={'/'}>Start Shopping</Link>
                        </div>
                    </div>)}

                </div>
                <div className='w-[25rem] h-[27.4rem] mt-[7.5rem] flex flex-col bg-white shadow-xl rounded-2xl px-6 py-5'>
                    <p className='text-2xl font-normal'>Your total</p>

                    <div className='flex flex-col justify-between gap-6 mt-6 overflow-auto'>
                        {CartItems.map((item) => (
                            <div className='flex gap-10 text-sm'>
                                <div className="w-[10rem] text-start">{item.title.split(' ').slice(0, 3).join(' ')}</div>
                                <div className="w-[4rem] text-end"> ${parseInt((item.price * item.cartQuantity).toString(), 10)}</div>
                            </div>
                        ))}

                    </div>
                    <div className='mt-auto'></div>
                    <div className='flex justify-between gap-6 my-6'>
                        <div>Total</div>
                        <div>${totalAmount.toFixed(0)}</div>
                    </div>
                    <div className='bg-black text-white py-[.7rem] rounded-2xl text-center cursor-pointer'
                        onClick={() => {
                            CartItems.length > 0 &&
                                toast.success(`successfully purchased`, {
                                    position: "bottom-left",
                                    autoClose: 800,
                                });
                        }}>Check out</div>
                </div>

            </div>
        </LayoutWrapper>
    )
}

export default CartComponent