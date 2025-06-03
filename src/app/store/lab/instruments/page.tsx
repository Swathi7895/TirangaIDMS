'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';
import BackButton from '@/app/components/BackButton';

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

  const handleAdd = (newItem: Omit<LabInstrument, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<LabInstrument>) => {
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
      <BackButton />
      <ItemManagement
        title="Lab Instruments"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 