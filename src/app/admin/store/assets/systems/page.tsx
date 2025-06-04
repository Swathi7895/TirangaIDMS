'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface System {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
  purchaseDate?: Date;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
}

export default function SystemsPage() {
  const [items] = useState<System[]>([
    {
      id: '1',
      name: 'Desktop Computer',
      quantity: 20,
      category: 'Computers',
      location: 'Floor 1',
      lastUpdated: new Date(),
      condition: 'good',
      purchaseDate: new Date('2023-06-15'),
      manufacturer: 'Dell',
      model: 'OptiPlex 7090',
      serialNumber: 'SN123456',
    },
    {
      id: '2',
      name: 'Laptop',
      quantity: 10,
      category: 'Portable',
      location: 'Floor 2',
      lastUpdated: new Date(),
      condition: 'new',
      purchaseDate: new Date('2024-01-01'),
      manufacturer: 'Lenovo',
      model: 'ThinkPad X1',
      serialNumber: 'SN789012',
    },
  ]);

  const categories = ['Computers', 'Portable', 'Servers', 'Networking', 'Other'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <AdminStore
        title="Office Systems"
        items={items}
        categories={categories}
      />
    </div>
  );
} 