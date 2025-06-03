'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';
import BackButton from '@/app/components/BackButton';

interface StationaryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
}

export default function RegularStationaryPage() {
  const [items, setItems] = useState<StationaryItem[]>([
    {
      id: '1',
      name: 'A4 Paper',
      quantity: 5000,
      category: 'Paper',
      location: 'Storage Room A',
      lastUpdated: new Date(),
      condition: 'new',
    },
    {
      id: '2',
      name: 'Blue Pens',
      quantity: 100,
      category: 'Writing',
      location: 'Storage Room B',
      lastUpdated: new Date(),
      condition: 'good',
    },
  ]);

  const categories = ['Paper', 'Writing', 'Desk Accessories', 'Binders', 'Other'];

  const handleAdd = (newItem: Omit<StationaryItem, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<StationaryItem>) => {
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
        title="Regular Stationary Items"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 