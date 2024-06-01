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

    const [dataLineChart, setDataLineChart] = useState<number[]>([]);
    const [dataLineCharPercentagest, setDataLineChartPercentages] = useState<number[]>([]);
    // const [dataColumnChart, setDataColumnChart] = useState<number[]>([]);
    // const [xCategories, setXCategories] = useState<string[]>([]);
    const [disbursementsPaid, setDisbursementsPaid] = useState<number[]>([]);
    console.log(dataLineChart)
    useEffect(() => {
        function convertValues(values: number[], percentages: number[]): number[] {
            if (values.length !== percentages.length) {
                return []
            }

            const convertedValues: number[] = [];

            for (let i = 0; i < values.length; i++) {
                const convertedValue = values[i] * (percentages[i] / 100);
                convertedValues.push(convertedValue);
            }

            return convertedValues;
        }

        if (isSuccessDisbursementInfo && isSuccessVpsblcInfo) {
            const lineCharts: number[] = [];
            const disbursements_paid_list: number[] = [];
            const xCategoriesValues: string[] = [];

            disbursementInfo.forEach((item: Disbursement) => {
                disbursements_paid_list.push(Number(item.disbursements_paid));
                lineCharts.push(Number(item.line_chart.replace("%", "")));
                xCategoriesValues.push(item.disbursement);
            });

            const max = Math.max(...disbursements_paid_list)
            const list: number[] = []
            disbursements_paid_list.forEach(value => {
                const exact_value = (value * 100) / max
                list.push(exact_value)
            })

            const result = convertValues(disbursements_paid_list, lineCharts)
            // console.log(disbursements_paid_list)
            // console.log(lineCharts)
            // console.log(result)

            setDisbursementsPaid(disbursements_paid_list);
            setDataLineChart(result)
            setDataLineChartPercentages(lineCharts)
        }
    }, [isSuccessDisbursementInfo, isSuccessVpsblcInfo, disbursementInfo, vpsblcInfo]);

    // console.log(dataLineChart)
    // console.log(disbursementsPaid)
    // console.log(dataLineCharPercentagest)

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
            max: Math.max(...disbursementsPaid),
            // tickAmount: 20,
            labels: {
                formatter: (value: number) => {
                    if (value > 900) {
                        return (value / 1000) + "k"
                    } else {
                        return value.toString()
                    }
                }
            }
        },
    };

    return (
        <div id="growth-analytics" className='pt-4' >
            <div className="overflow-hidden">
                {/* <h2 className="my-5 text-3xl text-[#343C6A] font-semibold">DISBURSEMENT OVERVIEW</h2> */}
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
