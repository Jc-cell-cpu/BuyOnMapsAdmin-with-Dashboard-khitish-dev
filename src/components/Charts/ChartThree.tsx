// components/ChartThree.tsx
'use client';

import { ApexOptions } from 'apexcharts';
import React from 'react';
import dynamic from 'next/dynamic';
import DefaultSelectOption from '@/components/SelectOption/DefaultSelectOption';

// Dynamically import ApexCharts with no SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center">
      <div className="h-64 w-64 animate-pulse rounded-full bg-gray-100 dark:bg-gray-800"></div>
    </div>
  ),
});

interface ChartThreeProps {
  postData: {
    'All Vechicles': number;
    'All Furnitures': number;
    'All Properties': number;
    'All electronics': number;
    'total Posts': number;
  };
}

const ChartThree: React.FC<ChartThreeProps> = ({ postData }) => {
  // Extract and format data
  const categories = [
    { key: 'All Vechicles', label: 'Vehicles', value: postData['All Vechicles'] },
    { key: 'All Furnitures', label: 'Furniture', value: postData['All Furnitures'] },
    { key: 'All Properties', label: 'Properties', value: postData['All Properties'] },
    { key: 'All electronics', label: 'Electronics', value: postData['All electronics'] },
  ];

  const series = categories.map((cat) => cat.value);
  const labels = categories.map((cat) => cat.label);
  const total = postData['total Posts'] || series.reduce((sum, val) => sum + val, 0);

  // Calculate percentages for legend
  const percentages = series.map((value) =>
    total > 0 ? Math.round((value / total) * 100) : 0,
  );

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#5750F1', '#5475E5', '#8099EC', '#ADBCF2'],
    labels: labels,
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          background: 'transparent',
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: 'Total Posts',
              fontSize: '16px',
              fontWeight: '400',
              color: '#64748b',
            },
            value: {
              show: true,
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1e293b',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 1536,
        options: {
          chart: {
            width: 340,
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: 300,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 280,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 240,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card sm:p-6 xl:col-span-5">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">
            Post Categories
          </h4>
        </div>
        <div className="min-w-[120px]">
          <DefaultSelectOption options={['Monthly', 'Yearly']} />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((cat, index) => (
            <div key={cat.key} className="flex items-center space-x-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: options.colors?.[index] ?? '#000000' }}
              ></span>
              <div className="flex w-full justify-between text-sm font-medium text-dark dark:text-dark-6">
                <span>{cat.label}</span>
                <span>{percentages[index]}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartThree;