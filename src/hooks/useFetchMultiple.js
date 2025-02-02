'use client';

import { useState, useEffect } from 'react';

const useFetchMultiple = (urls) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    urls.map(url => fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`))
                );

                const results = await Promise.all(
                    responses.map(response => {
                        if (!response.ok) {
                            throw new Error('Something went wrong');
                        }
                        return response.json();
                    })
                );

                setData(results);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [urls]);

    return { data, isLoading, error };
};

export default useFetchMultiple;
