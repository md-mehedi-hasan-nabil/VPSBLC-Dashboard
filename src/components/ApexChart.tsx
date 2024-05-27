import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FcCurrencyExchange } from 'react-icons/fc';

interface Disbursement {
    disbursement: string;
    date_paid: string;
    disbursements_paid: number;
    disbursements_expected: number;
    blockchain_tx_url: string;
}

export default function ApexChart() {
    const { data: disbursementInfo, isSuccess } = useQuery({
        queryKey: ['disbursementInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/disbursement-info')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    const [data, setData] = useState<number[] | []>([])
    const [xCategories, setXCategories] = useState<string[] | []>([])

    useEffect(() => {
        if (isSuccess) {
            const values: number[] = [];
            const xCategoriesValues: string[] = []

            disbursementInfo.forEach((item: Disbursement) => {
                values.push(item.disbursements_expected)
                xCategoriesValues.push(item.disbursement)
            })

            setData(values)
            setXCategories(xCategoriesValues)

        }
    }, [isSuccess, disbursementInfo])


    const chartOptions: ApexOptions = {
        series: [
            {
                name: "Trade Performance",
                data
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#4017fc'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: "",
            align: 'left',
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: xCategories,
        },
        yaxis: {
            min: 20,
            max: Math.max(...data)
        },
    };

    return (
        <div id="growth-analytics" className='pb-4 pt-4'>
            <div className="overflow-hidden">
                <h2 className="my-5 text-3xl text-[#343C6A] font-semibold">GROWTH ANALYICS</h2>
                <div className='bg-white p-4 rounded-2xl'>
                    <div className='flex items-center gap-4'>
                        <FcCurrencyExchange className='text-2xl md:text-5xl' />
                        <p className='text-2xl'>Trade Performance</p>
                    </div>
                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
                </div>
            </div>
        </div>
    );
}
