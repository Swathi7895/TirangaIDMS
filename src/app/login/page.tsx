'use client';

import { useState, useEffect } from 'react';
import { LockClosedIcon, EnvelopeIcon, ShieldCheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    role?: string;
  }>({});

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole) {
      // Redirect to appropriate dashboard
      router.push(
        userRole === 'admin' ? '/admin' :
        userRole === 'employee' ? '/employee' :
        userRole === 'store' ? '/store' :
        userRole === 'hr' ? '/hr' :
        userRole === 'datamanager' ? '/data-manager' :
        '/finance-manager/dashboard'
      );
    }
  }, [router]);

  // Predefined credentials
  const CREDENTIALS = {
    admin: {
      email: 'admin@company.com',
      password: 'Admin@123'
    },
    employee: {
      email: 'employee@company.com',
      password: 'Employee@123'
    },
    store: {
      email: 'store@company.com',
      password: 'Store@123'
    },
    hr: {
      email: 'hr@company.com',
      password: 'HRmanage@123'
    },
    datamanager: {
      email: 'data@company.com',
      password: 'Data@123'
    },
    financemanager: {
      email: 'finance@company.com',
      password: 'Finance@123'
    },
  };

  // Handle role selection and auto-populate fields
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value as keyof typeof CREDENTIALS;
    setSelectedRole(role);
    
    if (role && CREDENTIALS[role]) {
      setEmail(CREDENTIALS[role].email);
      setPassword(CREDENTIALS[role].password);
    } else {
      setEmail('');
      setPassword('');
    }
    
    // Clear role validation error
    setValidationErrors(prev => ({ ...prev, role: undefined }));
  };

  const validateForm = (formData: FormData) => {
    const errors: { email?: string; password?: string; role?: string } = {};
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!role) {
      errors.role = 'Please select a role';
    }
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    
    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as keyof typeof CREDENTIALS;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials based on role
      if (CREDENTIALS[role] && email === CREDENTIALS[role].email && password === CREDENTIALS[role].password) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);

        // Redirect to role-specific dashboard
        const redirectPath = 
          role === 'admin' ? '/admin' :
          role === 'employee' ? '/employee' :
          role === 'store' ? '/store' :
          role === 'hr' ? '/hr' :
          role === 'datamanager' ? '/data-manager' :
          '/finance-manager/dashboard';

        router.push(redirectPath);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      // Clear authentication state on error
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              create a new account
            </Link>
          </p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Demo Credentials:</strong><br />
              Simply select a role above and the credentials will be auto-filled!<br /><br />
              <strong>Admin:</strong> admin@company.com / Admin@123<br />
              <strong>Employee:</strong> employee@company.com / Employee@123<br />
              <strong>Store:</strong> store@company.com / Store@123<br />
              <strong>HR:</strong> hr@company.com / HRmanage@123<br />
              <strong>Data Manager:</strong> data@company.com / Data@123<br />
              <strong>Finance Manager:</strong> finance@company.com / Finance@123
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role <span className="text-blue-500">(Auto-fills credentials)</span>
              </label>
              <select
                id="role"
                name="role"
                required
                value={selectedRole}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${validationErrors.role ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700`}
                onChange={handleRoleChange}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="store">Store</option>
                <option value="hr">HR Operations</option>
                <option value="datamanager">Data Manager</option>
                <option value="financemanager">Finance Manager</option>
              </select>
              {validationErrors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.role}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border ${validationErrors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setValidationErrors(prev => ({ ...prev, email: undefined })); }}
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-md relative block w-full pl-10 pr-10 py-2 border ${validationErrors.password ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setValidationErrors(prev => ({ ...prev, password: undefined })); }}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Signing in...</span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
         
        </div>
      </div>
    </div>
  );
}