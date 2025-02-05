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
    DateRangePicker,
} from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import { LuPencilLine, LuSearch } from "react-icons/lu";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function HistoryListTable() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const token = Cookies.get('token');

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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const history = response.data.history;
                setHistoryData(history);
                setTotalPages(Math.ceil(history.length / itemsPerPage));
            } catch (error) {
                console.error(error);
            };
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredData = historyData.filter((item) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'wait' && item.status_history === 'Menunggu Pembayaran') ||
            (filter === 'book' && item.status_history === 'Dipesan') ||
            (filter === 'inUse' && item.status_history === 'Sedang Digunakan') ||
            (filter === 'done' && item.status_history === 'Selesai') ||
            (filter === 'cancel' && item.status_history === 'Dibatalkan');
        const matchesSearch = item.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase());
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
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10'>
                <h1 className='text-xl w-full text-white font-bold tracking-wider'>Semua Riwayat</h1>
                <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3'>
                    <DateRangePicker size='md' className="max-w-xs" color='primary' classNames={{ inputWrapper: 'bg-dark' }} />
                    <div className='flex w-full max-w-80'>
                        <Input
                            className='text-gray'
                            classNames={{ inputWrapper: 'bg-dark' }}
                            placeholder="Cari nama pengguna..."
                            type='search'
                            size='md'
                            color='primary'
                            startContent={<IoSearchOutline />}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mb-5">
                <Select
                    placeholder="Filter"
                    className="max-w-60"
                    size='md'
                    onChange={(e) => handleFilterChange(e.target.value)}
                    aria-label='Filter'
                    defaultSelectedKeys={['all']}
                >
                    <SelectItem key="all" value="all">Semua</SelectItem>
                    <SelectItem key="wait" value="wait">Menunggu Pembayaran</SelectItem>
                    <SelectItem key="book" value="book">Dipesan</SelectItem>
                    <SelectItem key="inUse" value="inUse">Sedang Digunakan</SelectItem>
                    <SelectItem key="done" value="done">Selesai</SelectItem>
                    <SelectItem key="cancel" value="cancel">Dibatalkan</SelectItem>
                </Select>
            </div>

            <Table
                aria-label="Tabel Riwayat"
                className="w-full border border-gray-200 rounded-2xl shadow-md"
                classNames={{ table: 'bg-dark text-white', wrapper: 'bg-dark text-white', th: 'bg-dark text-white' }}
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Pengguna</TableColumn>
                    <TableColumn>Jenis Motor</TableColumn>
                    <TableColumn>Tanggal Booking</TableColumn>
                    <TableColumn>Status</TableColumn>
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
                                    {item.nama_lengkap}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.list_motor.nama_motor}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.tanggal_mulai} - {item.tanggal_selesai}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className={`px-5 py-1 text-white rounded-full w-fit ${item.status_history === 'Menunggu Pembayaran' ? 'bg-blue-500' : ''} ${item.status_history === 'Dipesan' ? 'bg-yellow-500' : ''} ${item.status_history === 'Sedang Digunakan' ? 'bg-orange-500' : ''} ${item.status_history === 'Selesai' ? 'bg-green-500' : ''} ${item.status_history === 'Dibatalkan' ? 'bg-red-500' : ''}`} >
                                        {item.status_history}
                                    </div>
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className='flex'>
                                        <Tooltip content='Detail'>
                                            <Button isIconOnly onPress={() => handleNavigate("/admin/daftarRiwayat/detailRiwayat")} className="text-white mr-3 bg-blue-500">
                                                <LuSearch size={20} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content='Edit'>
                                            <Button color='warning' isIconOnly onPress={() => handleNavigate("/admin/daftarRiwayat/editRiwayat")} className="text-white mr-3">
                                                <LuPencilLine size={20} />
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