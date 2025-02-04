'use client';
import React from 'react';
import { Field } from 'formik';
import { Select, SelectItem } from "@nextui-org/react";

const SelectField = ({ name, options, label, placeholder, customClassname, required }) => {
    return (
        <Field name={name}>
            {({ field, form, meta }) => (
                <div className={`relative ${customClassname}`}>
                    <label htmlFor={name} className="capitalize text-sm md:text-base">{label}</label>
                    <Select
                        id={name}
                        name={name}
                        aria-invalid={meta.touched && !!meta.error}
                        selectedKeys={[field.value]}
                        onSelectionChange={(selected) =>
                            form.setFieldValue(name, Array.from(selected)[0])
                        }
                        placeholder={placeholder}
                        isRequired={required}
                        className="mt-2 w-full"
                    >
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    {meta.touched && meta.error && (
                        <p className="mt-1 text-sm text-red-600">{meta.error}</p>
                    )}
                </div>
            )}
        </Field>
    );
};

export default SelectField;
