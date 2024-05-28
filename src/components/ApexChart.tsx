import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FcCurrencyExchange } from 'react-icons/fc';
import { VPSBLCStatus } from '../types';

export interface Disbursement {
    disbursement: string;
    date_paid: string;
    disbursements_paid: string;
    disbursements_expected: string;
    line_chart: string;
    blockchain_tx_url: string;
}

export default function ApexChart() {
    const { data: disbursementInfo, isSuccess: isSuccessDisbursementInfo } = useQuery({
        queryKey: ['disbursementInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/disbursement-info')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    const { data: vpsblcInfo, isSuccess: isSuccessVpsblcInfo } = useQuery({
        queryKey: ['vpsblcInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/vpsblc-info')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    const [data, setData] = useState<number[] | []>([])
    const [xCategories, setXCategories] = useState<string[] | []>([])

    useEffect(() => {
        if (isSuccessDisbursementInfo && isSuccessVpsblcInfo) {
            // const values1: number[] = [];
            const values2: number[] = [];
            const xCategoriesValues: string[] = []
            const disbursements_expected_list: number[] = [];
            const VPSBLC_Funding = (vpsblcInfo as VPSBLCStatus)['VPSBLC Funding Status']?.replace("FUNDED", "")?.replace("$", "")?.trim()

            disbursementInfo.forEach((item: Disbursement) => {
                disbursements_expected_list.push(Number(item.disbursements_expected))


                // values1.push(Number(item.disbursements_expected))
                values2.push(Number(item.line_chart.replace("%", "")))
                xCategoriesValues.push(item.disbursement)
            })

            // disbursement_1 = ""

            console.log(VPSBLC_Funding)

            console.log(disbursements_expected_list)
            setData(values2)
            setXCategories(xCategoriesValues)

        }
    }, [isSuccessDisbursementInfo, isSuccessVpsblcInfo, disbursementInfo, vpsblcInfo])

    // console.log(disbursementInfo)

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
        tooltip: {
            x: {
                formatter: function (val) {
                    return (val * 10) + "%"
                }
            }
        },
        xaxis: {
            categories: xCategories,
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 20,
            labels: {
                formatter: (value: number) => {
                    if (value === 0 || value === 20 || value === 40 || value === 60 || value === 80 || value === 100) {
                        return value.toString();
                    } else {
                        return '';
                    }
                }
            }
        },
    };

    return (
        <div id="growth-analytics" className='pt-4' >
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
        </div >
    );
}
