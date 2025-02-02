"use client";

import React from 'react';
import {
    Card, CardHeader, CardBody, CardFooter, Divider, Button, Image, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";

const NotificationComponent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isCancel, onOpen: onCancel, onOpenChange: onOpenCancel } = useDisclosure();

    return (
        <div className='min-h-screen'>
            <Card className="bg-[#1A1F1F]">
                <CardHeader className="flex flex-col md:flex-row items-start justify-start gap-2 md:items-center md:justify-between">
                    <div className='flex gap-2'>
                        <Image
                            alt="heroui logo"
                            height={40}
                            radius="sm"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={40}
                        />
                        <div className="flex flex-col">
                            <p className="text-sm md:text-medium font-poppinsMedium text-white">User</p>
                            <p className="text-sm md:text-medium font-poppinsMedium text-white">08xxxxx</p>
                        </div>
                    </div>
                </CardHeader>
                <Divider className='bg-white my-2' />
                <CardBody>
                    <p className='text-white'>Adam ingin menyewa motor XSR, apakah anda menyetujui pemintaan ini?</p>
                    <div className='flex items-center gap-2'>
                        <p className='text-primary'>Total Pembayaran</p>
                        <p className='text-white font-poppinsSemiBold'>Rp. 100.000</p>
                    </div>
                </CardBody>
                <Divider className='bg-white my-2' />
                <CardFooter className='flex items-center justify-between'>
                    <Button color='primary' className='font-poppinsMedium'>Lihat Detail</Button>
                    <div className='flex items-center gap-3'>
                        <Button color='danger' onPress={onCancel} className='font-poppinsMedium text-white'>Batal</Button>
                        <Modal
                            backdrop="blur"
                            isOpen={isCancel}
                            onOpenChange={onOpenCancel}
                            hideCloseButton={true}
                            isDismissable={false}
                            placement='center'
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <div className='bg-dark'>
                                        <ModalHeader className="flex flex-col gap-1 text-white">Konfirmasi</ModalHeader>
                                        <ModalBody>
                                            <p className='text-white'>Anda yakin membatalkan pesanan?</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" variant="light" onPress={onClose}>
                                                Batal
                                            </Button>
                                            <Button color="success" className='text-white' onPress={() => {
                                                onClose();
                                            }}>
                                                Konfirmasi
                                            </Button>
                                        </ModalFooter>
                                    </div>
                                )}
                            </ModalContent>
                        </Modal>
                        <Button color='success' onPress={onOpen} className='text-white font-poppinsMedium'>Konfirmasi</Button>
                        <Modal
                            backdrop="blur"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            hideCloseButton={true}
                            isDismissable={false}
                            placement='center'
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <div className='bg-dark'>
                                        <ModalHeader className="flex flex-col gap-1 text-white">Konfirmasi</ModalHeader>
                                        <ModalBody>
                                            <p className='text-white'>Anda yakin mengkonfirmasi pesanan?</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" variant="light" onPress={onClose}>
                                                Batal
                                            </Button>
                                            <Button color="success" className='text-white' onPress={() => {
                                                onClose();
                                            }}>
                                                Konfirmasi
                                            </Button>
                                        </ModalFooter>
                                    </div>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NotificationComponent