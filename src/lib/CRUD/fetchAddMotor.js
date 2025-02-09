import Cookies from "js-cookie";

const FetchAddMotor = async (gambarMotor, namaMotor, tipeMotor, merkMotor, stokMotor, hargaMotorPer1Hari, hargaMotorPer1Minggu, hargaMotorDiantar, statusMotor, isHidden) => {
    const token = Cookies.get("token");
    try {
        const formData = new FormData();
        formData.append("gambar_motor", gambarMotor);
        formData.append("nama_motor", namaMotor);
        formData.append("tipe_motor", tipeMotor);
        formData.append("merk_motor", merkMotor);
        formData.append("stok_motor", stokMotor);
        formData.append("harga_motor_per_1_hari", hargaMotorPer1Hari);
        formData.append("harga_motor_per_1_minggu", hargaMotorPer1Minggu);
        formData.append("harga_motor_diantar", hargaMotorDiantar);
        formData.append("status_motor", statusMotor);
        formData.append("is_hidden", isHidden);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error ${response.status}:`, errorText);
            throw new Error(`Failed to add motor. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("FetchAddMotor Error:", error.message);
        throw error;
    }
};

export default FetchAddMotor;
