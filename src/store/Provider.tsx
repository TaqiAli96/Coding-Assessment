"use client"

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import children from '@/interfaces/childrenTypes';



const Providers: React.FC<children> = ({ children }: children) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default Providers;
