'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { 
 
  ArrowLeft,
 
} from 'lucide-react';
import Link from 'next/link';

interface LabInstrument {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
  calibrationDate?: Date;
  status?: 'operational' | 'maintenance' | 'out_of_order';
}

export default function LabInstrumentsPage() {
  const [items, setItems] = useState<LabInstrument[]>([
    {
      id: '1',
      name: 'Microscope',
      quantity: 2,
      category: 'Optical',
      location: 'Lab Room A',
      lastUpdated: new Date(),
      condition: 'good',
      calibrationDate: new Date('2024-12-31'),
      status: 'operational',
    },
    {
      id: '2',
      name: 'Centrifuge',
      quantity: 1,
      category: 'Separation',
      location: 'Lab Room B',
      lastUpdated: new Date(),
      condition: 'fair',
      calibrationDate: new Date('2024-10-15'),
      status: 'maintenance',
    },
  ]);

  const categories = ['Optical', 'Separation', 'Measurement', 'Analysis', 'Other'];

 
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
     <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            </div>
      <AdminStore
        title="Lab Instruments"
        items={items}
       
        categories={categories}
      />
    </div>
  );
} 