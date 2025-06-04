'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LabComponent {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
  manufacturer?: string;
  partNumber?: string;
}

export default function LabComponentsPage() {
  const [items] = useState<LabComponent[]>([
    {
      id: '1',
      name: 'Optical Lens Set',
      quantity: 5,
      category: 'Optical',
      location: 'Storage Room A',
      lastUpdated: new Date(),
      condition: 'new',
      manufacturer: 'Zeiss',
      partNumber: 'LENS-2023',
    },
    {
      id: '2',
      name: 'Centrifuge Tubes',
      quantity: 100,
      category: 'Consumables',
      location: 'Storage Room B',
      lastUpdated: new Date(),
      condition: 'good',
      manufacturer: 'Eppendorf',
      partNumber: 'TUBE-50ML',
    },
  ]);

  const categories = ['Optical', 'Mechanical', 'Electronic', 'Consumables', 'Other'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <AdminStore
        title="Lab Components"
        items={items}
        categories={categories}
      />
    </div>
  );
} 