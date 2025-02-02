'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

const AuthLayout = ({ children }) => {
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {children}
        </>
    )
}

export default AuthLayout