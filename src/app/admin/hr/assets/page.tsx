'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Laptop,
  Smartphone,
  Monitor,
  Printer,
  Headphones,
  Search,
  Filter,
  X,
  Clock,
  Edit, // Added for edit button
  Trash2, // Added for delete button
  PlusCircle // Added for add button
} from 'lucide-react';

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:8080/api/assets'; // Ensure this matches your Spring Boot application's port

interface Asset {
  id: number;
  name: string;
  type: 'laptop' | 'phone' | 'monitor' | 'printer' | 'headphones';
  serialNumber: string;
  assignedTo: string;
  status: 'assigned' | 'available' | 'maintenance' | 'retired';
  purchaseDate: string;
  lastMaintenance?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  history?: AssetHistory[];
}

interface AssetHistory {
  id: number;
  date: string;
  action: 'assigned' | 'unassigned' | 'maintenance' | 'status_change';
  description: string;
  performedBy: string;
}

interface AssetType {
  id: string;
  name: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function AssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null); // Changed to allow setting an asset
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    name: '',
    type: 'laptop',
    serialNumber: '',
    assignedTo: '',
    status: 'available',
    purchaseDate: new Date().toISOString().split('T')[0],
    condition: 'excellent',
    notes: ''
  });

  const [assets, setAssets] = useState<Asset[]>([]); // Initialize with empty array, data will come from API
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  const assetTypes: AssetType[] = [
    { id: 'laptop', name: 'Laptops', icon: Laptop, color: 'blue' },
    { id: 'phone', name: 'Phones', icon: Smartphone, color: 'green' },
    { id: 'monitor', name: 'Monitors', icon: Monitor, color: 'purple' },
    { id: 'printer', name: 'Printers', icon: Printer, color: 'orange' },
    { id: 'headphones', name: 'Headphones', icon: Headphones, color: 'red' }
  ];

  // --- API Interaction Functions ---

  // Function to fetch assets
  const fetchAssets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = API_BASE_URL;
      if (selectedCategory !== 'all') {
        url = `${API_BASE_URL}/category/${selectedCategory}`;
      } else if (searchTerm) {
        url = `${API_BASE_URL}/search?keyword=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Asset[] = await response.json();

      // Ensure purchaseDate is in 'YYYY-MM-DD' format if your backend sends it differently
      const formattedData = data.map(asset => ({
        ...asset,
        purchaseDate: asset.purchaseDate ? new Date(asset.purchaseDate).toISOString().split('T')[0] : ''
      }));
      setAssets(formattedData);
    } catch (err: any) {
      console.error('Failed to fetch assets:', err);
      setError('Failed to load assets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  // useEffect to call fetchAssets when component mounts or filters change
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets, selectedCategory, searchTerm]); // Re-run when selectedCategory or searchTerm changes


  const handleAddAsset = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAsset),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedAsset: Asset = await response.json();
      setAssets(prevAssets => [...prevAssets, addedAsset]);
      setShowAddModal(false);
      setNewAsset({ // Reset form
        name: '',
        type: 'laptop',
        serialNumber: '',
        assignedTo: '',
        status: 'available',
        purchaseDate: new Date().toISOString().split('T')[0],
        condition: 'excellent',
        notes: ''
      });
      // Refresh assets after adding
      fetchAssets();
    } catch (err) {
      console.error('Failed to add asset:', err);
      setError('Failed to add asset. Please try again.');
    }
  };

  const handleEditAsset = async () => {
    if (!assetToEdit) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${assetToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetToEdit),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedAsset: Asset = await response.json();
      setAssets(prevAssets => prevAssets.map(asset =>
        asset.id === updatedAsset.id ? updatedAsset : asset
      ));
      setShowEditModal(false);
      setAssetToEdit(null);
      // Refresh assets after editing
      fetchAssets();
    } catch (err) {
      console.error('Failed to update asset:', err);
      setError('Failed to update asset. Please try again.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!assetToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${assetToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setAssets(prevAssets => prevAssets.filter(asset => asset.id !== assetToDelete.id));
      setShowDeleteModal(false);
      setAssetToDelete(null);
      // Refresh assets after deleting
      fetchAssets();
    } catch (err) {
      console.error('Failed to delete asset:', err);
      setError('Failed to delete asset. Please try again.');
    }
  };

  // --- Utility Functions (unchanged) ---

  const getAssetIcon = (type: Asset['type']) => {
    const assetType = assetTypes.find(at => at.id === type);
    return assetType ? assetType.icon : Laptop;
  };

  const getAssetColorClasses = (type: Asset['type']) => {
    const assetType = assetTypes.find(at => at.id === type);
    if (!assetType) return { bg: 'bg-gray-100', text: 'text-gray-600' };

    const colorMap: Record<AssetType['color'], { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' }
    };

    return colorMap[assetType.color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'assigned': return 'text-green-600 bg-green-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'retired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionColor = (condition: Asset['condition']) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // The filtering logic now relies on the `fetchAssets` function
  // which will either fetch by category or by search term from the backend.
  // The frontend filter is only needed for the 'all assets' view if no search term is present.
  const displayAssets = assets.filter(asset => {
    if (selectedCategory === 'all' && !searchTerm) {
      return true; // Show all if no category is selected and no search term
    }
    // Backend handles category and search filtering, so the data coming in `assets`
    // is already filtered. This client-side filter might be redundant but kept
    // for safety if backend filtering is not always exclusive.
    const matchesCategory = selectedCategory === 'all' || asset.type === selectedCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Asset
        </button>
      </div>

      {/* Asset Type Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Categories</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm(''); // Clear search when changing category
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Assets ({assets.length})
          </button>
          {assetTypes.map((type) => {
            const Icon = type.icon;
            // The count will now reflect what's fetched, not necessarily the total in mock data
            const count = assets.filter(asset => asset.type === type.id).length;
            const colorClasses = getAssetColorClasses(type.id as Asset['type']);
            return (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedCategory(type.id);
                  setSearchTerm(''); // Clear search when changing category
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === type.id
                    ? `${colorClasses.bg} ${colorClasses.text}`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search assets by name, serial number, or assigned to..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedCategory('all'); // Clear category when searching
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* The filter button here doesn't have functionality yet, but can be used for advanced filtering */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading assets...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Assets Grid */}
        {!loading && !error && (
          <div className="p-4">
            {displayAssets.length === 0 && (selectedCategory === 'all' && !searchTerm) ? (
              <div className="text-center py-12">
                <Laptop className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
                <p className="text-gray-500">Add new assets or try adjusting your search/filter criteria.</p>
              </div>
            ) : displayAssets.length === 0 ? (
              <div className="text-center py-12">
                <Laptop className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assets match your criteria</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayAssets.map((asset) => {
                  const Icon = getAssetIcon(asset.type);
                  const colorClasses = getAssetColorClasses(asset.type);
                  return (
                    <div key={asset.id} className="bg-white rounded-lg shadow p-4 relative">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                          <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => { setAssetToEdit(asset); setShowEditModal(true); }}
                            className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100"
                            title="Edit Asset"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => { setAssetToDelete(asset); setShowDeleteModal(true); }}
                            className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-gray-100"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                           <button
                            onClick={() => { setSelectedAsset(asset); setShowHistoryModal(true); }}
                            className="text-gray-500 hover:text-purple-600 p-1 rounded-full hover:bg-gray-100"
                            title="View History"
                          >
                            <Clock className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{asset.name}</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Serial: {asset.serialNumber}</p>
                        <p className="text-sm text-gray-600">Assigned to: {asset.assignedTo || 'Unassigned'}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                            {asset.status}
                          </span>
                          <span className={`text-xs font-medium ${getConditionColor(asset.condition)}`}>
                            {asset.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Asset</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                <input
                  type="text"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newAsset.type}
                  onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value as Asset['type'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {assetTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                <input
                  type="text"
                  value={newAsset.serialNumber}
                  onChange={(e) => setNewAsset({ ...newAsset, serialNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  type="text"
                  value={newAsset.assignedTo}
                  onChange={(e) => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newAsset.status}
                  onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value as Asset['status'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="assigned">Assigned</option>
                  <option value="available">Available</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                <input
                  type="date"
                  value={newAsset.purchaseDate}
                  onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={newAsset.condition}
                  onChange={(e) => setNewAsset({ ...newAsset, condition: e.target.value as Asset['condition'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newAsset.notes || ''}
                  onChange={(e) => setNewAsset({ ...newAsset, notes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAsset}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Asset Modal */}
      {showEditModal && assetToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Asset</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                <input
                  type="text"
                  value={assetToEdit.name}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={assetToEdit.type}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, type: e.target.value as Asset['type'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled // Type is generally not changeable for an existing asset
                >
                  {assetTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                <input
                  type="text"
                  value={assetToEdit.serialNumber}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, serialNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled // Serial number is generally not changeable
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  type="text"
                  value={assetToEdit.assignedTo}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={assetToEdit.status}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, status: e.target.value as Asset['status'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="assigned">Assigned</option>
                  <option value="available">Available</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                <input
                  type="date"
                  value={assetToEdit.purchaseDate}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, purchaseDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled // Purchase date generally fixed after creation
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance Date</label>
                <input
                  type="date"
                  value={assetToEdit.lastMaintenance || ''}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, lastMaintenance: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={assetToEdit.condition}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, condition: e.target.value as Asset['condition'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={assetToEdit.notes || ''}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, notes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditAsset}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Asset History</h2>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">{selectedAsset.name}</h3>
                <p className="text-sm text-gray-600">Serial: {selectedAsset.serialNumber}</p>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2"> {/* Added max-height and overflow for scroll */}
                {(selectedAsset.history && selectedAsset.history.length > 0) ? (
                  selectedAsset.history.map((entry) => (
                    <div key={entry.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{entry.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString()} by {entry.performedBy}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No history available for this asset.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && assetToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Delete Asset</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{assetToDelete.name}</span> (Serial: {assetToDelete.serialNumber})? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}