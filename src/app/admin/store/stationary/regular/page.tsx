'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface StationaryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
}

export default function RegularStationaryPage() {
  const [items] = useState<StationaryItem[]>([
    {
      id: '1',
      name: 'A4 Paper',
      quantity: 5000,
      category: 'Paper',
      location: 'Storage Room A',
      lastUpdated: new Date(),
      condition: 'new',
    },
    {
      id: '2',
      name: 'Blue Pens',
      quantity: 100,
      category: 'Writing',
      location: 'Storage Room B',
      lastUpdated: new Date(),
      condition: 'good',
    },
  ]);

  const categories = ['Paper', 'Writing', 'Desk Accessories', 'Binders', 'Other'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <AdminStore
        title="Regular Stationary Items"
        items={items}
        categories={categories}
      />
    </div>
  );
} 