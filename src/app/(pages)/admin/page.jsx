"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const DashboardComponent = dynamic(() => import('@/components/pages/Dashboard/DashboardComponent'), {
    ssr: false,
});

const Dashboard = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log("Window Test");
        }
    }, []);

    return <div className="min-h-screen bg-[#060E0E]">
        <DashboardComponent />
    </div>;
};

export default Dashboard;
