'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';

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
  const [items, setItems] = useState<Printer[]>([
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

  const handleAdd = (newItem: Omit<Printer, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<Printer>) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, ...updatedItem, lastUpdated: new Date() }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ItemManagement
        title="Printers & Equipment"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 