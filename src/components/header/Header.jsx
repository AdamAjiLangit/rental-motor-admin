'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Divider } from "@nextui-org/react";
import { IoNotifications, IoSettings } from 'react-icons/io5';
import { IoIosArrowDown } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { IconDoorExit, IconUserFilled } from '@tabler/icons-react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function HeaderComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { label: "Beranda", path: "/admin" },
        { label: "Daftar Motor", path: "/admin/daftarMotor" },
        { label: "Daftar Pengguna", path: "/admin/daftarUser" },
        { label: "Daftar Diskon", path: "/admin/daftarDiskon" },
        { label: "Daftar Riwayat", path: "/admin/daftarRiwayat" },
        { label: "Daftar Ulasan", path: "/admin/daftarUlasan" },
    ];

    const getPageTitle = () => {
        switch (pathname) {
            case '/admin':
                return 'Beranda';
            case '/admin/daftarMotor':
                return 'Daftar Motor';
            case '/admin/daftarUser':
                return 'Daftar Pengguna';
            case '/admin/daftarDiskon':
                return 'Daftar Diskon';
            case '/admin/daftarRiwayat':
                return 'Daftar Riwayat';
            case '/admin/daftarUlasan':
                return 'Daftar Ulasan';
            case '/admin/notifikasi':
                return 'Notifikasi';
            case '/admin/profil':
                return 'Profil';
            case '/admin/daftarMotor/tambahMotor':
                return 'Tambah Motor';
            case '/admin/daftarMotor/editMotor':
                return 'Edit Motor';
            case '/admin/daftarMotor/detailMotor':
                return 'Detail Motor';
            case '/admin/daftarDiskon/tambahDiskon':
                return 'Tambah Diskon';
            default:
                return 'Beranda';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data.user);
                setUser(response.data.user);
                setUserImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.user?.gambar}`);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleNavigation = async (path) => {
        if (pathname === path) return;
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

    return (
        <Navbar onMenuOpenChange={setIsOpen} className='pt-2 bg-[#060E0E] cursor-pointer z-10' maxWidth="full" isBlurred="false">
            <NavbarMenuToggle
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="lg:hidden text-white"
            />
            <NavbarBrand className='lg:pl-[330px] pl-0'>
                <h1 className='text-lg lg:text-3xl tracking-wider font-semibold text-white'>{getPageTitle()}</h1>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                {/* <Button isIconOnly onPress={() => handleNavigation("/admin/profil")} className={`relative bg-[#1A1F1F] rounded-xl ${pathname === '/admin/profil' ? 'bg-primary' : ''}`}>
                    <IconUserFilled size={25} className="text-white text-lg" />
                </Button>
                <Button isIconOnly onPress={() => handleNavigation("/admin/notifikasi")} className={`relative mr-1 md:mr-7 bg-[#1A1F1F] rounded-xl ${pathname === '/admin/notifikasi' ? 'bg-primary' : ''}`}>
                    <IoNotifications size={25} className="text-white text-lg" />
                </Button> */}
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <div className='hidden items-center justify-center md:flex gap-1 md:gap-5'>
                            <Avatar
                                isBordered
                                as="text"
                                className="transition-transform"
                                color='primary'
                                name="Jason Hughes"
                                size="md"
                                src={userImage}
                            />
                            <p className='text-white text-sm md:text-base'>{user?.nama_pengguna}</p>
                            <IoIosArrowDown className='text-[#64748B]' />
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <span className="font-semibold">Masuk sebagai </span>
                            <span className="font-semibold">{user?.email}</span>
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            <div className='flex items-center gap-2 text-danger-500'>
                                <IconDoorExit size={20} className="mr-2" />
                                <p>Keluar</p>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarMenu className='mt-5 bg-zinc-800'>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`} className='flex flex-col'>
                            <Link
                                className={`w-full ${pathname === item.path ? "text-primary" : "text-white"}`}
                                href={item.path}
                                size="lg"
                            >
                                {item.label}
                            </Link>
                            <Divider className='my-2 bg-white' />
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </NavbarContent>
        </Navbar>
    )
}