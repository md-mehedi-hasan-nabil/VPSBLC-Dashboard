import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FcCurrencyExchange } from 'react-icons/fc';

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
    const [disbursements, setDisbursements] = useState<number[] | []>([])

    useEffect(() => {
        if (isSuccessDisbursementInfo && isSuccessVpsblcInfo) {
            const values: number[] = [];
            const xCategoriesValues: string[] = []
            const disbursements_expected_list: number[] = [];
            // const VPSBLC_Funding = (vpsblcInfo as VPSBLCStatus)['VPSBLC Funding Status']?.replace("FUNDED", "")?.replace("$", "")?.trim()

            disbursementInfo.forEach((item: Disbursement) => {
                disbursements_expected_list.push(Number(item.disbursements_expected))
                values.push(Number(item.line_chart.replace("%", "")))
                xCategoriesValues.push(item.disbursement)
            })

            setDisbursements(disbursements_expected_list)
            setData(values)
            setXCategories(xCategoriesValues)

        }
    }, [isSuccessDisbursementInfo, isSuccessVpsblcInfo, disbursementInfo, vpsblcInfo])


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
                formatter: function (_val, { dataPointIndex }) {
                    console.log(dataPointIndex)
                    return "Disbursement - " + disbursements[dataPointIndex]
                }
            },
            y: {
                formatter: function (val) {
                    return val + "%"
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
                    if (value === 0 || value === 10 || value === 20 || value === 30 || value === 40 || value === 50 ||
                        value === 60 || value === 70 || value === 80 || value === 90 || value === 100
                    ) {
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
