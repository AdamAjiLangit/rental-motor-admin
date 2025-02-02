'use client';

import { useState, useEffect } from 'react';

const useFetch = (url, token = null) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                    headers,
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
    }, [url, token]);

    return { data, isLoading, error };
};

export default useFetch;
