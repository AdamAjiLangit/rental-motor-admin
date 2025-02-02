import React from 'react';
import ReactWhatsapp from 'react-whatsapp';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from '@nextui-org/react';
import { IoLocation } from 'react-icons/io5';
import { FaMotorcycle, FaWhatsapp } from 'react-icons/fa';
import { Clock } from 'lucide-react';

const NewOrderList = ({ }) => {
    return (
        <div>
            <Card className="max-w-[400px] bg-[#1A1F1F]">
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
                            <p className="text-small font-poppinsMedium text-default-500">#1</p>
                            <p className="text-md font-poppinsSemiBold text-white">XSR</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Button size='sm' startContent={<FaMotorcycle size={20} color='primary' />} disableAnimation disableRipple autoFocus className='bg-orange-500/25 text-white font-poppinsMedium'>Diambil</Button>
                        <Button size='sm' startContent={<Clock size={20} />} disableAnimation disableRipple autoFocus className='bg-orange-500/25 text-white font-poppinsMedium'>08:00 Pagi</Button>
                    </div>
                </CardHeader>
                <Divider className='bg-white my-2' />
                <CardBody>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Image
                                alt="heroui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className='flex flex-col gap-1'>
                                <p className='text-md font-poppinsMedium text-white'>Adam - 08xxxxx</p>
                                <div className='flex items-center gap-1'>
                                    <IoLocation color='red' />
                                    <p className='text-small font-poppinsMedium text-white'>Lokasi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <Divider className='bg-white my-2' />
                <CardFooter className='flex items-center justify-end'>
                    <div className='flex items-center gap-3'>
                        <Button color='primary' className='font-poppinsMedium'>Detail</Button>
                        <Button color='primary' className='font-poppinsMedium text-white' variant='bordered'>Invoice</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NewOrderList