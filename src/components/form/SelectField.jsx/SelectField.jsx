'use client';
import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
import { Select, SelectItem } from "@nextui-org/react";

const SelectField = ({ name, options, label, placeholder, customClassname, required, value, onChange }) => {
    const [selectedValue, setSelectedValue] = useState(value || "");

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value.toString());
        }
    }, [value]);

    return (
        <Field name={name}>
            {({ field, form, meta }) => (
                <div className={`relative ${customClassname}`}>
                    <label htmlFor={name} className="capitalize text-sm md:text-base">{label}</label>
                    <Select
                        id={name}
                        name={name}
                        aria-invalid={meta.touched && !!meta.error}
                        selectedKeys={[selectedValue]}
                        onSelectionChange={(selected) => {
                            const newValue = Array.from(selected)[0].toString();
                            setSelectedValue(newValue);
                            if (onChange) onChange(newValue);
                            form.setFieldValue(name, newValue);
                        }}
                        placeholder={placeholder}
                        isRequired={required}
                        className="mt-2 w-full"
                    >
                        {options.map((option) => (
                            <SelectItem key={option.value.toString()} value={option.value.toString()}>
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
