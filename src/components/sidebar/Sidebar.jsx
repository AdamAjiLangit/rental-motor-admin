'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import {
    IoArrowBackOutline,
    IoArrowForwardOutline,
    IoChatbubbleOutline,
    IoHomeOutline,
    IoPersonOutline,
    IoSettingsOutline,
    IoChevronDown,
    IoHome,
    IoList,
    IoStar,
} from 'react-icons/io5';
import { TbMoodKid } from "react-icons/tb";
import { RiScales2Line, RiParentLine } from 'react-icons/ri';
import { TbClockEdit } from "react-icons/tb";
import { MdEditCalendar } from "react-icons/md";
import { FaRegChartBar } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { LiaUserEditSolid, LiaHospitalAltSolid } from "react-icons/lia";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { IconDiscount, IconHistory, IconMotorbike } from '@tabler/icons-react';

export default function Sidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isTableData, setIsTableData] = useState(false);
    const [isTransaction, setIsTransaction] = useState(false);

    const buttons = [
        { label: 'Beranda', icon: <IoHome size={20} />, path: '/admin' },
    ];

    const tableData = [
        { label: 'Daftar Motor', path: '/admin/daftarMotor', icon: <IconMotorbike size={20} /> },
        { label: 'Data User', path: '/admin/daftarUser', icon: <RiParentLine size={20} /> },
    ];

    const transactionData = [
        { label: 'Diskon', path: '/admin/daftarDiskon', icon: <IconDiscount size={20} /> },
        { label: 'Riwayat', path: '/admin/daftarRiwayat', icon: <IconHistory size={20} /> },
        { label: 'Ulasan', path: '/admin/daftarUlasan', icon: <IoStar size={20} /> },
    ]

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

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <motion.aside
            initial={{ width: isOpen ? 325 : 120 }}
            animate={{ width: isOpen ? 325 : 120 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="p-5 bg-[#1A1F1F] fixed inset-0 z-20"
        >
            <div className="flex flex-col gap-5 justify-start items-start mt-2">
                <div className='flex items-center gap-2 mb-10'>
                    <img src="/assets/logo.png" alt="logo" width={35} />
                    {isOpen && <p className="font-poppins text-lg font-semibold text-white">Rental Motor Kudus</p>}
                </div>
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        onPress={() => handleNavigation(button.path)}
                        className={`w-full font-poppins justify-start text-base ${!isOpen ? 'justify-center text-center' : ''} ${pathname === button.path
                            ? 'bg-[#252A31] text-primary'
                            : 'bg-transparent text-white'
                            }`}
                        startContent={button.icon}
                    >
                        {isOpen && button.label}
                    </Button>
                ))}
                <Button
                    onPress={() => setIsTableData(!isTableData)}
                    className={`w-full font-poppins justify-start text-base ${!isOpen ? 'justify-center text-center' : ''} ${pathname.startsWith('/admin/daftarMotor') || pathname.startsWith('/admin/daftarUser')
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-white'
                        }`}
                    startContent={<IoList size={20} />}
                    endContent={
                        <motion.div
                            animate={{ rotate: isTableData ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`${isOpen ? 'ml-auto' : 'ml-2'}`}
                        >
                            <IoChevronDown size={18} />
                        </motion.div>
                    }
                >
                    {isOpen && 'Tabel Data'}
                </Button>
                {isTableData && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="pl-6 space-y-2"
                    >
                        {tableData.map((option, index) => (
                            <Button
                                key={index}
                                onPress={() => handleNavigation(option.path)}
                                startContent={option.icon}
                                className={`w-full font-poppins text-base justify-start bg-transparent text-white ${pathname === option.path ? 'text-primary' : ''}`}
                            >
                                {isOpen && option.label}
                            </Button>
                        ))}
                    </motion.div>
                )}
                <Button
                    onPress={() => setIsTransaction(!isTransaction)}
                    className={`w-full font-poppins justify-start text-base ${!isOpen ? 'justify-center text-center' : ''} ${pathname.startsWith('/admin/daftarDiskon') || pathname.startsWith('/admin/daftarRiwayat') || pathname.startsWith('/admin/daftarUlasan')
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-white'
                        }`}
                    startContent={<GiReceiveMoney size={20} />}
                    endContent={
                        <motion.div
                            animate={{ rotate: isTransaction ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`${isOpen ? 'ml-auto' : 'ml-2'}`}
                        >
                            <IoChevronDown size={18} />
                        </motion.div>
                    }
                >
                    {isOpen && 'Transaksi'}
                </Button>
                {isTransaction && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="pl-6 space-y-2"
                    >
                        {transactionData.map((option, index) => (
                            <Button
                                key={index}
                                onPress={() => handleNavigation(option.path)}
                                startContent={option.icon}
                                className={`w-full font-poppins text-base justify-start bg-transparent text-white ${pathname === option.path ? 'text-primary' : ''}`}
                            >
                                {isOpen && option.label}
                            </Button>
                        ))}
                    </motion.div>
                )}
                {/* {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-white font-poppins my-3">Settings</p>
                    </motion.div>
                )}
                <Button
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full font-poppins justify-start text-base ${!isOpen ? 'justify-center text-center' : ''} ${pathname.startsWith('/admin/settings/global')
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-white'
                        }`}
                    startContent={<IoSettingsOutline />}
                    endContent={
                        <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`${isOpen ? 'ml-auto' : 'ml-2'}`}
                        >
                            <IoChevronDown size={18} />
                        </motion.div>
                    }
                >
                    {isOpen && 'Global Settings'}
                </Button>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="pl-6 mt-2"
                    >
                        {globalSettingsOptions.map((option, index) => (
                            <Button
                                key={index}
                                onPress={() => handleNavigation(option.path)}
                                startContent={option.icon}
                                className={`w-full font-poppins text-base justify-start bg-transparent text-white ${pathname === option.path ? 'text-primary' : ''}`}
                            >
                                {isOpen && option.label}
                            </Button>
                        ))}
                    </motion.div>
                )}
                {buttons2.map((button, index) => (
                    <Button
                        key={index}
                        onPress={() => handleNavigation(button.path)}
                        className={`w-full font-poppins justify-start text-base ${!isOpen ? 'justify-center text-center' : ''} ${pathname === button.path
                            ? 'bg-primary text-white'
                            : 'bg-transparent text-white'
                            }`}
                        startContent={button.icon}
                    >
                        {isOpen && button.label}
                    </Button>
                ))} */}
                {/* <motion.div className="absolute right-0 bottom-3 mr-2">
                    <Button isIconOnly={true} className="bg-primary" onClick={handleOpen}>
                        {isOpen ? <IoArrowBackOutline color="white" size={18} /> : <IoArrowForwardOutline color="white" size={18} />}
                    </Button>
                </motion.div> */}
            </div>
        </motion.aside>
    );
}