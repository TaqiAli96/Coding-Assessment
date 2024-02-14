"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from "../../../public/SearchIcon";
import { navbarItems } from '@/constants/navbaritems';
import { ReactComponent as ShoppingCartIcon } from "../../../public/ShoppingCartIcon";
import { cartItems, cartTotalQuantity, getTotals, setSearchItem } from '@/store/cartSlice';
import Link from 'next/link';

const Navbar = () => {
    const dispatch = useDispatch();
    const totalQuantity = useSelector(cartTotalQuantity);
    const CartItems = useSelector(cartItems)
    const [searchTerm, setsearchTerm] = useState('')

    useEffect(() => {
        dispatch(getTotals());
    }, [CartItems, dispatch]);

    useEffect(() => {
        dispatch(setSearchItem(searchTerm))
    }, [searchTerm])

    return (

        <div className='flex justify-between items-center'>
            <div className='w-navbarLogoSectionWidth'>
                <h4 className='font-PlayfairDisplay text-2xl font-bold'>Ecommerce</h4>
            </div>
            <div className='flex justify-between w-navbarItemsSectionWidth'>
                {navbarItems && navbarItems.map(({ id, content }) => (
                    <p key={id} className='font-Montserrat text-sm font-light'>
                        {content}
                    </p>
                ))}
            </div>
            <div className="relative flex items-center ml-[5rem]">
                <input type="text" className="border rounded-xl py-2 px-4 w-inputWidth focus:outline-none focus:border-purple-500" placeholder="Search..."
                    value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon />
                </div>
            </div>
            <Link href={'/cart'}>
                <button className="flex items-center bg-black text-white w-[8rem] justify-center py-2 rounded-lg ml-[2rem]">
                    <span className="font-light mr-1">{totalQuantity}</span>
                    <ShoppingCartIcon />
                </button>
            </Link>

        </div>
    )
}

export default Navbar