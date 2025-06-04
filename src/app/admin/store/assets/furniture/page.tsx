'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Furniture {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
  purchaseDate?: Date;
}

export default function FurniturePage() {
  const [items] = useState<Furniture[]>([
    {
      id: '1',
      name: 'Office Desk',
      quantity: 10,
      category: 'Desks',
      location: 'Floor 1',
      lastUpdated: new Date(),
      condition: 'good',
      purchaseDate: new Date('2023-01-15'),
    },
    {
      id: '2',
      name: 'Ergonomic Chair',
      quantity: 15,
      category: 'Chairs',
      location: 'Floor 2',
      lastUpdated: new Date(),
      condition: 'new',
      purchaseDate: new Date('2024-02-01'),
    },
  ]);

  const categories = ['Desks', 'Chairs', 'Cabinets', 'Tables', 'Other'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <AdminStore
        title="Office Furniture"
        items={items}
        categories={categories}
      />
    </div>
  );
}