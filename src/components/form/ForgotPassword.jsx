'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter, InputOtp, Divider } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from 'react-icons/io5';
import { BackgroundGradient } from '../ui/background-gradient';
import InputField from './InputField/InputField';
import * as Yup from 'yup';
import Link from 'next/link';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
})

export const ForgotPasswordForm = () => {
    const initialValues = { username: '', password: '', email: '' };
    const [value, setValue] = useState('');
    const router = useRouter();

    const handleSubmit = async (values, actions) => {
        try {
            console.log({ values, actions });
            await sleep(1000);
            // alert(JSON.stringify(values, null, 2));
        } catch (error) {
            console.error(error);
        } finally {
            router.push('/');
            actions.setSubmitting(false);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <BackgroundGradient className="rounded-[22px] max-w-xl lg:p-4 p-0 bg-zinc-900">
                    <Card className="lg:min-w-96 bg-zinc-900 lg:p-4 p-2 mx-auto">
                        <CardHeader className='flex flex-col gap-2 items-center justify-center max-w-96'>
                            <h2 className="text-2xl font-bold text-white ">Forgot Password</h2>
                            <p className='text-gray-400 text-center font-normal'>Hey, Enter your email to recieve otp code</p>
                        </CardHeader>
                        <CardBody>
                            <Form className="space-y-5 text-white">
                                <div className="flex flex-col items-center justify-center gap-2 w-full">
                                    <InputOtp color='primary' size='lg' radius='lg' classNames={{ segmentWrapper: 'gap-x-5' }} length={4} value={value} onValueChange={setValue} />
                                </div>
                                <div className=''></div>
                                <div className='flex items-center justify-center'>
                                    <p className='text-white'>OTP not receive? </p>
                                    <Button className='cursor-pointer bg-transparent text-blue-400 underline' disableRipple={true}>
                                        <p className='text-base'>Send again</p>
                                    </Button>
                                </div>
                                <Button radius='lg' className='w-full bg-[#18B3AB] text-white' type="submit" isLoading={isSubmitting}>
                                    Verify
                                </Button>
                                <div className='flex items-center justify-center'>
                                    <Divider className="bg-gray-400" />
                                </div>
                                <Link href='/signIn' className='hover:underline cursor-pointer flex items-center justify-center'>
                                    <p className='text-gray-400'>Back to Sign In</p>
                                </Link>
                                {/* <p className='text-center text-gray-400'>Or Sign in with</p>
                                <div className='flex items-center justify-center gap-2'>
                                    <Button radius='lg' color='secondary' className='w-full'>
                                        <FcGoogle size={20} className='mr-2' />
                                        Google
                                    </Button>
                                    <Button radius='lg' color='secondary' className='w-full'>
                                        <IoLogoFacebook size={20} className='mr-2' />
                                        Facebook
                                    </Button>
                                </div> */}
                            </Form>
                        </CardBody>
                    </Card>
                </BackgroundGradient>
            )}
        </Formik>
    );
};