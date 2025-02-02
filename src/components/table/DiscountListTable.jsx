'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    Pagination,
    Skeleton,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import { LuPencilLine, LuSearch, LuTrash } from "react-icons/lu";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function DiscountListTable() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [discountData, setDiscountData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [discountId, setDicountId] = useState(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const token = Cookies.get('token');

    const router = useRouter();
    const itemsPerPage = 5;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const deleteId = (id) => {
        setDicountId(id);
        onOpen();
    };

    const handleNavigate = async (path) => {
        const loadingToast = toast.loading('Navigating...');
        try {
            await router.push(path);
            toast.success('Redirecting...');
        } catch (error) {
            toast.error('Navigation failed.');
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const handleDelete = async (id) => {
        if (!discountId) {
            toast.error('No discount ID provided.');
            return;
        };

        const loadingToast = toast.loading('Deleting...');
        console.log('Deleting discount with ID:', discountId);
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/delete/${discountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success('Discount deleted.');
                window.location.reload();
            }
        } catch (error) {
            toast.error('Failed to delete discount.');
        } finally {
            toast.dismiss(loadingToast);
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/all`);
                const discount = response.data.diskon;
                setDiscountData(discount);
                setTotalPages(Math.ceil(discount.length / itemsPerPage));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredData = discountData.filter((item) => {
        const matchesSearch = item.nama_diskon.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData]);

    if (typeof window !== 'undefined') {
        console.log("Window Test");
    };

    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-start gap-3 md:items-center mb-10'>
                <h1 className='text-xl text-white font-bold tracking-wider'>Semua Diskon</h1>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                    <div className='flex'>
                        <Input
                            className='text-gray'
                            classNames={{ inputWrapper: 'bg-dark' }}
                            placeholder="Cari nama diskon..."
                            type='search'
                            size='md'
                            startContent={<IoSearchOutline />}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            color='primary'
                        />
                    </div>
                    <Button color='primary' onPress={() => handleNavigate('/admin/daftarDiskon/tambahDiscount')}>Tambah Diskon</Button>
                </div>
            </div>

            <Table
                aria-label="Tabel Diskon"
                className="w-full border border-gray-200 rounded-2xl shadow-md"
                classNames={{ table: 'bg-dark text-white', wrapper: 'bg-dark text-white', th: 'bg-dark text-white' }}
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Nama Diskon</TableColumn>
                    <TableColumn>Potongan Harga</TableColumn>
                    <TableColumn>Periode</TableColumn>
                    <TableColumn>Aksi</TableColumn>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-100">
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.nama_diskon}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.potongan_harga}%
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.tanggal_mulai} - {item.tanggal_selesai}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className='flex'>
                                        <Button isIconOnly onPress={() => handleNavigate("/admin/daftarDiskon/detailDiskon")} className="text-white mr-3 bg-blue-500">
                                            <LuSearch size={20} />
                                        </Button>
                                        <Button color='warning' isIconOnly onPress={() => handleNavigate("/admin/daftarDiskon/editDiskon")} className="text-white mr-3">
                                            <LuPencilLine size={20} />
                                        </Button>
                                        <Button color='danger' isIconOnly onPress={() => deleteId(item.id)} className="text-white mr-3">
                                            <LuTrash size={20} />
                                        </Button>
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
                                                        <ModalHeader className="flex flex-col gap-1 text-white">Confirm</ModalHeader>
                                                        <ModalBody>
                                                            <p className='text-white'>Are you sure you want to delete this task?</p>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" variant="light" onPress={onClose}>
                                                                Cancel
                                                            </Button>
                                                            <Button color="danger" onPress={() => {
                                                                handleDelete();
                                                                onClose();
                                                            }}>
                                                                Delete
                                                            </Button>
                                                        </ModalFooter>
                                                    </div>
                                                )}
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                </Skeleton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-center mt-5">
                <Pagination total={totalPages} initialPage={1} page={currentPage} onChange={handlePageChange} />
            </div>
        </>
    );
}