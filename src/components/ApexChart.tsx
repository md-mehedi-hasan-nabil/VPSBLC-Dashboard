import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

export default function ApexChart() {
    const data = [1000, 10000, 1000, 500, 2500, 3000, 1010, 15000, 1000, 10050];
    const xCategories = ['Disbursement 1', 'Disbursement 2', 'Disbursement 3', 'Disbursement 4', 'Disbursement 5', 'Disbursement 6',
        'Disbursement 7', 'Disbursement 8', 'Disbursement 9', 'Disbursement 10'
    ];

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
            text: 'Trade Performance',
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
        <div id="growth-analytics" className='pb-8'>
            <div className="overflow-hidden">
                <h2 className="my-5 text-3xl text-[#343C6A] font-semibold">GROWTH ANALYICS</h2>
                <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
            </div>
        </div>
    );
}


