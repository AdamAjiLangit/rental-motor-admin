'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
    Card, CardHeader, CardBody, CardFooter, Divider, Image, ModalContent,
    Button,
    Modal,
    ModalBody,
    useDisclosure,
    Progress,
} from "@nextui-org/react";
import { Formik, Form } from 'formik';
import { useRouter, usePathname, useParams } from 'next/navigation';
import * as Yup from 'yup';
import InputField from '../InputField/InputField';
import toast from 'react-hot-toast';
import SelectField from '../SelectField.jsx/SelectField';
import { IoArrowBack, IoInformationCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import Cookies from 'js-cookie';
import FetchEditMotor from '@/lib/CRUD/fetchEditMotor';

const EditMotorForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');

    const [motor, setMotor] = useState(null);
    const [motorImage, setMotorImage] = useState(null);
    const [motorName, setMotorName] = useState('');
    const [motorType, setMotorType] = useState('');
    const [merk, setMerk] = useState('');
    const [stock, setStock] = useState('');
    const [motorPrice1Day, setMotorPrice1Day] = useState('');
    const [motorPrice1Week, setMotorPrice1Week] = useState('');
    const [status, setStatus] = useState('');
    const [showStatus, setShowStatus] = useState('0');

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState(
        "https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg="
    );

    const defaultImageUrl = previewUrl;

    const validationSchema = Yup.object({
        //
    });

    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0];
        const maxSize = 2 * 1024 * 1024;

        if (!file) {
            setSelectedFile(null);
            setErrMessage('');
            return;
        };

        if (file.size > maxSize) {
            setErrMessage('Ukuran lebih dari 2MB');
            event.target.value = '';
            return;
        };

        setSelectedFile(file);
        setErrMessage('');
        setPreviewUrl(URL.createObjectURL(file));
        setUploadProgress(30);
        setTimeout(() => setUploadProgress(100), 1000);
    }, []);

    const handleReset = () => {
        setSelectedFile(null);
        setErrMessage('');
        setPreviewUrl(defaultImageUrl);
        setUploadProgress(0);
    };

    useEffect(() => {
        const fetchDetailMotor = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setMotor(response.data.listMotor);
                setMotorName(response.data.listMotor?.nama_motor);
                setMotorType(response.data.listMotor?.tipe_motor);
                setMerk(response.data.listMotor?.merk_motor);
                setStock(response.data.listMotor?.stok_motor);
                setMotorPrice1Day(response.data.listMotor?.harga_motor_per_1_hari);
                setMotorPrice1Week(response.data.listMotor?.harga_motor_per_1_minggu);
                setStatus(response.data.listMotor?.status_motor);
                setShowStatus(response.data.listMotor?.is_hidden);
                setPreviewUrl(`${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.listMotor?.gambar_motor}`);
                setMotorImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.listMotor?.gambar_motor}`);
            } catch (error) {
                console.error(error);
            };
        };

        if(id && token) {
            fetchDetailMotor();
        };
    }, [id, token]);

    const handleSubmit = async (values, actions) => {
        const loading = toast.loading('Loading...');
        try {
            const data = await FetchEditMotor(
                id,
                userId,
                selectedFile,
                motorName,
                motorType,
                merk,
                stock,
                motorPrice1Day,
                motorPrice1Week,
                0,
                status,
                showStatus
            );

            console.log(data);
            toast.success('Motor berhasil ditambahkan');
        } catch (error) {
            toast.error('Gagal menambahkan motor');
            console.error(error);
        } finally {
            toast.dismiss(loading);
            actions.setSubmitting(false);
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
        <Formik
            initialValues={{ motorname: '', motortype: '', merk: '', stock: '', motorprice1day: '', motorprice1week: '', status: '', showstatus: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5 text-white">
                    <div className='flex flex-col gap-5 w-fit mb-5'>
                        <h3 className='text-white text-sm'>Foto Motor</h3>
                        <div className='flex flex-col gap-2 items-center'>
                            <Image
                                alt="Profile Picture"
                                height={100}
                                width={100}
                                radius="md"
                                src={defaultImageUrl || motorImage}
                                className="border border-gray-300"
                            />
                            <p className='text-white'>Rasio 1:1</p>
                        </div>
                        <Button color='primary' onPress={onOpen} className='font-poppinsMedium text-sm'>Pilih Foto</Button>
                        <Modal
                            backdrop="blur"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            isDismissable={false}
                            placement='center'
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <div className='bg-[#1A1F1F] p-5 rounded-lg'>
                                        <ModalBody>
                                            <h3 className='text-white text-lg mb-2'>Unggah Foto Motor</h3>
                                            <Image
                                                alt="Profile Picture"
                                                height={100}
                                                width={100}
                                                radius="md"
                                                src={previewUrl}
                                                className="border border-gray-300 mb-2"
                                            />
                                            {errMessage && (
                                                <p className='text-red-500 text-sm'>{errMessage}</p>
                                            )}
                                            <p className='text-default-400 text-sm'>Ukuran gambar tidak lebih dari 2MB.</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="text-white file:rounded-md file:border-none file:bg-primary file:px-3 file:py-1 file:text-white hover:file:bg-primary/55 cursor-pointer text-sm"
                                            />
                                            {uploadProgress > 0 && (
                                                <Progress
                                                    color="primary"
                                                    value={uploadProgress}
                                                    className="mt-3"
                                                />
                                            )}
                                            <div className="flex justify-end gap-3 mt-5">
                                                <Button
                                                    color='danger'
                                                    className=''
                                                    onPress={handleReset}
                                                >Reset</Button>
                                                <Button
                                                    color='success'
                                                    className='text-white'
                                                    onPress={onClose}
                                                >Simpan</Button>
                                            </div>
                                        </ModalBody>
                                    </div>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <InputField name="motorname" value={motorName} onChange={(e) => setMotorName(e.target.value)} label="nama motor" type="text" placeholder="Masukkan nama motor" customClassname="w-full" required />
                        <SelectField name="motortype" value={motorType} onChange={setMotorType} options={[{ value: 'Matic', label: 'Matic' }, { value: 'Manual', label: 'Manual' }, { value: 'Premium Matic', label: 'Premium Matic' }, { value: 'Sport', label: 'Sport' }]} label="Jenis Motor" placeholder="Pilih jenis motor" customClassname="w-full" required />
                    </div>
                    <div className='flex flex-col md:flex-row gap-5 '>
                        <InputField name="merk" value={merk} onChange={(e) => setMerk(e.target.value)} label="merk" type="text" placeholder="Masukkan merk motor" customClassname="w-full" required />
                        <div className='flex flex-col gap-2 w-full'>
                            <InputField name="stock" label="stok" value={stock} onChange={(e) => setStock(e.target.value)} type="number" placeholder="Masukkan stok motor" customClassname="w-full" required />
                            <div className='flex items-center gap-1'>
                                <IoInformationCircleOutline className='text-default-400' />
                                <p className='text-default-400 text-sm'>Gunakan angka untuk memasang stok</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5 '>
                        <div className='flex flex-col gap-2 w-full'>
                            <InputField name="motorprice1day" value={motorPrice1Day} onChange={(e) => setMotorPrice1Day(e.target.value)} label="harga motor per 1 hari" type="number" placeholder="Masukkan harga motor" customClassname="w-full" required />
                            <div className='flex items-center gap-1'>
                                <IoInformationCircleOutline className='text-default-400' />
                                <p className='text-default-400 text-sm'>Gunakan angka untuk memasang stok</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <InputField name="motorprice1week" value={motorPrice1Week} onChange={(e) => setMotorPrice1Week(e.target.value)} label="harga motor per 1 minggu" type="number" placeholder="Masukkan harga motor" customClassname="w-full" required />
                            <div className='flex items-center gap-1'>
                                <IoInformationCircleOutline className='text-default-400' />
                                <p className='text-default-400 text-sm'>Gunakan angka untuk memasang stok</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='flex flex-col gap-2 w-full'>
                            <SelectField name="status" value={status} onChange={setStatus} options={[{ value: 'Tersedia', label: 'Tersedia' }, { value: 'Tidak Tersedia', label: 'Tidak Tersedia' }]} label="Status" placeholder="Pilih status" customClassname="w-full" required />
                            <div className='flex items-center gap-1'>
                                <IoInformationCircleOutline className='text-default-400' />
                                <p className='text-default-400 text-sm'>Pastikan stok motor kosong untuk status tidak tersedia</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <SelectField name="showstatus" value={showStatus} onChange={setShowStatus} options={[{ value: '0', label: 'Tampilkan' }, { value: '1', label: 'Sembunyikan' }]} label="Status Tampilkan Motor" placeholder="Pilih status" customClassname="w-full" required />
                            <div className='flex items-center gap-1'>
                                <IoInformationCircleOutline className='text-default-400' />
                                <p className='text-default-400 text-sm'>Pastikan stok motor kosong untuk status tidak tersedia</p>
                            </div>
                        </div>
                    </div>
                    <Button radius="md" className="bg-primary w-fit text-white text-sm" type="submit" isLoading={isSubmitting}>
                        Simpan
                    </Button>
                    <Button startContent={<IoArrowBack />} radius="md" variant='bordered' className="w-fit text-white text-sm" onPress={() => handleNavigation('/admin/daftarMotor')}>
                        Kembali
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EditMotorForm;
