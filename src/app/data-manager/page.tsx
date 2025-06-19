'use client';

import { useState, useEffect } from 'react';

import { 
  FileText, 
  Building2, 
  CreditCard, 
  Receipt, 
  Calculator, 
  Gavel, 
  LineChart,
 
  TrendingUp,
  ShoppingCart
} from 'lucide-react';

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
import { useRouter } from 'next/navigation';

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
  apiUrl: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
  }[];
}

interface MonthlyData {
  labels: string[];
  data: number[];
}

interface DataItem {
  [key: string]: string | number | boolean | null;
}

interface Sale {
  paymentStatus: 'Paid' | 'Pending' | 'Overdue' | 'Partially Paid';
  [key: string]: string | number | boolean | null;
}

const modules: Module[] = [
  {
    id: 'sales',
    name: 'Sales Management',
    icon: TrendingUp,
    color: 'bg-green-500',
    path: '/data-manager/sales',
    count: 0,
    apiUrl: 'http://localhost:8080/api/sales'
  },
  {
    id: 'purchase',
    name: 'Purchase Management',
    icon: ShoppingCart,
    color: 'bg-orange-500',
    path: '/data-manager/purchase',
    count: 0,
    apiUrl: 'http://localhost:8080/api/purchases'
  },
  {
    id: 'logistics',
    name: 'Logistics Documents',
    icon: FileText,
    color: 'bg-green-500',
    path: '/data-manager/logistics',
    count: 0,
    apiUrl: 'http://localhost:8080/api/logisticsdocuments'
  },
  {
    id: 'registration',
    name: 'Company Registration',
    icon: Building2,
    color: 'bg-purple-500',
    path: '/data-manager/registration',
    count: 0,
    apiUrl: 'http://localhost:8080/api/companyregistrations'
  },
  {
    id: 'bank',
    name: 'Bank Documents',
    icon: CreditCard,
    color: 'bg-yellow-500',
    path: '/data-manager/bank',
    count: 0,
    apiUrl: 'http://localhost:8080/api/bankdocuments'
  },
  {
    id: 'billing',
    name: 'Billing Management',
    icon: Receipt,
    color: 'bg-red-500',
    path: '/data-manager/billing',
    count: 0,
    apiUrl: 'http://localhost:8080/api/billings'
  },
  {
    id: 'ca',
    name: 'CA Documents',
    icon: Calculator,
    color: 'bg-indigo-500',
    path: '/data-manager/ca',
    count: 0,
    apiUrl: 'http://localhost:8080/api/cadocuments'
  },
  {
    id: 'tender',
    name: 'Tender Management',
    icon: Gavel,
    color: 'bg-orange-500',
    path: '/data-manager/tender',
    count: 0,
    apiUrl: 'http://localhost:8080/api/tenders'
  },
  {
    id: 'finance',
    name: 'Finance Reports',
    icon: LineChart,
    color: 'bg-teal-500',
    path: '/data-manager/finance',
    count: 0,
    apiUrl: 'http://localhost:8080/api/financereports'
  }
];

export default function DataManagerPage() {
  const router = useRouter();
  const [, setModuleCounts] = useState<{ [key: string]: number }>({});
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [, setSalesData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Sales',
      data: [],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
    }]
  });
  const [, setPurchaseData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Purchases',
      data: [],
      borderColor: 'rgb(249, 115, 22)',
      backgroundColor: 'rgba(249, 115, 22, 0.5)',
    }]
  });
  const [, setPaymentStatusData] = useState<ChartData>({
    labels: ['Paid', 'Pending', 'Overdue', 'Partially Paid'],
    datasets: [{
      label: 'Payment Status',
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(249, 115, 22, 0.8)',
      ],
    }]
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const roles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    
    if (!token || !roles.includes('ROLE_DATA_MANAGER')) {
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const counts: { [key: string]: number } = {};

      try {
        // Fetch module counts
        await Promise.all(
          modules.map(async (module) => {
            try {
              const response = await fetch(module.apiUrl);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              counts[module.id] = Array.isArray(data) ? data.length : 0;
            } catch (e) {
              console.error(`Error fetching count for ${module.name}:`, e);
              counts[module.id] = 0;
            }
          })
        );

        // Fetch sales data for charts
        const salesResponse = await fetch('http://localhost:8080/api/sales');
        if (salesResponse.ok) {
          const sales = await salesResponse.json();
          const monthlySales = processMonthlyData(sales, 'date', 'amount');
          setSalesData({
            labels: monthlySales.labels,
            datasets: [{
              label: 'Sales',
              data: monthlySales.data,
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
            }]
          });
        }

        // Fetch purchase data for charts
        const purchasesResponse = await fetch('http://localhost:8080/api/purchases');
        if (purchasesResponse.ok) {
          const purchases = await purchasesResponse.json();
          const monthlyPurchases = processMonthlyData(purchases, 'date', 'amount');
          setPurchaseData({
            labels: monthlyPurchases.labels,
            datasets: [{
              label: 'Purchases',
              data: monthlyPurchases.data,
              borderColor: 'rgb(249, 115, 22)',
              backgroundColor: 'rgba(249, 115, 22, 0.5)',
            }]
          });
        }

        // Fetch payment status data
        const salesForPaymentStatus = await fetch('http://localhost:8080/api/sales').then(res => res.ok ? res.json() : []);
        const paymentStatusCounts = {
          'Paid': 0,
          'Pending': 0,
          'Overdue': 0,
          'Partially Paid': 0
        };

        salesForPaymentStatus.forEach((sale: Sale) => {
          if (sale.paymentStatus in paymentStatusCounts) {
            paymentStatusCounts[sale.paymentStatus as keyof typeof paymentStatusCounts]++;
          }
        });

        setPaymentStatusData({
          labels: Object.keys(paymentStatusCounts),
          datasets: [{
            label: 'Payment Status',
            data: Object.values(paymentStatusCounts),
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(234, 179, 8, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(249, 115, 22, 0.8)',
            ],
          }]
        });

        setModuleCounts(counts);
      } catch (e: Error | unknown) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        setError(`Failed to fetch data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processMonthlyData = (data: DataItem[], dateField: string, amountField: string): MonthlyData => {
    const monthlyTotals: { [key: string]: number } = {};

    data.forEach(item => {
      const date = new Date(String(item[dateField]));
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      const amount = Number(item[amountField]) || 0;

      monthlyTotals[monthYear] = (monthlyTotals[monthYear] || 0) + amount;
    });

    const sortedMonths = Object.keys(monthlyTotals).sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA.getTime() - dateB.getTime();
    });

    return {
      labels: sortedMonths,
      data: sortedMonths.map(month => monthlyTotals[month])
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Manager Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to Data Management</h2>
          <p className="text-gray-600">This is the data management dashboard where you can manage and analyze system data.</p>
        </div>
      </div>
    </div>
  );
} 