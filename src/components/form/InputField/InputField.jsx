'use client';
import React, { useState } from 'react';
import { Field } from 'formik';
import { Input } from "@nextui-org/input";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

const InputField = ({
    name,
    type,
    label,
    placeholder,
    customClassname,
    inputClassName,
    required,
    value,
    onChange
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isControlled = value !== undefined && onChange !== undefined;

    return (
        <Field name={name}>
            {({ field, meta }) => (
                <div className={`relative ${customClassname}`}>
                    <label htmlFor={name} className="capitalize text-sm md:text-base">{label}</label>
                    <div className={`relative w-full mt-2`}>
                        <Input
                            id={name}
                            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                            placeholder={placeholder}
                            isRequired={required}
                            aria-invalid={meta.touched && !!meta.error}
                            className={`w-full ${inputClassName}`}
                            value={isControlled ? value : field.value}
                            onChange={isControlled ? onChange : field.onChange}
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
