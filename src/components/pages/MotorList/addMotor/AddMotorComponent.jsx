"use client";

import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, CardFooter, Divider, Image, ModalContent,
    Button,
    Modal,
    ModalBody,
    useDisclosure,
    Progress,
} from "@nextui-org/react";
import AddMotorForm from '@/components/form/AddForm/AddMotorForm';

const AddMotorComponent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState("https://avatars.githubusercontent.com/u/86160567?s=200&v=4");
    const defaultImageUrl = "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxSize = 2 * 1024 * 1024;

        if (!file) {
            setSelectedFile(null);
            setErrMessage('');
            return;
        }

        if (file.size > maxSize) {
            setErrMessage('Ukuran lebih dari 2MB');
            event.target.value = '';
            return;
        }

        setSelectedFile(file);
        setErrMessage('');
        setPreviewUrl(URL.createObjectURL(file));
        setUploadProgress(30);
        setTimeout(() => setUploadProgress(100), 1000);
    };

    const handleReset = () => {
        setSelectedFile(null);
        setErrMessage('');
        setPreviewUrl(defaultImageUrl);
        setUploadProgress(0);
    };

    return (
        <div className='space-y-8 pb-10'>
            <Card className="bg-[#1A1F1F] p-5">
                <CardHeader className='z-[1]'>
                    <h2 className='text-white text-sm md:text-base'>Tambah Motor</h2>
                </CardHeader>
                <Divider className='bg-white my-2' />
                <CardBody className='z-[1]'>
                    <AddMotorForm />
                </CardBody>
                <Divider className='bg-white my-2' />
                <CardFooter className='flex items-center justify-between'></CardFooter>
            </Card>
        </div>
    )
}

export default AddMotorComponent