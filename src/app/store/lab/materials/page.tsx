'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';
import BackButton from '@/app/components/BackButton';

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

  const handleAdd = (newItem: Omit<LabMaterial, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<LabMaterial>) => {
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
        title="Lab Materials"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 