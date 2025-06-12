'use client';

import { useState,useEffect, useCallback } from 'react';
import AdminStore from '@/app/components/AdminStore';
import { 
 
  ArrowLeft,
 
} from 'lucide-react';
import Link from 'next/link';

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

// API response interface to match backend structure
interface ApiLabInstrument {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: string;
  itemCondition: string;
  calibrationDate?: string;
  status?: string;
}

const API_BASE_URL = 'http://localhost:8080/api/store/lab/instruments';

export default function LabInstrumentsPage() {
  const [items, setItems] = useState<LabInstrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['Optical', 'Separation', 'Measurement', 'Analysis', 'Electronics', 'Other'];

  // Transform API response to internal format
  const transformApiToInternal = (apiItem: ApiLabInstrument): LabInstrument => ({
    id: apiItem.id,
    name: apiItem.name,
    quantity: apiItem.quantity,
    category: apiItem.category,
    location: apiItem.location,
    lastUpdated: new Date(apiItem.lastUpdated),
    condition: mapCondition(apiItem.itemCondition),
    calibrationDate: apiItem.calibrationDate ? new Date(apiItem.calibrationDate) : undefined,
    status: apiItem.status as LabInstrument['status'] || 'operational',
  });

  // Transform internal format to API format
  const transformInternalToApi = (item: Partial<LabInstrument>) => ({
    name: item.name,
    quantity: item.quantity,
    category: item.category,
    location: item.location,
    itemCondition: mapConditionToApi(item.condition),
    lastUpdated: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    calibrationDate: item.calibrationDate?.toISOString().split('T')[0],
    status: item.status,
  });

  // Map condition values between API and internal formats
  const mapCondition = (apiCondition: string): LabInstrument['condition'] => {
    const conditionMap: Record<string, LabInstrument['condition']> = {
      'New': 'new',
      'Good': 'good',
      'Fair': 'fair',
      'Poor': 'poor',
      'new': 'new',
      'good': 'good',
      'fair': 'fair',
      'poor': 'poor',
    };
    return conditionMap[apiCondition] || 'good';
  };

  const mapConditionToApi = (condition?: LabInstrument['condition']): string => {
    const conditionMap: Record<LabInstrument['condition'], string> = {
      'new': 'New',
      'good': 'Good',
      'fair': 'Fair',
      'poor': 'Poor',
    };
    return condition ? conditionMap[condition] : 'Good';
  };

  // Fetch all items from API
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
      }
      
      const data: ApiLabInstrument[] = await response.json();
      const transformedItems = data.map(transformApiToInternal);
      setItems(transformedItems);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
      setItems([]); // Ensure items are cleared on error
    } finally {
      setLoading(false);
    }
  }, [transformApiToInternal]);

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
        title="Lab Instruments"
        items={items}
       
        categories={categories}
      />
    </div>
  );
} 