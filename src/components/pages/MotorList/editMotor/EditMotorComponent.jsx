"use client";

import React from 'react';
import {
    Card, CardHeader, CardBody, CardFooter, Divider
    ,
} from "@nextui-org/react";
import EditMotorForm from '@/components/form/EditForm/EditMotorForm';

const EditMotorComponent = () => {
    return (
        <div className='space-y-8 pb-10'>
            <Card className="bg-[#1A1F1F] p-5">
                <CardHeader className='z-[1]'>
                    <h2 className='text-white text-sm md:text-base'>Edit Motor</h2>
                </CardHeader>
                <Divider className='bg-white my-2' />
                <CardBody className='z-[1]'>
                    <EditMotorForm />
                </CardBody>
                <Divider className='bg-white my-2' />
                <CardFooter className='flex items-center justify-between'></CardFooter>
            </Card>
        </div>
    )
}

export default EditMotorComponent