"use client";

import dynamic from "next/dynamic";

const AddMotorComponent = dynamic(() => import('@/components/pages/MotorList/addMotor/AddMotorComponent'), {
    ssr: false,
});

const AddMotor = () => {
    return (
        <div className="min-h-screen bg-[#060E0E]">
            <AddMotorComponent />
        </div>
    )
}

export default AddMotor