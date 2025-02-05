'use client';

import React, { useEffect, useState } from 'react';
import { CardHoverEffect } from './Card/CardDashboard';
import ChartComponent from './Chart/Chart';
import { Skeleton } from '@nextui-org/react';
import NewOrderList from './NewOrderList';
import Link from 'next/link';

const DashboardComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log("Window Test");
        }
    }, []);

    return (
        <div className='min-h-screen'>
            {isLoading ? (
                <div className='w-full'>
                    <Skeleton className="bg-[#1A1F1F] w-1/12 h-7 mb-8 rounded-lg" />
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 mb-10'>
                        <Skeleton className="bg-[#1A1F1F] w-[95%] h-36 rounded-lg" />
                        <Skeleton className="bg-[#1A1F1F] w-[95%] h-36 rounded-lg" />
                        <Skeleton className="bg-[#1A1F1F] w-[95%] h-36 rounded-lg" />
                        <Skeleton className="bg-[#1A1F1F] w-[95%] h-36 rounded-lg" />
                    </div>
                    <Skeleton className="bg-[#1A1F1F] w-1/12 h-7 mb-3 rounded-lg" />
                    <Skeleton className="bg-[#1A1F1F] w-[98%] h-96 pb-10 rounded-lg" />
                </div>
            ) : (
                <>
                    <h1 className='text-xl text-white font-bold tracking-wider'>Aktivitas</h1>
                    <CardHoverEffect />
                    <div className='flex gap-2 items-center mt-10 mb-5'>
                        <h1 className='text-xl text-white font-bold tracking-wider'>Pesanan Baru</h1>
                        <Link href='/admin/orders'>
                            <p className='text-white text-sm font-semibold'>Lihat Semua</p>
                        </Link>
                    </div>
                    <NewOrderList />
                    <div className='mt-10 mb-5'>
                        <h1 className='text-xl text-white font-bold tracking-wider'>Total Sewa</h1>
                    </div>
                    <div className='pb-10'>
                        <ChartComponent />
                    </div>
                </>
            )}
        </div>
    )
}

export default DashboardComponent