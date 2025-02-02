'use client';

import React from 'react';
import { Button, Input } from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import ReviewListTable from '@/components/table/ReviewListTable';

const ReviewListComponent = () => {
    return (
        <div className='min-h-screen'>
            <ReviewListTable />
        </div>
    )
}

export default ReviewListComponent