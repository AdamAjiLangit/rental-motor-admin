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
} from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import { LuPencilLine, LuSearch } from "react-icons/lu";
import toast from 'react-hot-toast';
import truncateText from '@/utils/truncateText';

export default function ReviewListTable() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [reviewData, setReviewData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/review/all`);
                const review = response.data.review;
                setReviewData(review);
                setTotalPages(Math.ceil(review.length / itemsPerPage));
            } catch (error) {
                console.error(error);
            };
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredData = reviewData.filter((item) => {
        const matchesSearch = item.user.nama_pengguna.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

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
                <h1 className='text-xl text-white font-bold tracking-wider'>Semua Ulasan</h1>
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

            <Table
                aria-label="Tabel Ulasan"
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
                    {paginatedData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-100">
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.user.nama_pengguna}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {item.penilaian}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    {truncateText(item.komentar, 5)}
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='bg-gray-500' isLoaded={isLoaded}>
                                    <div className='flex'>
                                        <Tooltip content='Detail'>
                                            <Button isIconOnly onPress={() => handleNavigate("/admin/daftarUlasan/detailUlasan")} className="text-white mr-3 bg-blue-500">
                                                <LuSearch size={20} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content='Edit'>
                                            <Button color='warning' isIconOnly onPress={() => handleNavigate("/admin/daftarUlasan/editUlasan")} className="text-white mr-3">
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