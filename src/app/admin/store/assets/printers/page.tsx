'use client';

import { useState } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { 
 
  ArrowLeft,
 
} from 'lucide-react';
import Link from 'next/link';
interface Printer {
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
  lastMaintenance?: Date;
}

export default function PrintersPage() {
  const [items] = useState<Printer[]>([
    {
      id: '1',
      name: 'Laser Printer',
      quantity: 5,
      category: 'Printers',
      location: 'Floor 1',
      lastUpdated: new Date(),
      condition: 'good',
      purchaseDate: new Date('2023-03-15'),
      manufacturer: 'HP',
      model: 'LaserJet Pro',
      serialNumber: 'SN456789',
      lastMaintenance: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Scanner',
      quantity: 2,
      category: 'Scanners',
      location: 'Floor 2',
      lastUpdated: new Date(),
      condition: 'new',
      purchaseDate: new Date('2024-02-01'),
      manufacturer: 'Epson',
      model: 'Perfection V600',
      serialNumber: 'SN789012',
    },
  ]);

  const categories = ['Printers', 'Scanners', 'Copiers', 'Fax Machines', 'Other'];

 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div>
     <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            </div>
      <AdminStore
        title="Printers & Equipment"
        items={items}
       
        categories={categories}
      />
    </div>
  );
} 