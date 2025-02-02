'use client';

import { useState, useEffect } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IconHistory, IconMotorbike, IconStarFilled, IconUserFilled } from "@tabler/icons-react";
import useFetch from "@/hooks/useFetch";
import Cookies from "js-cookie";

export function CardHoverEffect() {
    const token = Cookies.get("token");
    console.log('token', token);
    const { data: motors, isLoading, error } = useFetch('/api/list-motor/all');
    const { data: rents } = useFetch('/api/history/all', token);
    const { data: review } = useFetch('/api/review/all');
    const { data: user } = useFetch('/api/user/all');
    const totalMotor = motors?.listMotor?.length || 0;
    const totalRents = rents?.history?.length || 0;
    const totalReview = review?.review?.length || 0;
    const totalUser = user?.user?.length || 0;

    const projects = [
        {
            title: "Total Motor",
            value: isLoading ? "Loading..." : totalMotor,
            stat: "-5%",
            icon: <IconMotorbike size={25} />,
            color: "blue",
        },
        {
            title: "Total Sewa",
            value: isLoading ? "Loading..." : totalRents,
            stat: "-5%",
            icon: <IconHistory size={25} />,
            color: "pink",
        },
        {
            title: "Total Ulasan",
            value: isLoading ? "Loading..." : totalReview,
            stat: "-5%",
            icon: <IconStarFilled size={25} />,
            color: "green",
        },
        {
            title: "Total Pengguna",
            value: isLoading ? "Loading..." : totalUser,
            stat: "-5%",
            icon: <IconUserFilled size={25} />,
            color: "orange",
        },
    ];

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    };

    if (typeof window !== 'undefined') {
        console.log("Window Test");
    };

    return (
        <div className="w-full mt-6">
            <HoverEffect items={projects} />
        </div>
    );
}
