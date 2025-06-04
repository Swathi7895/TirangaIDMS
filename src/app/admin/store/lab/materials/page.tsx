'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { 
 
  ArrowLeft,
 
} from 'lucide-react';
import Link from 'next/link';

interface LabMaterial {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
  expiryDate?: Date;
  supplier?: string;
}

export default function LabMaterialsPage() {
  const [items, setItems] = useState<LabMaterial[]>([
    {
      id: '1',
      name: 'Buffer Solution',
      quantity: 10,
      category: 'Chemicals',
      location: 'Storage Room A',
      lastUpdated: new Date(),
      condition: 'new',
      expiryDate: new Date('2024-12-31'),
      supplier: 'Sigma-Aldrich',
    },
    {
      id: '2',
      name: 'Agar Plates',
      quantity: 50,
      category: 'Media',
      location: 'Storage Room B',
      lastUpdated: new Date(),
      condition: 'good',
      expiryDate: new Date('2024-09-30'),
      supplier: 'BD Biosciences',
    },
  ]);

  const categories = ['Chemicals', 'Media', 'Reagents', 'Consumables', 'Other'];

 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div>
     <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            </div>
      <AdminStore
        title="Lab Materials"
        items={items}
       
        categories={categories}
      />
    </div>
  );
} 