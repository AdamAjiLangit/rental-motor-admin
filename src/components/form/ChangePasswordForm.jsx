'use client';

import * as React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import * as Yup from 'yup';
import Link from 'next/link';
import { BackgroundGradient } from '../ui/background-gradient';
import InputField from './InputField/InputField';
import FetchLogin from '@/lib/fetchLogin';
import toast from 'react-hot-toast';
import TextareaField from './TextareaField/TextareaField';

const ChangePasswordForm = () => {
    const validationSchema = Yup.object({
        // username: Yup.string().username('Invalid username').required('username is required'),
        // fullname: Yup.string().fullname('Invalid fullname').required('Password is required'),
        // address: Yup.string().address('Invalid address').required('Address is required'),
        // phone: Yup.string().phone('Invalid phone').required('Phone is required'),
    });

    const handleSubmit = async (values, actions) => {
        const loading = toast.loading('Loading...');
        try {
            const data = await FetchLogin(values.email, values.password);

            const token = data.access_token;
            const userId = data.user.id;

            Cookies.set('token', token);
            Cookies.set('userId', userId);

            if (data.user.peran !== 'admin') {
                toast.error('You are not authorized to access this page');
                toast.dismiss(loading);
                return;
            };

            toast.success('Login successful');
            toast.dismiss(loading);
        } catch (error) {
            toast.error('Invalid email or password');
            toast.dismiss(loading);
            console.error(error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5 text-white">
                    <div className='flex flex-col gap-2'>
                        <InputField name="password baru" type="password" placeholder="Masukkan password baru" customClassname="w-full" />
                        <p className='text-sm text-default-500'>Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <InputField name="konfirmasi password baru" type="password" placeholder="konfirmasi password baru" customClassname="w-full" />
                    </div>
                    <Button radius="md" className="bg-primary w-fit text-white text-sm" type="submit" isLoading={isSubmitting}>
                        Simpan
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ChangePasswordForm;
