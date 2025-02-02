'use client';
import React from 'react';
import { Field } from 'formik';
import { Textarea } from "@nextui-org/input";

const TextareaField = ({ name, placeholder, customClassname, inputClassName, required }) => {
    return (
        <Field name={name}>
            {({ field, meta }) => (
                <div className={`relative ${customClassname}`}>
                    <label htmlFor={name} className="capitalize text-sm md:text-base">{name}</label>
                    <Textarea
                        id={name}
                        placeholder={placeholder}
                        {...field}
                        isRequired={required}
                        aria-invalid={meta.touched && !!meta.error}
                        className={`w-full mt-2 ${inputClassName}`}
                    />
                    {meta.touched && meta.error && (
                        <p className="mt-1 text-sm text-red-600">{meta.error}</p>
                    )}
                </div>
            )}
        </Field>
    );
};

export default TextareaField;
