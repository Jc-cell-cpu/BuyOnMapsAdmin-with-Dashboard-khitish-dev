// components/ChartTwo.tsx
'use client';

import { ApexOptions } from 'apexcharts';
import React from 'react';
import dynamic from 'next/dynamic';
import DefaultSelectOption from '@/components/SelectOption/DefaultSelectOption';

// Dynamically import ApexCharts with no SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="h-[370px] w-full animate-pulse bg-gray-100 dark:bg-gray-800"></div>
  ),
});

interface ChartTwoProps {
  totalAppointments: number;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ totalAppointments }) => {
  // Simulate daily appointments (since API returns total only)
  // Divide totalAppointments (e.g., 28) across 7 days randomly for demo
  const dailyAppointments = Array(7)
    .fill(0)
    .map(() => Math.floor(totalAppointments / 7) + (Math.random() > 0.5 ? 1 : 0));
  // Adjust to match total
  const sum = dailyAppointments.reduce((a, b) => a + b, 0);
  dailyAppointments[0] += totalAppointments - sum; // Ensure total matches

  const series = [
    {
      name: 'Appointments',
      data: dailyAppointments, // e.g., [4, 4, 4, 4, 4, 4, 4] for 28
    },
  ];

  const options: ApexOptions = {
    colors: ['#FF9C55'], // Match DataStatsOne Appointments color
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: false, // Single series, no stacking
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: '25%',
            },
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: '30%',
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: '35%',
            },
          },
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: '45%',
            },
          },
          chart: {
            height: 250,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Full names for clarity
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        size: 5,
        strokeWidth: 10,
      },
      itemMargin: {
        horizontal: 10,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card sm:p-6 xl:col-span-5">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Appointments this week
          </h4>
        </div>
        <div className="min-w-[120px]">
          <DefaultSelectOption options={['This Week', 'Last Week']} />
        </div>
      </div>

      <div className="min-h-[300px]">
        <div id="chartTwo" className="-mx-4 mt-2 sm:-mx-6">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={370}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;