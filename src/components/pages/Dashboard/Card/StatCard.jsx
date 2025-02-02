import { Divider } from '@nextui-org/react';
import React from 'react';

const colorClassMap = {
    blue: "bg-blue-500 from-blue-600 to-blue-400 shadow-blue-500/40",
    pink: "bg-pink-500 from-pink-600 to-pink-400 shadow-pink-500/40",
    green: "bg-green-500 from-green-600 to-green-400 shadow-green-500/40",
    orange: "bg-orange-500 from-orange-600 to-orange-400 shadow-orange-500/40",
    red: "bg-red-500 from-red-600 to-red-400 shadow-red-500/40",
};

const StatCard = ({ icon, title, value, stat, color }) => {
    const colorClasses = colorClassMap[color] || "bg-gray-500 from-gray-600 to-gray-400 shadow-gray-500/40";

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-[#1A1F1F] shadow-md">
            <div className={`mx-4 rounded-xl overflow-hidden bg-gradient-to-tr text-white absolute -mt-4 grid h-16 w-16 place-items-center ${colorClasses}`}>
                {icon}
            </div>
            <div className="px-4 text-right">
                <p className="block mt-5 antialiased text-sm leading-normal font-medium text-white">{title}</p>
                <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug text-white">{value}</h4>
            </div>
            <Divider className='my-4 bg-white' />
            <div className='flex items-center justify-center mb-4'>
                <p className='text-base text-red-500'>{stat} <span className='text-white'>dari minggu lalu</span></p>
            </div>
        </div>
    );
};

export default StatCard;