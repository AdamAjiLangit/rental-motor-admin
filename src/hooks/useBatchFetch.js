'use client';

import { useState, useEffect } from 'react';

const useBatchFetch = (urls, token) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const defaultHeaders = {
                    'Content-Type': 'application/json',
                };

                if (token) {
                    defaultHeaders['Authorization'] = `Bearer ${token}`;
                }

                const fetchPromises = urls.map((url) =>
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                        headers: defaultHeaders,
                    }).then((res) => {
                        if (!res.ok) throw Error(`Failed to fetch: ${url}`);
                        return res.json();
                    })
                );

                const results = await Promise.all(fetchPromises);
                setData(results);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [urls, token]);

    return { data, isLoading, error };
};

export default useBatchFetch;
