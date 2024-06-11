import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import money from "../assets/money.svg"
import { getAuth } from '../utils/getAuth';
import analysisIcon from "../assets/analysis.svg"
import { addComma } from '../utils/addComma';

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

    // const [dataLineCharPercentagest, setDataLineChartPercentages] = useState<number[]>([]);
    const [disbursementsPaid, setDisbursementsPaid] = useState<number[]>([]);

    useEffect(() => {
        if (isSuccessDisbursementInfo && isSuccessVpsblcInfo) {
            // const lineCharts: number[] = [];
            const disbursements_paid_list: number[] = [];
            const xCategoriesValues: string[] = [];
            const disbursement_date_paid: string[] = [];

            disbursementInfo.forEach((item: Disbursement) => {
                disbursements_paid_list.push(Number(item.disbursements_paid));
                // lineCharts.push(Number(item.line_chart?.replace("%", "")));
                xCategoriesValues.push(item.disbursement);
                disbursement_date_paid.push(item.date_paid)
            });

            const max = Math.max(...disbursements_paid_list)
            const list: number[] = []
            disbursements_paid_list.forEach(value => {
                const exact_value = (value * 100) / max
                list.push(exact_value)
            })

            setDisbursementsPaid(disbursements_paid_list);
            // setDataLineChartPercentages(lineCharts)
        }
    }, [isSuccessDisbursementInfo, isSuccessVpsblcInfo, disbursementInfo, vpsblcInfo]);

    // console.log(disbursementsPaid) // [10000,10000,800,950,400,100,990,1000,300]
    // console.log(dataLineCharPercentagest)

    const chartOptions: ApexOptions = {
        series: [
            {
                name: 'Disbursement',
                group: 'Earnings',
                type: "column",
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
            enabled: true,
            custom: function ({ seriesIndex, dataPointIndex, w }) {
                let content = '';

                if (w.config.series[seriesIndex].type === 'column') {
                    content = `
                    <div class="text-center">
                    <h2 class="bg-gradient text-white p-1 font-extrabold text-xs uppercase">Disbursement ${dataPointIndex + 1}</h2>
                    <div class="flex justify-center items-center">
                        <div class="bg-[#daf2ce] p-3 rounded-full mt-3">
                            <img class="w-8" src="${money}" alt="money" />
                        </div>
                    </div>
                        <div class="p-3">
                            <h3>
                                <b class="font-bold">Date: </b>${disbursementInfo[dataPointIndex]["date_paid"]}
                            </h3>
                            <p class="text-lg font-bold text-[#4caf50]"><span class="font-bold text-2xl mt-2">$${addComma(disbursementInfo[dataPointIndex]["disbursements_paid"])} USDT</span> <br /> PAID</p>
                        </div>
                    </div>`;
                }

                return content;
            }
        },
        xaxis: {
            // categories: xCategories,
        },
        yaxis: {
            min: 0,
            max: Math.max(...disbursementsPaid) + 1000,
            labels: {
                formatter: (val) => {
                    if (val === 0) {
                        return "$0"
                    } else {
                        return "$" + (val / 1000)?.toFixed() + 'K'
                    }
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        }
    };

    return (
        <div id="growth-analytics" className='pt-4' >
            <div className="overflow-hidden">
                <div className='bg-white p-4 rounded-2xl'>
                    <div className='flex items-center gap-4'>
                        <img className='w-12 h-12' src={analysisIcon} alt="analysis" />
                        {/* <FcCurrencyExchange className='text-2xl md:text-5xl' /> */}
                        <p className='text-2xl'>Program Performance</p>
                    </div>
                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
                </div>
            </div>
        </div >
    );
}
