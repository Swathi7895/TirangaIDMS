'use client';
import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  Monitor, 
  Printer, 
  Headphones, 
  
  Search, 
  Filter, 
  X, 
 
  Clock
} from 'lucide-react';

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
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
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

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 1,
      name: 'MacBook Pro 2023',
      type: 'laptop',
      serialNumber: 'MBP2023-001',
      assignedTo: 'John Doe',
      status: 'assigned',
      purchaseDate: '2023-12-01',
      condition: 'excellent',
      notes: '16GB RAM, 512GB SSD',
      history: [
        {
          id: 1,
          date: '2023-12-01',
          action: 'status_change' as const,
          description: 'Asset added to inventory',
          performedBy: 'HR Admin'
        },
        {
          id: 2,
          date: '2023-12-02',
          action: 'assigned' as const,
          description: 'Assigned to John Doe',
          performedBy: 'HR Admin'
        }
      ]
    },
    {
      id: 2,
      name: 'iPhone 14 Pro',
      type: 'phone',
      serialNumber: 'IP14P-002',
      assignedTo: 'Jane Smith',
      status: 'assigned',
      purchaseDate: '2023-11-15',
      condition: 'good',
      history: [
        {
          id: 1,
          date: '2023-11-15',
          action: 'status_change' as const,
          description: 'Asset added to inventory',
          performedBy: 'HR Admin'
        },
        {
          id: 2,
          date: '2023-11-16',
          action: 'assigned' as const,
          description: 'Assigned to Jane Smith',
          performedBy: 'HR Admin'
        }
      ]
    },
    {
      id: 3,
      name: 'Dell UltraSharp 4K',
      type: 'monitor',
      serialNumber: 'DELL-003',
      assignedTo: '',
      status: 'available',
      purchaseDate: '2023-10-20',
      condition: 'excellent'
    },
    {
      id: 4,
      name: 'HP LaserJet Pro',
      type: 'printer',
      serialNumber: 'HP-004',
      assignedTo: 'Marketing Team',
      status: 'maintenance',
      purchaseDate: '2023-09-01',
      lastMaintenance: '2024-01-15',
      condition: 'fair',
      notes: 'Needs toner replacement'
    },
    {
      id: 5,
      name: 'Sony WH-1000XM4',
      type: 'headphones',
      serialNumber: 'SONY-005',
      assignedTo: 'Mike Johnson',
      status: 'assigned',
      purchaseDate: '2023-08-15',
      condition: 'good'
    }
  ]);

  const assetTypes: AssetType[] = [
    { id: 'laptop', name: 'Laptops', icon: Laptop, color: 'blue' },
    { id: 'phone', name: 'Phones', icon: Smartphone, color: 'green' },
    { id: 'monitor', name: 'Monitors', icon: Monitor, color: 'purple' },
    { id: 'printer', name: 'Printers', icon: Printer, color: 'orange' },
    { id: 'headphones', name: 'Headphones', icon: Headphones, color: 'red' }
  ];

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
    switch(status) {
      case 'assigned': return 'text-green-600 bg-green-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'retired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionColor = (condition: Asset['condition']) => {
    switch(condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.type === selectedCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeleteClick = (asset: Asset) => {
    setAssetToDelete(asset);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (assetToDelete) {
      setAssets(assets.filter(asset => asset.id !== assetToDelete.id));
      setShowDeleteModal(false);
      setAssetToDelete(null);
    }
  };

  const handleAddAsset = () => {
    const newId = Math.max(...assets.map(a => a.id)) + 1;
    const assetToAdd: Asset = {
      ...newAsset as Asset,
      id: newId,
      history: [{
        id: 1,
        date: new Date().toISOString(),
        action: 'status_change' as const,
        description: 'Asset added to inventory',
        performedBy: 'HR Admin'
      }]
    };
    setAssets([...assets, assetToAdd]);
    setShowAddModal(false);
    setNewAsset({
      name: '',
      type: 'laptop',
      serialNumber: '',
      assignedTo: '',
      status: 'available',
      purchaseDate: new Date().toISOString().split('T')[0],
      condition: 'excellent',
      notes: ''
    });
  };

  const handleEditAsset = () => {
    if (assetToEdit) {
      const updatedAssets = assets.map(asset => {
        if (asset.id === assetToEdit.id) {
          const updatedAsset = {
            ...assetToEdit,
            history: [
              ...(asset.history || []),
              {
                id: (asset.history?.length || 0) + 1,
                date: new Date().toISOString(),
                action: 'status_change' as const,
                description: 'Asset details updated',
                performedBy: 'HR Admin'
              }
            ]
          };
          return updatedAsset;
        }
        return asset;
      });
      setAssets(updatedAssets);
      setShowEditModal(false);
      setAssetToEdit(null);
    }
  };

  const handleViewHistory = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowHistoryModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
      
      </div>

      {/* Asset Type Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Categories</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
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
            const count = assets.filter(asset => asset.type === type.id).length;
            const colorClasses = getAssetColorClasses(type.id as Asset['type']);
            return (
              <button
                key={type.id}
                onClick={() => setSelectedCategory(type.id)}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="p-4">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <Laptop className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssets.map((asset) => {
                const Icon = getAssetIcon(asset.type);
                const colorClasses = getAssetColorClasses(asset.type);
                return (
                  <div key={asset.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                        <Icon className={`w-6 h-6 ${colorClasses.text}`} />
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
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Asset</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                <input
                  type="text"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                <input
                  type="date"
                  value={newAsset.purchaseDate}
                  onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  type="text"
                  value={assetToEdit.assignedTo}
                  onChange={(e) => setAssetToEdit({ ...assetToEdit, assignedTo: e.target.value })}
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
              <div className="flex justify-end space-x-3">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
              <div className="space-y-3">
                {(selectedAsset.history || []).map((entry) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && assetToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Asset</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete {assetToDelete.name}? This action cannot be undone.
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