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
} from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import { LuHistory, LuPencilLine, LuSearch } from "react-icons/lu";
import toast from 'react-hot-toast';

export default function UserListTable() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const router = useRouter();
    const itemsPerPage = 5;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all`);
                const user = response.data.user;
                setUserData(user);
                setTotalPages(Math.ceil(user.length / itemsPerPage));
            } catch (error) {
                console.error(error);
            };
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredData = userData.filter((item) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'admin' && item.peran === 'admin') ||
            (filter === 'user' && item.peran === 'user');
        const matchesSearch = item.nama_pengguna.toLowerCase().includes(searchQuery.toLowerCase());
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
                <h1 className='text-xl text-white font-bold tracking-wider'>Semua Pengguna</h1>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                    <div className='flex'>
                        <Input
                            className='text-gray'
                            classNames={{ inputWrapper: 'bg-dark' }}
                            placeholder="Cari nama pengguna..."
                            type='search'
                            size='md'
                            startContent={<IoSearchOutline />}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            color='primary'
                        />
                    </div>
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
                    <SelectItem key="admin" value="tersedia">Admin</SelectItem>
                    <SelectItem key="user" value="tidak">User</SelectItem>
                </Select>
            </div>

            <Table
                aria-label="Tabel User"
                className="w-full border border-gray-200 rounded-2xl shadow-md"
                classNames={{ table: 'bg-dark text-white', wrapper: 'bg-dark text-white', th: 'bg-dark text-white' }}
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Nama Pengguna</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Peran</TableColumn>
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
                                    {item.nama_pengguna}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.email}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className={`px-5 py-1 text-white rounded-full w-fit ${item.peran === 'admin' ? 'bg-blue-500' : 'bg-green-500'}`} >
                                        {item.peran}
                                    </div>
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className='flex'>
                                        <Tooltip content='Detail'>
                                            <Button isIconOnly onPress={() => handleNavigate("/admin/daftarUser/detailUser")} className="text-white mr-3 bg-blue-500">
                                                <LuSearch size={20} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content='Edit'>
                                            <Button color='warning' isIconOnly onPress={() => handleNavigate("/admin/daftarUser/editUser")} className="text-white mr-3">
                                                <LuPencilLine size={20} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content='Riwayat Pesanan'>
                                            <Button color='danger' isIconOnly onPress={() => handleNavigate("/admin/daftarUser/editUser")} className="text-white mr-3">
                                                <LuHistory size={20} />
                                            </Button>
                                        </Tooltip>
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