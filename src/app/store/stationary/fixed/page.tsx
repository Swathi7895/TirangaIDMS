'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';
import BackButton from '@/app/components/BackButton';

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
  const [items, setItems] = useState<FixedItem[]>([
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

  const handleAdd = (newItem: Omit<FixedItem, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<FixedItem>) => {
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
        title="Fixed Stationary Items"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 