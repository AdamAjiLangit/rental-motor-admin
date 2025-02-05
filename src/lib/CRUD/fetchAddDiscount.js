import Cookies from "js-cookie";

const FetchAddDiscount = async (discountImage, discountName, discount, startDate, endDate, isHidden) => {
    const token = Cookies.get("token");
    try {
        const formData = new FormData();
        formData.append("gambar", discountImage);
        formData.append("nama_diskon", discountName);
        formData.append("potongan_harga", discount);
        formData.append("tanggal_mulai", startDate);
        formData.append("tanggal_selesai", endDate);
        formData.append("is_hidden", isHidden);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error ${response.status}:`, errorText);
            throw new Error(`Failed to add diskon. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("FetchAddDiscount Error:", error.message);
        throw error;
    }
};

export default FetchAddDiscount;
