'use client';

import { useState, useEffect, useMemo } from 'react';

const useFetchMethod = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const memoizedOptions = useMemo(() => options, [options]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { method = 'GET', headers = {}, body = null, token = null } = memoizedOptions;

                const defaultHeaders = {
                    'Content-Type': 'application/json',
                };

                if (token) {
                    defaultHeaders['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                    method,
                    headers: { ...defaultHeaders, ...headers },
                    body: body ? JSON.stringify(body) : null,
                });

                if (!response.ok) {
                    throw Error('Something went wrong');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, memoizedOptions]);

    return { data, isLoading, error };
};

export default useFetchMethod;
