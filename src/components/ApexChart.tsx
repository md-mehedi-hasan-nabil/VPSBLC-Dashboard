import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FcCurrencyExchange } from 'react-icons/fc';
import { getAuth } from '../utils/getAuth';

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
            const email = getAuth()

            const response = await fetch(import.meta.env.VITE_API_URL + '/disbursement-info', {
                headers: {
                    'email': `${email}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        }
    })

    const { data: vpsblcInfo, isSuccess: isSuccessVpsblcInfo } = useQuery({
        queryKey: ['vpsblcInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/vpsblc-info', {
                headers: {
                    'email': `${getAuth()}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    const [dataLineCharPercentagest, setDataLineChartPercentages] = useState<number[]>([]);
    const [disbursementsPaid, setDisbursementsPaid] = useState<number[]>([]);


    useEffect(() => {
        if (isSuccessDisbursementInfo && isSuccessVpsblcInfo) {
            const lineCharts: number[] = [];
            const disbursements_paid_list: number[] = [];
            const xCategoriesValues: string[] = [];

            disbursementInfo.forEach((item: Disbursement) => {
                disbursements_paid_list.push(Number(item.disbursements_paid));
                lineCharts.push(Number(item.line_chart?.replace("%", "")));
                xCategoriesValues.push(item.disbursement);
            });

            const max = Math.max(...disbursements_paid_list)
            const list: number[] = []
            disbursements_paid_list.forEach(value => {
                const exact_value = (value * 100) / max
                list.push(exact_value)
            })

            setDisbursementsPaid(disbursements_paid_list);
            setDataLineChartPercentages(lineCharts)
        }
    }, [isSuccessDisbursementInfo, isSuccessVpsblcInfo, disbursementInfo, vpsblcInfo]);

    const chartOptions: ApexOptions = {
        series: [
            {
                name: 'Disbursement',
                type: 'column',
                data: disbursementsPaid
            },
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
        colors: ['#ebbf2c', '#4017fc'],
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
                    return val.toString()
                }
            },
            y: {
                formatter: function (val, { seriesIndex, dataPointIndex, w }) {
                    if (w.config.series[seriesIndex].type === 'column') {
                        return val.toString();
                    } else if (w.config.series[seriesIndex].type === 'line') {
                        return dataLineCharPercentagest[dataPointIndex] + "%";
                    }
                    return val.toString();
                }
            }
        },
        xaxis: {
            // categories: xCategories,
        },
        yaxis: {
            min: 0,
            max: Math.max(...disbursementsPaid) + 1000,
            labels: {
                formatter: (value: number) => {
                    if (value === 0) {
                        return "$" + value;
                    } 
                    else if (value > 0 && value < 1000) {
                        return "$" + value;
                    } 
                    else {
                        return "$" + ((value / 1000) * 2) + "K";
                    }
                }
            }
        }
    };

    return (
        <div id="growth-analytics" className='pt-4' >
            <div className="overflow-hidden">
                <div className='bg-white p-4 rounded-2xl'>
                    <div className='flex items-center gap-4'>
                        <FcCurrencyExchange className='text-2xl md:text-5xl' />
                        <p className='text-2xl'>Program Performance</p>
                    </div>
                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
                </div>
            </div>
        </div >
    );
}
