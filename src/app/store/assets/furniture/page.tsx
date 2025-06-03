'use client';

import { useState } from 'react';
import ItemManagement from '@/app/components/ItemManagement';

interface Furniture {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
  purchaseDate?: Date;
}

export default function FurniturePage() {
  const [items, setItems] = useState<Furniture[]>([
    {
      id: '1',
      name: 'Office Desk',
      quantity: 10,
      category: 'Desks',
      location: 'Floor 1',
      lastUpdated: new Date(),
      condition: 'good',
      purchaseDate: new Date('2023-01-15'),
    },
    {
      id: '2',
      name: 'Ergonomic Chair',
      quantity: 15,
      category: 'Chairs',
      location: 'Floor 2',
      lastUpdated: new Date(),
      condition: 'new',
      purchaseDate: new Date('2024-02-01'),
    },
  ]);

  const categories = ['Desks', 'Chairs', 'Cabinets', 'Tables', 'Other'];

  const handleAdd = (newItem: Omit<Furniture, 'id' | 'lastUpdated'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: new Date(),
      },
    ]);
  };

  const handleEdit = (id: string, updatedItem: Partial<Furniture>) => {
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
        title="Office Furniture"
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
} 