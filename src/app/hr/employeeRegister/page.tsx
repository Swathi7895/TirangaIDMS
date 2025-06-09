'use client';

import { useState } from 'react';
import { 
  User,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
  Eye,
  EyeOff,
  BadgeCheck,
  AlertCircle,
  Droplet, // Icon for Blood Group
  Briefcase, // Icon for Role
  MapPin, // Icon for Address
  Image as ImageIcon // Icon for Photo Upload
} from 'lucide-react';


interface Employee {
  id: string;
  name: string;
  department: string; // Keeping department for verification feedback
}

interface EmployeeValidation {
  isValid: boolean;
  isChecked: boolean;
  employeeInfo: Employee | null;
  error: string;
}

interface FormData {
  employeeId: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bloodGroup: string; // New field
  role: string; // New field
  address: string; // New field
  permanentAddress: string; // New field
  phone: string;
  photo: File | null; // New field for file upload
}

// Mock employee database - replace with actual API call
const validEmployees: Employee[] = [
  { id: 'EMP001', name: 'John Doe', department: 'Engineering' },
  { id: 'EMP002', name: 'Jane Smith', department: 'Marketing' },
  { id: 'EMP003', name: 'Bob Johnson', department: 'Sales' },
  { id: 'EMP004', name: 'Alice Brown', department: 'HR' },
  { id: 'EMP005', name: 'Charlie Wilson', department: 'Finance' }
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    employeeId: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '', // Initialize new fields
    role: '',      // Initialize new fields
    address: '',   // Initialize new fields
    permanentAddress: '', // Initialize new fields
    phone: '',
    photo: null,   // Initialize new field
  });
  const [employeeValidation, setEmployeeValidation] = useState<EmployeeValidation>({
    isValid: false,
    isChecked: false,
    employeeInfo: null,
    error: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const validateEmployeeId = async (employeeId: string) => {
    if (!employeeId.trim()) {
      setEmployeeValidation({
        isValid: false,
        isChecked: false,
        employeeInfo: null,
        error: ''
      });
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real application, this would be an API call to your backend
    const employee = validEmployees.find(emp => emp.id.toLowerCase() === employeeId.toLowerCase());
    
    if (employee) {
      setEmployeeValidation({
        isValid: true,
        isChecked: true,
        employeeInfo: employee,
        error: ''
      });
      // Pre-fill the name field if employee is found
      setFormData(prev => ({ ...prev, fullName: employee.name }));
    } else {
      setEmployeeValidation({
        isValid: false,
        isChecked: true,
        employeeInfo: null,
        error: 'Employee ID not found. Please contact HR for assistance.'
      });
      // Clear the name field if employee is not found
      setFormData(prev => ({ ...prev, fullName: '' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'employeeId') {
      // Reset validation when employee ID changes
      setEmployeeValidation({
        isValid: false,
        isChecked: false,
        employeeInfo: null,
        error: ''
      });
      
      // Validate after user stops typing (debounce)
      const timeoutId = setTimeout(() => {
        validateEmployeeId(value);
      }, 800);
      
      // Store timeout ID in component state
      // This part needs to be handled carefully in React to clear previous timeouts
      // For simplicity here, we're just setting a new one.
      // In a real app, you might use a ref for the timeout ID.
      return () => clearTimeout(timeoutId); // Cleanup previous timeout
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData(prev => ({
      ...prev,
      photo: file
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeValidation.isValid) {
      alert('Please enter a valid Employee ID.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    
    // Basic validation for new fields
    if (!formData.bloodGroup) {
      alert('Please select your Blood Group.');
      return;
    }
    if (!formData.role) {
      alert('Please select your Role.');
      return;
    }
    if (!formData.address.trim()) {
      alert('Please enter your Address.');
      return;
    }
    if (!formData.permanentAddress.trim()) {
      alert('Please enter your Permanent Address.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would make an API call to create the account
      const employeeInfo = employeeValidation.employeeInfo;
      if (!employeeInfo) {
        throw new Error('Employee information not found');
      }

      const registrationData = {
        employeeId: formData.employeeId,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password, // In a real app, hash this before sending
        bloodGroup: formData.bloodGroup,
        role: formData.role,
        address: formData.address,
        permanentAddress: formData.permanentAddress,
        phone: formData.phone,
        department: employeeInfo.department,
        // photo: formData.photo // In a real app, you'd handle file upload separately (e.g., to S3)
      };

      console.log('Creating account with data:', registrationData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Increased delay for demonstration
      
      alert('Account created successfully!');
      // Optionally reset form or redirect
      setFormData({
        employeeId: '', fullName: '', email: '', password: '', confirmPassword: '',
        bloodGroup: '', role: '', address: '', permanentAddress: '', phone: '', photo: null
      });
      setEmployeeValidation({ isValid: false, isChecked: false, employeeInfo: null, error: '' });
      setPhotoPreview(null);
      
    } catch (error) {
      alert('Failed to create account. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 p-3 rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
            Employee Registration
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Please fill in your details to create your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee ID Field */}
              <div className="col-span-1">
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BadgeCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="employeeId"
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      employeeValidation.isChecked
                        ? employeeValidation.isValid
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                          : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm text-black`}
                    placeholder="Enter your employee ID"
                  />
                </div>
                {employeeValidation.isChecked && !employeeValidation.isValid && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {employeeValidation.error}
                  </p>
                )}
              </div>

              {/* Full Name Field */}
              <div className="col-span-1">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Blood Group Field */}
              <div className="col-span-1">
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Droplet className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="bloodGroup"
                    id="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  >
                    <option value="" className="text-black">Select Blood Group</option>
                    <option value="A+" className="text-black">A+</option>
                    <option value="A-" className="text-black">A-</option>
                    <option value="B+" className="text-black">B+</option>
                    <option value="B-" className="text-black">B-</option>
                    <option value="AB+" className="text-black">AB+</option>
                    <option value="AB-" className="text-black">AB-</option>
                    <option value="O+" className="text-black">O+</option>
                    <option value="O-" className="text-black">O-</option>
                  </select>
                </div>
              </div>

              {/* Role Field */}
              <div className="col-span-1">
                <label htmlFor="role" className="block text-sm font-medium text-black-700">
                  Role
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-black-400" />
                  </div>
                  <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  >
                    <option value="" className="text-black">Select Role</option>
                    <option value="Developer" className="text-black">Developer</option>
                    <option value="Designer" className="text-black">Designer</option>
                    <option value="Manager" className="text-black">Manager</option>
                    <option value="HR" className="text-black">HR</option>
                    <option value="Admin" className="text-black">Admin</option>
                  </select>
                </div>
              </div>

              {/* Address Field */}
              <div className="col-span-1">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Current Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    placeholder="Enter your current address"
                  />
                </div>
              </div>

              {/* Permanent Address Field */}
              <div className="col-span-1">
                <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">
                  Permanent Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="permanentAddress"
                    id="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    placeholder="Enter your permanent address"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="col-span-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="col-span-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {/* Photo Upload Field */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Upload a profile photo (max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto flex justify-center py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}