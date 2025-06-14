'use client';

import { useState,useEffect, useCallback } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { 
 
  ArrowLeft,
 
} from 'lucide-react';
import Link from 'next/link';
interface FixedItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
}

interface ApiFixedItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
  location: string;
  itemCondition: string | null;
  lastUpdated: [number, number, number]; // [year, month, day]
}

interface ApiRequestBody {
  name: string;
  category: string;
  quantity: number;
  location: string;
  Condition: string;
  lastUpdated: string;
}

const API_BASE_URL = 'http://localhost:8080/store/stationary/fixed';

export default function FixedStationaryPage() {
  const [items, setItems] = useState<FixedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['Furniture', 'Equipment', 'Storage', 'Other'];

  // Helper function to convert API response to local format
  const convertApiToLocal = (apiItem: ApiFixedItem): FixedItem => {
    // Handle potential null/undefined apiItem
    if (!apiItem) {
      throw new Error('Invalid item data received from API');
    }
    
    // Handle date conversion with fallback
    let lastUpdated = new Date();
    if (apiItem.lastUpdated && Array.isArray(apiItem.lastUpdated) && apiItem.lastUpdated.length >= 3) {
      const [year, month, day] = apiItem.lastUpdated;
      lastUpdated = new Date(year, month - 1, day); // month is 0-indexed in JS Date
    }
    
    return {
      id: apiItem.id?.toString() || 'unknown',
      name: apiItem.name || 'Unknown Item',
      quantity: apiItem.quantity || 0,
      category: apiItem.category || 'Other',
      location: apiItem.location || 'Unknown Location',
      lastUpdated: lastUpdated,
      condition: (apiItem.itemCondition?.toLowerCase() as 'new' | 'good' | 'fair' | 'poor') || 'good',
    };
  };

  // Helper function to convert local format to API request
  const convertLocalToApi = (localItem: Omit<FixedItem, 'id' | 'lastUpdated'>): ApiRequestBody => {
    const today = new Date();
    return {
      name: localItem.name,
      category: localItem.category,
      quantity: localItem.quantity,
      location: localItem.location,
      Condition: localItem.condition.charAt(0).toUpperCase() + localItem.condition.slice(1),
      lastUpdated: today.toISOString().split('T')[0], // YYYY-MM-DD format
    };
  };

  // Fetch all items
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      
      // Check if data is null, undefined, or not an array
      if (!data) {
        console.log('API returned null/undefined data');
        setItems([]);
        return;
      }
      
      if (!Array.isArray(data)) {
        console.log('API returned non-array data:', typeof data);
        setItems([]);
        return;
      }
      
      const convertedItems = data.map(convertApiToLocal);
      setItems(convertedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
      console.error('Error fetching items:', err);
      setItems([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Load items on component mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
     <Link href="/admin/store" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            </div>
      <AdminStore
        title="Fixed Stationary Items"
        items={items}
       
        categories={categories}
      />
    </div>
  );
} 