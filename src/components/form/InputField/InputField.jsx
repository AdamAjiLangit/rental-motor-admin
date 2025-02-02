'use client';
import React, { useState } from 'react';
import { Field } from 'formik';
import { Input } from "@nextui-org/input";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

const InputField = ({ name, type, placeholder, customClassname, inputClassName, required }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Field name={name}>
            {({ field, meta }) => (
                <div className={`relative ${customClassname}`}>
                    <label htmlFor={name} className="capitalize text-sm md:text-base">{name}</label>
                    <div className={`relative w-full mt-2 ${type === 'number' ? 'flex items-center' : ''}`}>
                        {type === 'number' && (
                            <div className='bg-[#F4F4F5] p-[9px] rounded-xl z-50'>
                                <span className="text-[#71717A]">+62</span>
                            </div>
                        )}
                        <Input
                            id={name}
                            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                            placeholder={placeholder}
                            {...field}
                            isRequired={required}
                            aria-invalid={meta.touched && !!meta.error}
                            className={`w-full pl-${type === 'number' ? '12' : '4'} ${inputClassName}`}
                        />
                    </div>

                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-[41px] focus:outline-none"
                        >
                            {showPassword ? (
                                <IoEyeOutline className="h-5 w-5 text-gray" />
                            ) : (
                                <IoEyeOffOutline className="h-5 w-5 text-gray" />
                            )}
                        </button>
                    )}
                    {type === 'text' && (
                        <button
                            type="button"
                            className="absolute right-2 top-[41px] focus:outline-none"
                        >
                            <GoPerson className="h-5 w-5 text-gray" />
                        </button>
                    )}
                    {meta.touched && meta.error && (
                        <p className="mt-1 text-sm text-red-600">{meta.error}</p>
                    )}
                </div>
            )}
        </Field>
    );
};

export default InputField;
