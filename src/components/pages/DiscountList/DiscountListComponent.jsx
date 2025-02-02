'use client';

import React from 'react';
import { Button, Input } from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import DiscountListTable from '@/components/table/DiscountListTable';

const DiscountListComponent = () => {
    return (
        <div className='min-h-screen'>
            <DiscountListTable />
        </div>
    )
}

export default DiscountListComponent