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
import ProfileForm from '@/components/form/ProfileForm';
import ChangeEmailForm from '@/components/form/ChangeEmailForm';
import ChangePasswordForm from '@/components/form/ChangePasswordForm';

const ProfileComponent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState("https://avatars.githubusercontent.com/u/86160567?s=200&v=4");
    const defaultImageUrl = "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadProgress(30);
            setTimeout(() => setUploadProgress(100), 1000);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreviewUrl(defaultImageUrl);
        setUploadProgress(0);
    };

    return (
        <div className='min-h-screen space-y-8 pb-10'>
            <Card className="bg-[#1A1F1F] p-5">
                <CardHeader className='z-[1]'>
                    <h2 className='text-white text-sm md:text-base'>Informasi Pengguna</h2>
                </CardHeader>
                <Divider className='bg-white my-2' />
                <CardBody className='z-[1]'>
                    <div className='flex flex-col gap-5 w-fit mb-5'>
                        <h3 className='text-white text-sm'>Foto Profil</h3>
                        <Image
                            alt="Profile Picture"
                            height={100}
                            width={100}
                            radius="full"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            className="border border-gray-300"
                        />
                        <Button color='primary' onPress={onOpen} className='font-poppinsMedium text-sm'>Pilih Foto</Button>
                        <Modal
                            backdrop="blur"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            isDismissable={false}
                            placement='center'
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <div className='bg-[#1A1F1F] p-5 rounded-lg'>
                                        <ModalBody>
                                            <h3 className='text-white text-lg mb-2'>Unggah Foto Profil</h3>
                                            <Image
                                                alt="Profile Picture"
                                                height={100}
                                                width={100}
                                                radius="full"
                                                src={previewUrl}
                                                className="border border-gray-300 mb-2"
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="text-white file:rounded-md file:border-none file:bg-primary file:px-3 file:py-1 file:text-white hover:file:bg-primary/55 cursor-pointer text-sm"
                                            />
                                            {uploadProgress > 0 && (
                                                <Progress
                                                    color="primary"
                                                    value={uploadProgress}
                                                    className="mt-3"
                                                />
                                            )}
                                            <div className="flex justify-end gap-3 mt-5">
                                                <Button
                                                    color='danger'
                                                    className=''
                                                    onPress={handleReset}
                                                >Reset</Button>
                                                <Button
                                                    color='success'
                                                    className='text-white'
                                                    onPress={onClose}
                                                >Simpan</Button>
                                            </div>
                                        </ModalBody>
                                    </div>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <ProfileForm />
                </CardBody>
                <Divider className='bg-white my-2' />
                <CardFooter className='flex items-center justify-between'></CardFooter>
            </Card>
            <Card className="bg-[#1A1F1F] p-5">
                <CardHeader className='z-[1]'>
                    <h2 className='text-white text-sm md:text-base'>Ubah Email</h2>
                </CardHeader>
                <Divider className='bg-white my-2' />
                <CardBody className='z-[1]'>
                    <ChangeEmailForm />
                </CardBody>
                <Divider className='bg-white my-2' />
                <CardFooter className='flex items-center justify-between'></CardFooter>
            </Card>
            <Card className="bg-[#1A1F1F] p-5">
                <CardHeader className='z-[1]'>
                    <h2 className='text-white text-sm md:text-base'>Ubah Password</h2>
                </CardHeader>
                <Divider className='bg-white my-2' />
                <CardBody className='z-[1]'>
                    <ChangePasswordForm />
                </CardBody>
                <Divider className='bg-white my-2' />
                <CardFooter className='flex items-center justify-between'></CardFooter>
            </Card>
        </div>
    )
}

export default ProfileComponent;
