import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function PieChart() {
    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        colors: ['#4153f6', '#a9c6ff'],
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
        labels: ['Active models', 'Deactivated models']
    };

    const series = [13, 2];

    return (
        <div className='w-full'>
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    );
}
