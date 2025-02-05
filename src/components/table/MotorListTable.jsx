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
    Tooltip,
    Button,
    Input,
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
import { IoSearchOutline } from 'react-icons/io5';
import { LuPencilLine, LuSearch, LuTrash } from "react-icons/lu";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import FormatRupiah from '@/utils/formatToRupiah';

export default function MotorListTable() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [motorData, setMotorData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [motorId, setMotorId] = useState(null);

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
        setMotorId(id);
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
        };
    };

    const handleDelete = async (id) => {
        if (!motorId) {
            toast.error('No motor ID provided.');
            return;
        };

        const loadingToast = toast.loading('Deleting...');
        console.log('Deleting motor with ID:', motorId);
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/delete/${motorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success('Motor deleted.');
                window.location.reload();
            }
        } catch (error) {
            toast.error('Failed to delete motor.');
        } finally {
            toast.dismiss(loadingToast);
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`);
                const motor = response.data.listMotor;
                setMotorData(motor);
                setTotalPages(Math.ceil(motor.length / itemsPerPage));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredData = motorData.filter((item) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'tersedia' && item.status_motor === 'Tersedia') ||
            (filter === 'tidak' && item.status_motor === 'Tidak Tersedia');
        const matchesSearch = item.nama_motor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleFilterChange = (value) => {
        setFilter(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

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
                <h1 className='text-xl text-white font-bold tracking-wider'>Semua Motor</h1>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                    <div className='flex'>
                        <Input
                            className='text-gray'
                            classNames={{ inputWrapper: 'bg-dark' }}
                            placeholder="Cari nama motor..."
                            type='search'
                            size='md'
                            startContent={<IoSearchOutline />}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            color='primary'
                        />
                    </div>
                    <Button color='primary' onPress={() => handleNavigate('/admin/daftarMotor/tambahMotor')}>Tambah Motor</Button>
                </div>
            </div>

            <div className="flex gap-4 mb-5">
                <Select
                    placeholder="Filter"
                    className="max-w-40"
                    size='md'
                    onChange={(e) => handleFilterChange(e.target.value)}
                    aria-label='Filter'
                    defaultSelectedKeys={['all']}
                >
                    <SelectItem key="all" value="all">Semua</SelectItem>
                    <SelectItem key="tersedia" value="tersedia">Tersedia</SelectItem>
                    <SelectItem key="tidak" value="tidak">Tidak Tersedia</SelectItem>
                </Select>
            </div>

            <Table
                aria-label="Tabel Motor"
                className="w-full border border-gray-200 rounded-2xl shadow-md"
                classNames={{ table: 'bg-dark text-white', wrapper: 'bg-dark text-white', th: 'bg-dark text-white' }}
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Nama Motor</TableColumn>
                    <TableColumn>Stok</TableColumn>
                    <TableColumn>Harga</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Visibilitas</TableColumn>
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
                                    {item.nama_motor}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.stok_motor}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {FormatRupiah(item.harga_motor_per_1_hari)}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className={`px-5 py-1 text-white rounded-full w-fit ${item.status_motor === 'Tersedia' ? 'bg-green-500' : 'bg-red-500'}`} >
                                        {item.status_motor}
                                    </div>
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className={`px-5 py-1 text-white rounded-full w-fit ${item.is_hidden ? 'bg-gray' : 'bg-yellow-500'}`} >
                                        {item.is_hidden ? 'Disembunyikan' : 'Ditampilkan'}
                                    </div>
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className='flex'>
                                        <Tooltip content='Detail'>
                                            <Button isIconOnly onPress={() => handleNavigate("/admin/daftarMotor/detailMotor")} className="text-white mr-3 bg-blue-500">
                                                <LuSearch size={20} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content='Edit'>
                                            <Button color='warning' isIconOnly onPress={() => handleNavigate(`/admin/daftarMotor/editMotor/${item.id}`)} className="text-white mr-3">
                                                <LuPencilLine size={20} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content='Delete'>
                                            <Button color='danger' isIconOnly onPress={() => deleteId(item.id)} className="text-white mr-3">
                                                <LuTrash size={20} />
                                            </Button>
                                        </Tooltip>
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