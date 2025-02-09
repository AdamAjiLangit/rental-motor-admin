'use client';

import * as React from 'react';
import { useState } from 'react';
import {
    Card, CardHeader, CardBody, CardFooter, Divider, Image, ModalContent,
    Button,
    Modal,
    ModalBody,
    useDisclosure,
    Progress,
} from "@nextui-org/react";
import { Formik, Form } from 'formik';
import { useRouter, usePathname } from 'next/navigation';
import * as Yup from 'yup';
import InputField from '../InputField/InputField';
import toast from 'react-hot-toast';
import SelectField from '../SelectField.jsx/SelectField';
import { IoArrowBack, IoInformationCircleOutline } from 'react-icons/io5';
import FetchAddDiscount from '@/lib/CRUD/fetchAddDiscount';

const AddDiscountForm = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState("https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=");
    const defaultImageUrl = "https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=";

    const validationSchema = Yup.object({
        // username: Yup.string().username('Invalid username').required('username is required'),
        // fullname: Yup.string().fullname('Invalid fullname').required('Password is required'),
        // address: Yup.string().address('Invalid address').required('Address is required'),
        // phone: Yup.string().phone('Invalid phone').required('Phone is required'),
    });

    const handleFileChange = (event) => {
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
    };

    const handleReset = () => {
        setSelectedFile(null);
        setErrMessage('');
        setPreviewUrl(defaultImageUrl);
        setUploadProgress(0);
    };

    const handleSubmit = async (values, actions) => {
        const loading = toast.loading('Loading...');

        try {
            if (!selectedFile) {
                toast.error("Harap unggah gambar diskon!");
                toast.dismiss(loading);
                return;
            };

            const data = await FetchAddDiscount(
                selectedFile,
                values.discountname,
                values.discount,
                values.startdate,
                values.enddate,
                values.showstatus,
            );

            console.log(data);
            toast.success('Diskon berhasil ditambahkan');
            router.refresh();
        } catch (error) {
            toast.error('Gagal menambahkan diskon');
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
            initialValues={{ discountname: '', discount: '', startdate: '', enddate: '', showstatus: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5 text-white">
                    <div className='flex flex-col gap-5 w-fit mb-5'>
                        <h3 className='text-white text-sm'>Foto Diskon (Optional)</h3>
                        <div className='flex flex-col gap-2 items-center'>
                            <Image
                                alt="Profile Picture"
                                height={100}
                                width={100}
                                radius="md"
                                src={previewUrl}
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
                    <div className='flex flex-col md:flex-row gap-5 '>
                        <InputField name="discountname" label="nama diskon" type="text" placeholder="Masukkan nama diskon" customClassname="w-full" required />
                        <div className='flex flex-col gap-2 w-full'>
                            <InputField name="discount" label="potongan harga" type="number" placeholder="Masukkan potongan harga %" customClassname="w-full" required />
                            <div className='flex items-center gap-1'>
                                <IoInformationCircleOutline className='text-default-400' />
                                <p className='text-default-400 text-sm'>Gunakan angka untuk potongan harga %</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5 '>
                        <InputField name="startdate" label="Tanggal Mulai" type="date" placeholder="Masukkan tanggal mulai" customClassname="w-full" inputClassName="text-default-500" required />
                        <InputField name="enddate" label="Tanggal Selesai" type="date" placeholder="Masukkan tanggal selesai" customClassname="w-full" inputClassName="text-default-500" required />
                    </div>
                    <div className='flex flex-col md:flex-row gap-5 '>
                        <SelectField name="showstatus" options={[{ value: '0', label: 'Tampilkan' }, { value: '1', label: 'Sembunyikan' }]} label="Status Tampilkan Diskon" placeholder="Pilih status" customClassname="w-full" required />
                    </div>
                    <Button radius="md" className="bg-primary w-fit text-white text-sm" type="submit" isLoading={isSubmitting}>
                        Simpan
                    </Button>
                    <Button startContent={<IoArrowBack />} radius="md" variant='bordered' className="w-fit text-white text-sm" onPress={() => handleNavigation('/admin/daftarDiskon')}>
                        Kembali
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default AddDiscountForm;
