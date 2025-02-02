const FetchProfile = async (email, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Response body:', await response.text());
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
};

export default FetchProfile;