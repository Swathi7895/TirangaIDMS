'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserIcon,
  CalendarDaysIcon,
  BeakerIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  ChevronRightIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
  UsersIcon,
  PhoneIcon,
  CreditCardIcon,
  ComputerDesktopIcon,
  FolderOpenIcon,
  DocumentCheckIcon,
  DocumentMinusIcon,
  CalendarIcon,
  PresentationChartBarIcon,
  ChartBarIcon,
  EnvelopeIcon,
  CreditCardIcon as SimCardIcon,
  TruckIcon as CarIcon,
} from '@heroicons/react/24/outline';

export default function EmployeeDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is an employee
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (!isAuthenticated || userRole !== 'employee') {
      router.push('/login');
    }
  }, [router]);

  const sections = [
    {
      title: "Attendance",
      description: "View your attendance records",
      icon: CalendarDaysIcon,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
      items: [
        {
          title: "Daily",
          description: "View daily attendance",
          href: "/employee/attendance/daily",
          icon: ClockIcon,
          readOnly: true
        },
        {
          title: "Weekly",
          description: "View weekly attendance",
          href: "/employee/attendance/weekly",
          icon: CalendarDaysIcon,
          readOnly: true
        },
        {
          title: "Monthly",
          description: "View monthly attendance",
          href: "/employee/attendance/monthly",
          icon: CalendarIcon,
          readOnly: true
        },
        {
          title: "Yearly",
          description: "View yearly attendance",
          href: "/employee/attendance/yearly",
          icon: ArchiveBoxIcon,
          readOnly: true
        },
        {
          title: "Attendance Summary",
          description: "Summary of attendance",
          href: "/employee/attendance/summary",
          icon: ClipboardDocumentCheckIcon,
          readOnly: true
        }
      ]
    },
    {
      title: "Lab Materials",
      description: "View laboratory material details",
      icon: BeakerIcon,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20",
      items: [
        {
          title: "Instruments",
          description: "Lab equipment and tools",
          href: "/employee/lab/instruments",
          icon: PresentationChartBarIcon,
          readOnly: true
        },
        {
          title: "Components",
          description: "Lab parts and components",
          href: "/employee/lab/components",
          icon: ClipboardDocumentListIcon,
          readOnly: true
        },
        {
          title: "Materials",
          description: "Lab consumables and materials",
          href: "/employee/lab/materials",
          icon: ArchiveBoxIcon,
          readOnly: true
        },
        {
          title: "In/Out Details",
          description: "Track lab items movement",
          href: "/employee/lab/inventory",
          icon: BookOpenIcon,
          readOnly: true
        }
      ]
    },
    {
      title: "Employee Details and Documents",
      description: "Manage employee personal and professional documents",
      icon: UsersIcon,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20",
      items: [
        {
          title: "Resume, Marks Card, ID Proof, Offer Letter",
          description: "View personal and joining documents",
          href: "/employee/details/personal",
          icon: DocumentTextIcon,
          readOnly: true
        },
        {
          title: "Employees Handling Assets",
          description: "View assets assigned to employees",
          href: "/employee/details/assets",
          icon: ArchiveBoxIcon,
          items: [
            {
              title: "Phone",
              description: "View assigned phone details",
              href: "/employee/details/assets/phone",
              icon: PhoneIcon,
              readOnly: true
            },
            {
              title: "SIM",
              description: "View assigned SIM details",
              href: "/employee/details/assets/sim",
              icon: SimCardIcon,
              readOnly: true
            },
            {
              title: "IDCard",
              description: "View assigned ID Card details",
              href: "/employee/details/assets/idcard",
              icon: CreditCardIcon,
              readOnly: true
            },
            {
              title: "Laptop/System",
              description: "View assigned Laptop/System details",
              href: "/employee/details/assets/laptop",
              icon: ComputerDesktopIcon,
              readOnly: true
            },
            {
              title: "Vehicle",
              description: "View assigned Vehicle details",
              href: "/employee/details/assets/vehicle",
              icon: CarIcon,
              readOnly: true
            }
          ]
        },
        {
          title: "Leave Management",
          description: "Manage your leaves",
          href: "/employee/details/leave",
          icon: CalendarDaysIcon,
          items: [
            {
              title: "Leave Application",
              description: "Apply for leave",
              href: "/employee/details/leave/apply",
              icon: DocumentTextIcon,
              readOnly: false
            },
            {
              title: "Approved",
              description: "View approved leaves",
              href: "/employee/details/leave/approved",
              icon: DocumentCheckIcon,
              readOnly: true
            },
            {
              title: "Non-Approved",
              description: "View non-approved leaves",
              href: "/employee/details/leave/non-approved",
              icon: DocumentMinusIcon,
              readOnly: true
            },
            {
              title: "Holiday Leaves",
              description: "View holiday calendar",
              href: "/employee/details/leave/holidays",
              icon: CalendarIcon,
              readOnly: true
            }
          ]
        },
        {
          title: "Employee Performance",
          description: "View your performance details",
          href: "/employee/details/performance",
          icon: ChartBarIcon,
          items: [
            {
              title: "Positions",
              description: "View your position history",
              href: "/employee/details/performance/positions",
              icon: ClipboardDocumentListIcon,
              readOnly: true
            },
            {
              title: "Promotions",
              description: "View your promotion history",
              href: "/employee/details/performance/promotions",
              icon: DocumentCheckIcon,
              readOnly: true
            },
            {
              title: "Application",
              description: "View your application history",
              href: "/employee/details/performance/application",
              icon: DocumentTextIcon,
              readOnly: true
            }
          ]
        },
        {
          title: "Joining/Releving Details and Documents",
          description: "View joining and relieving documents",
          href: "/employee/details/joining",
          icon: FolderOpenIcon,
          readOnly: true
        },
        {
          title: "Weekly Activities List",
          description: "View your weekly activities",
          href: "/employee/details/activities",
          icon: ClipboardDocumentListIcon,
          readOnly: true
        }
      ]
    },
    {
      title: "Reports",
      description: "View various reports",
      icon: ChartBarIcon,
      color: "amber",
      gradient: "from-amber-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20",
      items: [
        {
          title: "Employee Reports",
          description: "View reports related to employees",
          href: "/employee/reports/employee",
          icon: UsersIcon,
          readOnly: false
        },
        {
          title: "Visit Report",
          description: "View visit reports",
          href: "/employee/reports/visit",
          icon: BookOpenIcon,
          readOnly: false
        },
        {
          title: "OEM Report",
          description: "View OEM reports",
          href: "/employee/reports/oem",
          icon: ClipboardDocumentListIcon,
          readOnly: false
        },
        {
          title: "Customer Report",
          description: "View customer reports",
          href: "/employee/reports/customer",
          icon: UsersIcon,
          readOnly: false
        },
        {
          title: "Customer Visit Place Blue Print",
          description: "View customer visit blueprints",
          href: "/employee/reports/customer-visit-blueprint",
          icon: DocumentTextIcon,
          readOnly: false
        },
        {
          title: "Employee Projection Report",
          description: "View employee projection reports",
          href: "/employee/reports/projection-report",
          icon: ChartBarIcon,
          readOnly: false
        },
        {
          title: "Employee Projection Achieved",
          description: "View employee projection achievements",
          href: "/employee/reports/projection-achieved",
          icon: ChartBarIcon,
          readOnly: false
        }
      ]
    },
    {
      title: "Memo From Admin",
      description: "View memos from admin",
      icon: MegaphoneIcon,
      color: "rose",
      gradient: "from-rose-500 to-rose-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/20",
      items: [
        {
          title: "Selected Employee Notice",
          description: "View notices for selected employees",
          href: "/employee/memo/notice",
          icon: EnvelopeIcon,
          readOnly: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
            Employee Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive dashboard for managing employee information and activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <div key={sectionIndex} className="group">
                <div className={`${section.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm transform hover:-translate-y-1`}>
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${section.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                        {section.title}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className="group/item block"
                        >
                          <div className="bg-white/70 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl p-3 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 border border-white/50 dark:border-slate-600/30 hover:shadow-md hover:scale-[1.02]">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${section.gradient} flex items-center justify-center shadow-sm transform group-hover/item:scale-110 transition-transform duration-300`}>
                                  <ItemIcon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm text-slate-800 dark:text-white group-hover/item:text-slate-900 dark:group-hover/item:text-slate-100 transition-colors">
                                    {item.title}
                                  </h3>
                                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 group-hover/item:translate-x-1 transition-all duration-200" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 