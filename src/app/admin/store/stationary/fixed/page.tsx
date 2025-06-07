'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { 
 
  ArrowLeft,
 
} from 'lucide-react';
import Link from 'next/link';

interface FixedItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
}

export default function FixedStationaryPage() {
  const [items] = useState<FixedItem[]>([
    {
      id: '1',
      name: 'Whiteboard',
      quantity: 5,
      category: 'Furniture',
      location: 'Conference Room A',
      lastUpdated: new Date(),
      condition: 'good',
    },
    {
      id: '2',
      name: 'Projector Screen',
      quantity: 3,
      category: 'Equipment',
      location: 'Meeting Room B',
      lastUpdated: new Date(),
      condition: 'new',
    },
  ]);

  const categories = ['Furniture', 'Equipment', 'Storage', 'Other'];

 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
     <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            </div>
      <AdminStore
        title="Fixed Stationary Items"
        items={items}
       
        categories={categories}
      />
    </div>
  );
} 