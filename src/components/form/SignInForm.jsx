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

const SignInForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
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
            router.push('/admin');
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
                <BackgroundGradient className="rounded-[22px] max-w-xl lg:p-4 p-0 bg-zinc-900">
                    <Card className="lg:min-w-96 bg-zinc-900 lg:p-4 p-2 mx-auto">
                        <CardHeader className='flex flex-col gap-2 items-center justify-center max-w-96'>
                            <h2 className="text-base md:text-2xl font-bold text-white">Login To Your Account</h2>
                            <p className='text-gray text-sm md:text-base text-center font-normal'>Enter your details to sign in</p>
                        </CardHeader>
                        <CardBody>
                            <Form className="space-y-5 text-white">
                                <InputField name="email" type="email" placeholder="Enter your email" required />
                                <InputField name="password" type="password" placeholder="Enter your password" required />
                                <Link href="/forgotPassword" className="hover:underline flex items-end justify-end">
                                    <p className="text-gray-400 text-sm md:text-base">Forgot password?</p>
                                </Link>
                                <Button radius="lg" className="w-full bg-[#18B3AB] text-white text-sm md:text-base" type="submit" isLoading={isSubmitting}>
                                    Sign In
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </BackgroundGradient>
            )}
        </Formik>
    );
};

export default SignInForm;
