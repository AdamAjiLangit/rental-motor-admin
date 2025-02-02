import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export const useAxiosGet = (url, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(url, { headers });
                if (isMounted) setData(response.data);
            } catch (err) {
                if (isMounted) setError(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, headers]);

    return { data, loading, error };
};


export const useAxiosPost = (url, headers = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (body) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(url, body, { headers });
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { postData, loading, error };
};

export const useAxiosPut = (url, headers = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const putData = async (body) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(url, body, { headers });
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { putData, loading, error };
};

export const useAxiosDelete = (url, headers = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(url, { headers });
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteData, loading, error };
};
