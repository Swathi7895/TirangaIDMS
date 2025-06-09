'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';
import BackButton from '@/app/components/BackButton';
interface System {
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
}

export default function SystemsPage() {
  const [items, setItems] = useState<System[]>([
    {
      id: '1',
      name: 'Desktop Computer',
      quantity: 20,
      category: 'Computers',
      location: 'Floor 1',
      lastUpdated: new Date(),
      condition: 'good',
      purchaseDate: new Date('2023-06-15'),
      manufacturer: 'Dell',
      model: 'OptiPlex 7090',
      serialNumber: 'SN123456',
    },
    {
      id: '2',
      name: 'Laptop',
      quantity: 10,
      category: 'Portable',
      location: 'Floor 2',
      lastUpdated: new Date(),
      condition: 'new',
      purchaseDate: new Date('2024-01-01'),
      manufacturer: 'Lenovo',
      model: 'ThinkPad X1',
      serialNumber: 'SN789012',
    },
  ]);

  const categories = ['Computers', 'Portable', 'Servers', 'Networking', 'Other'];

  const handleAdd = (newItem: Omit<System, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<System>) => {
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
        title="Office Systems"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 