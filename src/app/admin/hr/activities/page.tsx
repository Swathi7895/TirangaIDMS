'use client';
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  X, 
  Calendar,
  Clock,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  notes?: string;
}

type ModalType = 'add' | 'edit' | 'view';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Team Building Workshop',
      description: 'Quarterly team building activity for the engineering team',
      date: '2024-03-20',
      time: '10:00',
      status: 'pending',
      assignedTo: 'HR Team',
      priority: 'high',
      category: 'Team Event',
      notes: 'Venue to be confirmed'
    },
    {
      id: '2',
      title: 'Performance Review Meeting',
      description: 'Monthly performance review with department heads',
      date: '2024-03-15',
      time: '14:00',
      status: 'in-progress',
      assignedTo: 'HR Manager',
      priority: 'high',
      category: 'Meeting',
      notes: 'Prepare review templates'
    },
    {
      id: '3',
      title: 'New Employee Orientation',
      description: 'Orientation program for new joiners',
      date: '2024-03-25',
      time: '09:00',
      status: 'pending',
      assignedTo: 'HR Team',
      priority: 'medium',
      category: 'Training',
      notes: 'Send welcome emails'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('add');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState<Partial<Activity>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const isEditMode = modalType === 'edit';
  const isViewMode = modalType === 'view';

  const openModal = (type: ModalType, activity?: Activity) => {
    setModalType(type);
    setSelectedActivity(activity || null);
    if (type === 'add') {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        status: 'pending',
        assignedTo: '',
        priority: 'medium',
        category: '',
        notes: ''
      });
    } else if (activity) {
      setFormData({ ...activity });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
    setFormData({});
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.assignedTo || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    if (modalType === 'add') {
      const newActivity: Activity = {
        ...formData as Activity,
        id: Date.now().toString()
      };
      setActivities([...activities, newActivity]);
    } else if (modalType === 'edit' && selectedActivity) {
      setActivities(activities.map(activity => 
        activity.id === selectedActivity.id 
          ? { ...formData as Activity, id: selectedActivity.id }
          : activity
      ));
    }
    
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: Activity['status']) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, status: newStatus }
        : activity
    ));
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', ...new Set(activities.map(a => a.category))];
  const statuses = ['all', 'pending', 'in-progress', 'completed'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Weekly Activities</h1>
       
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                activity.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {activity.date} at {activity.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-2" />
                {activity.assignedTo}
              </div>
              <div className="flex items-center text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                  activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)} Priority
                </span>
              </div>
            </div>

        
          </div>
        ))}
      </div>

    </div>
  );
} 