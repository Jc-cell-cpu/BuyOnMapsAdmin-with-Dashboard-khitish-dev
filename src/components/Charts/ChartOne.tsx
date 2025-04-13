// components/ChartUsers.tsx
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

interface ChartUsersProps {
  totalUsers: number;
}

const ChartOne: React.FC<ChartUsersProps> = ({ totalUsers }) => {
  // Handle edge case: no users
  if (totalUsers <= 0) {
    return (
      <div className="col-span-12 rounded-[10px] bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-1 dark:from-gray-800 dark:to-gray-900 dark:shadow-card sm:p-6 xl:col-span-5">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            New Users This Week
          </h4>
          <div className="min-w-[120px]">
            <DefaultSelectOption options={['This Week', 'Last Week']} />
          </div>
        </div>
        <div className="min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          No user data available
        </div>
      </div>
    );
  }

  // Distribute users evenly across 7 days with slight variation
  const baseValue = Math.floor(totalUsers / 7);
  const remainder = totalUsers % 7;
  const dailyUsers = Array(7)
    .fill(baseValue)
    .map((val, index) => {
      const value = index < remainder ? val + 1 : val;
      // Add slight variation (±1) but ensure non-negative
      const variation = index % 2 === 0 ? 1 : -1;
      const newValue = value + variation;
      return Math.max(0, newValue); // Prevent negative values
    });

  // Adjust to match totalUsers
  const sum = dailyUsers.reduce((a, b) => a + b, 0);
  if (sum !== totalUsers) {
    dailyUsers[0] += totalUsers - sum; // Correct first day
    if (dailyUsers[0] < 0) dailyUsers[0] = 0; // Prevent negative
  }

  const series = [
    {
      name: 'New Users',
      data: dailyUsers.map(Number), // Ensure numbers
    },
  ];

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'line',
      height: 370,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    colors: ['#18BFFF'], // Match DataStatsOne Total Users color
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#80CAEE'],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.2,
      },
    },
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: ['#18BFFF'],
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 4,
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
        right: 10,
        bottom: 0,
        left: 10,
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Users',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
      min: 0,
      labels: {
        formatter: (val) => Math.floor(val).toString(), // Whole numbers
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: (val) => `${val} new users`,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '14px',
      fontWeight: 500,
      markers: {
        size: 12,
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-1 dark:from-gray-800 dark:to-gray-900 dark:shadow-card sm:p-6 xl:col-span-5">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            New Users This Week
          </h4>
        </div>
        <div className="min-w-[120px]">
          <DefaultSelectOption options={['This Week', 'Last Week']} />
        </div>
      </div>

      <div className="min-h-[300px]">
        <div id="chartUsers" className="-mx-4 mt-2 sm:-mx-6">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={370}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;