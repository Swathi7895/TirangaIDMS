'use client';

import { useState, useEffect, useCallback } from 'react';
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

const API_BASE_URL = 'http://localhost:8080/store/lab/instruments';

export default function LabInstrumentsPage() {
  const [items, setItems] = useState<LabInstrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  const categories = ['Optical', 'Separation', 'Measurement', 'Analysis', 'Electronics', 'Other'];

  // Transform API response to internal format
  const transformApiToInternal = (apiItem: ApiLabInstrument): LabInstrument => ({
    id: apiItem.id || `instrument-${Math.random().toString(36).substr(2, 9)}`,
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
      if (isInitialLoad) {
        setLoading(true);
      }
      setError(null);
      
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
      }
      
      const data: ApiLabInstrument[] = await response.json();
      const transformedItems = data.map(transformApiToInternal);
      setItems(transformedItems);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error fetching items:', errorMessage);
      setError(errorMessage);
      setItems([]); // Ensure items are cleared on error
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [transformApiToInternal, isInitialLoad]);

  // Load items on component mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Add new item via API
  const handleAdd = async (newItem: Omit<LabInstrument, 'id' | 'lastUpdated'>) => {
    try {
      setError(null);
      
      const apiPayload = transformInternalToApi(newItem);
      
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.status} ${response.statusText}`);
      }

      const createdItem: ApiLabInstrument = await response.json();
      const transformedItem = transformApiToInternal(createdItem);
      
      setItems(prevItems => [...prevItems, transformedItem]);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error adding item:', errorMessage);
      setError(errorMessage);
    }
  };

  // Edit item via API
  const handleEdit = async (id: string, updatedItem: Partial<LabInstrument>) => {
    try {
      setError(null);
      
      const apiPayload = transformInternalToApi(updatedItem);
      
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update item: ${response.status} ${response.statusText}`);
      }

      const updatedApiItem: ApiLabInstrument = await response.json();
      const transformedItem = transformApiToInternal(updatedApiItem);
      
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? transformedItem : item
        )
      );
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error updating item:', errorMessage);
      setError(errorMessage);
      // Removed the fallback to local state update here
    }
  };

  // Delete item via API
  const handleDelete = async (id: string) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status} ${response.statusText}`);
      }

      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error deleting item:', errorMessage);
      setError(errorMessage);
    }
  };

  // Retry function for error recovery
  const handleRetry = () => {
    setIsInitialLoad(true);
    fetchItems();
  };

  if (isInitialLoad && loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading lab instruments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">API Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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