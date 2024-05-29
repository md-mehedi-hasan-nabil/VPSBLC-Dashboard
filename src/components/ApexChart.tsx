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

    const [dataLineChart, setDataLineChart] = useState<number[]>([]);
    const [dataColumnChart, setDataColumnChart] = useState<number[]>([]);
    const [xCategories, setXCategories] = useState<string[]>([]);
    const [disbursements, setDisbursements] = useState<number[]>([]);

    useEffect(() => {
        if (isSuccessDisbursementInfo && isSuccessVpsblcInfo) {
            const columnCharts: number[] = [];
            const disbursements_expected_list: number[] = [];
            const xCategoriesValues: string[] = [];

            // Assume VPSBLC_Funding is derived from vpsblcInfo correctly
            const VPSBLC_Funding = parseFloat((vpsblcInfo as VPSBLCStatus)['VPSBLC Funding Status']?.replace("FUNDED", "").replace("$", "").trim() || '0');

            disbursementInfo.forEach((item: Disbursement) => {
                disbursements_expected_list.push(Number(item.disbursements_expected));
                columnCharts.push(Number(item.line_chart.replace("%", "")));
                xCategoriesValues.push(item.disbursement);
            });

            // const totalSum = disbursements_expected_list.reduce((acc, val) => acc + val, 0);

            // Convert each value to a percentage of the total sum
            // const percentageList = disbursements_expected_list.map(value => (value / totalSum) * 100);


            // Calculate cumulative disbursements as percentages
            const cumulativeDisbursements = disbursements_expected_list.map((_disbursement, index, array) => {
                const cumulativeSum = array.slice(0, index + 1).reduce((acc, val) => acc + val, 0);
                return (((cumulativeSum / VPSBLC_Funding)) / VPSBLC_Funding) * 100;
            });

            setDataLineChart(cumulativeDisbursements);
            // setDataLineChart(percentageList);
            setDataColumnChart(columnCharts);
            setXCategories(xCategoriesValues);
            setDisbursements(disbursements_expected_list);
        }
    }, [isSuccessDisbursementInfo, isSuccessVpsblcInfo, disbursementInfo, vpsblcInfo]);


    const chartOptions: ApexOptions = {
        series: [
            {
                name: 'Disbursement',
                type: 'column',
                data: dataColumnChart
            },
            {
                name: "Trade Performance",
                type: "line",
                data: dataLineChart
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
                formatter: function (_val, { dataPointIndex }) {
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
