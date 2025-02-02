'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import HeaderComponent from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';

const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <HeaderComponent />
            <div>
                <aside className='hidden lg:block'>
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                </aside>
                <div className={`px-5 bg-[#060E0E] transition-all duration-[650ms] ease-in-out ${isOpen ? 'lg:pl-[400px] lg:pt-[50px] pt-10 pl-5' : 'lg:ml-32 ml-0'}`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout