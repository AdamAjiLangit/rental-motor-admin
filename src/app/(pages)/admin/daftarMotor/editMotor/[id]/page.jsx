"use client";

import dynamic from "next/dynamic";

const EditMotorComponent = dynamic(() => import('@/components/pages/MotorList/editMotor/EditMotorComponent'), {
    ssr: false,
});

const EditMotor = () => {
    return (
        <div className="min-h-screen bg-[#060E0E]">
            <EditMotorComponent />
        </div>
    )
}

export default EditMotor