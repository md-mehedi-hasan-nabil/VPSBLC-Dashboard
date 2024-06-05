import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function PieChart({ cycleCompletion }: {
    cycleCompletion: number
}) {

    const total = 100;
    // const cycleCompletion = 117.70; 
    const remainder = total - cycleCompletion;

    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        colors: ['#4CAF50', '#F1F9F1'],
        labels: ['Cycle Completion', 'Remaining'],
        dataLabels: {
            style: {
                colors: ['#ffffff']
            },
            enabled: false
        },
        legend: {
            show: false
        },
        tooltip: {
            custom: function ({ series, seriesIndex, w }) {
                if (seriesIndex === 0) {
                    return '<div class="p-2">' +
                        '<span>' + w.config.labels[seriesIndex] + ': ' + series[seriesIndex].toFixed(2) + '% </span>' +
                        '</div>'
                } else {
                    return '<div class="p-2 hidden">' +
                        '<span>' + w.config.labels[seriesIndex] + ': ' + series[seriesIndex] + '% </span>' +
                        '</div>'
                }
            }
        }
    };

    const series = [cycleCompletion, remainder];

    return (
        <div className='w-full'>
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    );
}
