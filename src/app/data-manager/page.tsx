'use client';


import Link from 'next/link';
import { 
 
  FileText, 
  Building2, 
  CreditCard, 
  Receipt, 
  Calculator, 
  Gavel, 
  LineChart,
  ArrowRight,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Module {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  path: string;
  count: number;
}

// Sample data for charts
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [1200000, 1900000, 1500000, 2100000, 1800000, 2500000],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
    },
  ],
};

const purchaseData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Purchases',
      data: [800000, 1200000, 900000, 1500000, 1100000, 1300000],
      borderColor: 'rgb(249, 115, 22)',
      backgroundColor: 'rgba(249, 115, 22, 0.5)',
    },
  ],
};

const paymentStatusData = {
  labels: ['Paid', 'Pending', 'Partial'],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
    },
  ],
};

const modules: Module[] = [
  {
    id: 'sales',
    name: 'Sales Management',
    icon: TrendingUp,
    color: 'bg-green-500',
    path: '/data-manager/sales',
    count: 8
  },
  {
    id: 'purchase',
    name: 'Purchase Management',
    icon: ShoppingCart,
    color: 'bg-orange-500',
    path: '/data-manager/purchase',
    count: 4
  },
  {
    id: 'logistics',
    name: 'Logistics Documents',
    icon: FileText,
    color: 'bg-green-500',
    path: '/data-manager/logistics',
    count: 8
  },
  {
    id: 'registration',
    name: 'Company Registration',
    icon: Building2,
    color: 'bg-purple-500',
    path: '/data-manager/registration',
    count: 5
  },
  {
    id: 'bank',
    name: 'Bank Documents',
    icon: CreditCard,
    color: 'bg-yellow-500',
    path: '/data-manager/bank',
    count: 15
  },
  {
    id: 'billing',
    name: 'Billing Management',
    icon: Receipt,
    color: 'bg-red-500',
    path: '/data-manager/billing',
    count: 20
  },
  {
    id: 'ca',
    name: 'CA Documents',
    icon: Calculator,
    color: 'bg-indigo-500',
    path: '/data-manager/ca',
    count: 7
  },
  {
    id: 'tender',
    name: 'Tender Management',
    icon: Gavel,
    color: 'bg-orange-500',
    path: '/data-manager/tender',
    count: 10
  },
  {
    id: 'finance',
    name: 'Finance Reports',
    icon: LineChart,
    color: 'bg-teal-500',
    path: '/data-manager/finance',
    count: 25
  }
];

export default function DataManagerDashboard() {
  return (
    <div className="space-y-6">
        {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <div className="h-80">
            <Line
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value.toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Purchase Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Purchase Trend</h3>
          <div className="h-80">
            <Line
              data={purchaseData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value.toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Payment Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status Distribution</h3>
          <div className="h-80">
            <Doughnut
              data={paymentStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales vs Purchases</h3>
          <div className="h-80">
            <Bar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Sales',
                    data: [1200000, 1900000, 1500000, 2100000, 1800000, 2500000],
                    backgroundColor: 'rgba(34, 197, 94, 0.5)',
                  },
                  {
                    label: 'Purchases',
                    data: [800000, 1200000, 900000, 1500000, 1100000, 1300000],
                    backgroundColor: 'rgba(249, 115, 22, 0.5)',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value.toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link
            key={module.id}
            href={module.path}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">{module.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${module.color}`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-blue-600">
              <span className="text-sm font-medium">View Details</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        ))}
      </div>

    
    </div>
  );
} 