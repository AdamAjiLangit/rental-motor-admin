'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Divider } from "@nextui-org/react";
import { IoNotifications, IoSettings } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { IconUserFilled } from '@tabler/icons-react';

export default function HeaderComponent() {
    const [isOpen, setIsOpen] = useState(false);
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
            default:
                return 'Beranda';
        }
    };

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
                <Button isIconOnly onPress={() => handleNavigation("/admin/profil")} className={`relative bg-[#1A1F1F] rounded-xl ${pathname === '/admin/profil' ? 'bg-primary' : ''}`}>
                    <IconUserFilled size={25} className="text-white text-lg" />
                </Button>
                <Button isIconOnly onPress={() => handleNavigation("/admin/notifikasi")} className={`relative mr-1 md:mr-7 bg-[#1A1F1F] rounded-xl ${pathname === '/admin/notifikasi' ? 'bg-primary' : ''}`}>
                    <IoNotifications size={25} className="text-white text-lg" />
                </Button>
                <div className='hidden items-center justify-center md:flex cursor-default gap-1 md:gap-5'>
                    <Avatar
                        isBordered
                        as="text"
                        className="transition-transform"
                        color='primary'
                        name="Jason Hughes"
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                    <p className='text-white text-sm md:text-base'>John Doe</p>
                </div>
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