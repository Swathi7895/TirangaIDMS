import { X } from 'lucide-react';

export interface ViewField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'status';
}

interface DataViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: ViewField[];
  data: any;
}

export default function DataView({ isOpen, onClose, title, fields, data }: DataViewProps) {
  if (!isOpen) return null;

  const formatValue = (field: ViewField, value: any) => {
    if (value === undefined || value === null) return '-';

    switch (field.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'status':
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === 'Active' || value === 'Completed' || value === 'Valid' || value === 'Paid' ? 'bg-green-100 text-green-800' :
            value === 'Pending' || value === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        );
      default:
        return value;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="border-b pb-3">
              <div className="text-sm font-medium text-gray-500">{field.label}</div>
              <div className="mt-1 text-sm text-gray-900">
                {formatValue(field, data[field.name])}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 