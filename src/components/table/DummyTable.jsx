'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Input,
    Badge,
    Checkbox,
    Pagination,
    Skeleton,
    Select,
    SelectItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react';
import { LuPencilLine, LuSearch, LuTrash } from "react-icons/lu";
import toast from 'react-hot-toast';

export default function ReviewListTable() {
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleToAdd = async () => {
        const loadingToast = toast.loading('Loading...');
        try {
            await router.push('/admin/settings/global/childData/addData');
            toast.success('Redirecting...');
        } catch (error) {
            toast.error('Navigation failed');
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const truncateText = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(' ');
        console.log('Original Text:', text);
        console.log('Word Limit:', wordLimit);
        console.log('Words:', words);

        if (words.length > wordLimit) {
            const truncated = words.slice(0, wordLimit).join(' ') + ' ......';
            console.log('Truncated Text:', truncated);
            return truncated;
        }
        return text;
    };

    const data = [
        { id: '1', username: 'Siril', review: '5', comment: 'Bagus', },
        { id: '2', username: 'Zidan', review: '4', comment: 'Keren dan keren sekali', },
    ];

    return (
        <div className="">

            <Table
                aria-label="Review Table"
                className="w-full border border-gray-200 rounded-2xl shadow-md"
                classNames={{ table: 'bg-dark text-white', wrapper: 'bg-dark text-white', th: 'bg-dark text-white' }}
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Nama Pengguna</TableColumn>
                    <TableColumn>Penilaian</TableColumn>
                    <TableColumn>Komentar</TableColumn>
                    <TableColumn>Aksi</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-100">
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.id}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.username}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className="pl-3 flex items-center gap-2">
                                        {Array.from({ length: item.review }, (_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                                <path d="M12 .587l3.668 7.425 8.332 1.212-6.042 5.888 1.426 8.31L12 18.897l-7.384 3.925 1.426-8.31L.412 9.224l8.332-1.212L12 .587z" />
                                            </svg>
                                        ))}
                                    </div>
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {truncateText(item.comment, 2)}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <Button isIconOnly className="text-white mr-3 bg-blue-500">
                                        <LuSearch size={20} />
                                    </Button>
                                    {/* <Button color='warning' isIconOnly onPress={handleToEdit} className="text-white mr-3">
                                        <LuPencilLine size={20} />
                                    </Button> */}
                                    {/* <Button color='danger' isIconOnly onPress={handleToEdit} className="text-white mr-3">
                                        <LuTrash size={20} />
                                    </Button> */}
                                </Skeleton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-center mt-5">
                <Pagination total={1} initialPage={1} />
            </div>
        </div>
    );
}