import { AfterViewInit, Component } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewInit {
  ngAfterViewInit() {
    this.initChart();
  }

  private initChart() {
    const options = {
      chart: {
        height: 300,
        type: 'area',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      series: [
        {
          name: 'Income',
          data: [18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000, 60000, 70000]
        },
        {
          name: 'Outcome',
          data: [27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000, 42000, 50000]
        }
      ],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      grid: {
        strokeDashArray: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.8
        }
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        categories: [
          '25 Jan 2023', '26 Jan 2023', '27 Jan 2023', '28 Jan 2023',
          '29 Jan 2023', '30 Jan 2023', '31 Jan 2023', '1 Feb 2023',
          '2 Feb 2023', '3 Feb 2023', '4 Feb 2023', '5 Feb 2023'
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400
          },
          formatter: (value: number) => value >= 1000 ? `${value / 1000}k` : value.toString()
        }
      },
      tooltip: {
        x: { format: 'MMMM yyyy' },
        y: {
          formatter: (value: number) => `$${value >= 1000 ? `${value / 1000}k` : value}`
        }
      },
      colors: ['#2563eb', '#9333ea'],
      responsive: [{
        breakpoint: 568,
        options: {
          chart: { height: 300 },
          xaxis: {
            labels: {
              style: { fontSize: '11px' }
            }
          },
          yaxis: {
            labels: {
              style: { fontSize: '11px' }
            }
          }
        }
      }]
    };

    const chart = new ApexCharts(document.querySelector('#hs-multiple-area-charts'), options);
    chart.render();
  }
}
