"use client";

import dynamic from "next/dynamic";

const AddDiscountComponent = dynamic(() => import('@/components/pages/DiscountList/addDiscount/AddDiscountComponent'), {
    ssr: false,
});

const AddDiscount = () => {
    return (
        <div className="min-h-screen bg-[#060E0E]">
            <AddDiscountComponent />
        </div>
    )
}

export default AddDiscount