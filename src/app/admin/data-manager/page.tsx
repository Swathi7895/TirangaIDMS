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
  ShoppingCart,
  ArrowLeft
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

const modules: Module[] = [
  {
    id: 'sales',
    name: 'Sales Management',
    icon: TrendingUp,
    color: 'bg-green-500',
    path: '/admin/data-manager/sales',
    count: 8
  },
  {
    id: 'purchase',
    name: 'Purchase Management',
    icon: ShoppingCart,
    color: 'bg-orange-500',
    path: '/admin/data-manager/purchase',
    count: 4
  },
  {
    id: 'logistics',
    name: 'Logistics Documents',
    icon: FileText,
    color: 'bg-green-500',
    path: '/admin/data-manager/logistics',
    count: 8
  },
  {
    id: 'registration',
    name: 'Company Registration',
    icon: Building2,
    color: 'bg-purple-500',
    path: '/admin/data-manager/registration',
    count: 5
  },
  {
    id: 'bank',
    name: 'Bank Documents',
    icon: CreditCard,
    color: 'bg-yellow-500',
    path: '/admin/data-manager/bank',
    count: 15
  },
  {
    id: 'billing',
    name: 'Billing Management',
    icon: Receipt,
    color: 'bg-red-500',
    path: '/admin/data-manager/billing',
    count: 20
  },
  {
    id: 'ca',
    name: 'CA Documents',
    icon: Calculator,
    color: 'bg-indigo-500',
    path: '/admin/data-manager/ca',
    count: 7
  },
  {
    id: 'tender',
    name: 'Tender Management',
    icon: Gavel,
    color: 'bg-orange-500',
    path: '/admin/data-manager/tender',
    count: 10
  },
  {
    id: 'finance',
    name: 'Finance Reports',
    icon: LineChart,
    color: 'bg-teal-500',
    path: '/admin/data-manager/finance',
    count: 25
  }
];

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

export default function DataManagerDashboard() {
  return (
    <div className="space-y-8">
     <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Manager Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">Overview of all data management features</p>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Link
            key={module.id}
            href={module.path}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${module.color}`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                {module.count} items
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{module.name}</h3>
            <div className="mt-2 flex items-center text-sm text-blue-600">
              View details
              <ArrowRight className="ml-1 w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">New tender submitted - IT Infrastructure Upgrade</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Bank statement updated - March 2024</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-gray-600">CA document pending review - Annual Audit</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 