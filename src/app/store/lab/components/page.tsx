'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';
import BackButton from '@/app/components/BackButton';

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
  const [items, setItems] = useState<LabComponent[]>([
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

  const handleAdd = (newItem: Omit<LabComponent, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<LabComponent>) => {
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
        title="Lab Components"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 