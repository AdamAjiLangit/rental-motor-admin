'use client';

import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
} from "@nextui-org/react";
import Chart from "react-apexcharts";

import { Button, Dropdown, DropdownTrigger, DropdownMenu, Divider, DropdownItem } from "@nextui-org/react";
import Cookies from "js-cookie";

const ChartComponent = () => {
    const [history, setHistory] = useState([]);
    const [activeComponent, setActiveComponent] = useState('chartDay');
    const [totalHistory, setTotalHistory] = useState(0);
    const token = Cookies.get('token');
    const [chartData, setChartData] = useState({
        type: 'line',
        height: 240,
        series: [
            {
                name: "Total Sewa",
                data: [],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#8979FF"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#fff",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Senin",
                    "Selasa",
                    "Rabu",
                    "Kamis",
                    "Jum`at",
                    "Sabtu",
                    "Minggu",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#fff",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    });

    const fetchData = async (filter) => {
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/history/filtered?filter=${filter}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            const responseText = await response.text();

            const fetchData = JSON.parse(responseText);

            setHistory(fetchData.data || []);

            if (fetchData.data) {
                if (filter === '7_hari') {
                    const daysOfWeek = {
                        "Senin": 0,
                        "Selasa": 0,
                        "Rabu": 0,
                        "Kamis": 0,
                        "Jum`at": 0,
                        "Sabtu": 0,
                        "Minggu": 0,
                    };

                    fetchData.data.forEach(entry => {
                        const dayName = getDayName(entry.hari_dalam_minggu);
                        if (daysOfWeek[dayName] !== undefined) {
                            daysOfWeek[dayName] += 1;
                        }
                    });

                    const totalHistoryArray = Object.values(daysOfWeek);
                    const totalSewa = totalHistoryArray.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: totalHistoryArray,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jum`at", "Sabtu", "Minggu"],
                            },
                        },
                    }));
                } else if (filter === '4_minggu') {
                    const weeks = [0, 0, 0, 0];

                    fetchData.data.forEach(entry => {
                        const weekNumber = entry.minggu_dalam_bulan;
                        if (weeks[weekNumber - 1] !== undefined) {
                            weeks[weekNumber - 1] += 1;
                        }
                    });

                    const totalSewa = weeks.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: weeks,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
                            },
                        },
                    }));
                } else if (filter === '6_bulan') {
                    const months = {
                        "Jan": 0,
                        "Feb": 0,
                        "Mar": 0,
                        "Apr": 0,
                        "May": 0,
                        "June": 0,
                    };

                    fetchData.data.forEach(entry => {
                        const monthName = getMonthName(entry.bulan);
                        if (months[monthName] !== undefined) {
                            months[monthName] += 1;
                        }
                    });

                    const totalHistoryArray = Object.values(months);
                    const totalSewa = totalHistoryArray.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: totalHistoryArray,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
                            },
                        },
                    }));
                } else if (filter === '5_tahun') {
                    const years = {};
                    const currentYear = new Date().getFullYear();

                    for (let i = 0; i < 5; i++) {
                        years[currentYear + i] = 0;
                    }

                    fetchData.data.forEach(entry => {
                        const year = entry.tahun;
                        if (years[year] !== undefined) {
                            years[year] += 1;
                        }
                    });

                    const totalHistoryArray = Object.values(years);
                    const totalSewa = totalHistoryArray.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: totalHistoryArray,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: Object.keys(years),
                            },
                        },
                    }));
                    console.log(`Fetching data for ${filter}`);
                }
            } else {
                console.warn('No history data found');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const getDayName = (day) => {
        const days = {
            "Monday": "Senin",
            "Tuesday": "Selasa",
            "Wednesday": "Rabu",
            "Thursday": "Kamis",
            "Friday": "Jum`at",
            "Saturday": "Sabtu",
            "Sunday": "Minggu",
        };
        return days[day];
    };

    const getMonthName = (month) => {
        const months = {
            "Jan": "Jan",
            "Feb": "Feb",
            "Mar": "Mar",
            "Apr": "Apr",
            "May": "May",
            "June": "June",
        };
        return months[month];
    };

    useEffect(() => {
        fetchData('7_hari');
    }, []);

    const handleButtonClick = (buttonType) => {
        setActiveComponent(buttonType);

        switch (buttonType) {
            case 'chartDay':
                fetchData('7_hari');
                break;
            case 'chartWeek':
                fetchData('4_minggu');
                break;
            case 'chartMonth':
                fetchData('6_bulan');
                break;
            case 'chartYear':
                fetchData('5_tahun');
                break;
            default:
                break;
        }
    }

    return (
        <Card className="mb-20 xl:mb-0 bg-[#1A1F1F]">
            <CardHeader
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div className="w-full flex md:justify-center justify-end items-start mt-2">
                    <div className="md:flex hidden gap-5">
                        <button className={`flex items-center gap-2 ${activeComponent === 'chartDay' ? 'text-[#8979FF]' : ''}`} onClick={() => handleButtonClick('chartDay')}>
                            <img src="/assets/icons/7day.png" alt="icon" />
                            <label className={`text-sm cursor-pointer font-poppinsSemiBold ${activeComponent !== 'chartDay' ? 'text-white' : ''}`}>
                                7 Hari Terakhir
                            </label>
                        </button>
                        <button className={`flex items-center gap-2 ${activeComponent === 'chartWeek' ? 'text-[#8979FF]' : ''}`} onClick={() => handleButtonClick('chartWeek')}>
                            <img src="/assets/icons/4week.png" alt="icon" />
                            <label className={`text-sm cursor-pointer font-poppinsSemiBold ${activeComponent !== 'chartWeek' ? 'text-white' : ''}`}>
                                4 Minggu Terakhir
                            </label>
                        </button>
                        <button className={`flex items-center gap-2 ${activeComponent === 'chartMonth' ? 'text-[#8979FF]' : ''}`} onClick={() => handleButtonClick('chartMonth')}>
                            <img src="/assets/icons/6month.png" alt="icon" />
                            <label className={`text-sm cursor-pointer font-poppinsSemiBold ${activeComponent !== 'chartMonth' ? 'text-white' : ''}`}>
                                6 Bulan Terakhir
                            </label>
                        </button>
                        <button className={`flex items-center gap-2 ${activeComponent === 'chartYear' ? 'text-[#8979FF]' : ''}`} onClick={() => handleButtonClick('chartYear')}>
                            <img src="/assets/icons/5year.png" alt="icon" />
                            <label className={`text-sm cursor-pointer font-poppinsSemiBold ${activeComponent !== 'chartYear' ? 'text-white' : ''}`}>
                                5 Tahun Terakhir
                            </label>
                        </button>
                    </div>
                    <Dropdown>
                        <DropdownTrigger className="md:hidden flex">
                            <Button variant="bordered" className="text-white">Category</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Category Actions">
                            <DropdownItem value="chartDay" onPress={() => handleButtonClick('chartDay')} className={`${activeComponent === 'chartDay' ? 'text-[#8979FF]' : ''}`}>7 Hari</DropdownItem>
                            <DropdownItem value="chartWeek" onPress={() => handleButtonClick('chartWeek')} className={`${activeComponent === 'chartWeek' ? 'text-[#8979FF]' : ''}`}>4 Minggu</DropdownItem>
                            <DropdownItem value="chartMonth" onPress={() => handleButtonClick('chartMonth')} className={`${activeComponent === 'chartMonth' ? 'text-[#8979FF]' : ''}`}>6 Bulan</DropdownItem>
                            <DropdownItem value="chartYear" onPress={() => handleButtonClick('chartYear')} className={`${activeComponent === 'chartYear' ? 'text-[#8979FF]' : ''}`}>5 Tahun</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0 text-white overflow-hidden">
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type={chartData.type}
                    height={chartData.height} />
            </CardBody>
        </Card>
    );
}

export default ChartComponent;