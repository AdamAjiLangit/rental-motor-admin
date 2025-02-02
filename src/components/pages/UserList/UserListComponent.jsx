'use client';

import React from 'react';
import { Button, Input } from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import UserListTable from '@/components/table/UserListTable';

const UserListComponent = () => {
    return (
        <div className='min-h-screen'>
            <UserListTable />
        </div>
    )
}

export default UserListComponent