import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function PieChart() {
    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        colors: ['#4CAF50', '#F1F9F1'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        labels: ['Active models', 'Deactivated models'],
        dataLabels: {
            style: {
                colors: ['#ffffff'] 
            },
            enabled: false
        },
        tooltip: {
            theme: 'light', 
            style: {
                fontSize: '12px',  
                fontFamily: 'Poppins, sans-serif',
            },
            x: {
                show: true,
                format: 'dd MMM', 
            },
            y: {
                formatter: function (val) {
                    return val + " models"; 
                }
            },
            marker: {
                show: false,
            },
        }
    };

    const series = [13, 2];

    return (
        <div className='w-full'>
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    );
}
