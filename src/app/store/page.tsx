'use client';

import Link from 'next/link';
import { 
  ShoppingCartIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  ClipboardIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
  DocumentArrowUpIcon,
  BeakerIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  TableCellsIcon,
  CpuChipIcon,
  PrinterIcon,
  PencilSquareIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,

} from '@heroicons/react/24/outline';

type SectionColor = 'indigo' | 'teal' | 'rose';

export default function StoreDashboard() {
  const sections = [
    {
      title: "Stationary",
      description: "Office supplies and daily consumables management",
      icon: PencilSquareIcon,
      color: "indigo" as SectionColor,
      count: "1,247",
      items: [
        {
          title: "Regular Usage",
          description: "Daily office supplies and consumables",
          href: "/store/stationary/regular",
          icon: BookOpenIcon,
          count: "956"
        },
        {
          title: "Fixed Items",
          description: "Permanent stationary items",
          href: "/store/stationary/fixed",
          icon: ArchiveBoxIcon,
          count: "186"
        },
        {
          title: "In/Out Details",
          description: "Track stationary movement",
          href: "/store/stationary/inventory",
          icon: DocumentArrowUpIcon,
          count: "105"
        }
      ]
    },
    {
      title: "Lab Materials",
      description: "Laboratory equipment and supplies management",
      icon: BeakerIcon,
      color: "teal" as SectionColor,
      count: "892",
      items: [
        {
          title: "Instruments",
          description: "Lab equipment and tools",
          href: "/store/lab/instruments",
          icon: PaintBrushIcon,
          count: "324"
        },
        {
          title: "Components",
          description: "Lab parts and components",
          href: "/store/lab/components",
          icon: WrenchScrewdriverIcon,
          count: "248"
        },
        {
          title: "Materials",
          description: "Lab consumables and materials",
          href: "/store/lab/materials",
          icon: CubeTransparentIcon,
          count: "186"
        },
        {
          title: "In/Out Details",
          description: "Track lab items movement",
          href: "/store/lab/inventory",
          icon: ChartBarIcon,
          count: "134"
        }
      ]
    },
    {
      title: "Capital Office Assets",
      description: "Permanent office equipment and furniture",
      icon: BuildingOfficeIcon,
      color: "rose" as SectionColor,
      count: "708",
      items: [
        {
          title: "Furniture",
          description: "Office furniture and fixtures",
          href: "/store/assets/furniture",
          icon: TableCellsIcon,
          count: "423"
        },
        {
          title: "Systems",
          description: "Computers and electronic systems",
          href: "/store/assets/systems",
          icon: CpuChipIcon,
          count: "156"
        },
        {
          title: "Printers & Equipment",
          description: "Printers and other office equipment",
          href: "/store/assets/printers",
          icon: PrinterIcon,
          count: "129"
        }
      ]
    }
  ];

  const stats = [
    { 
      label: "Total Inventory", 
      value: "2,847", 
      change: "+12.3%", 
      isPositive: true,
      icon: ClipboardDocumentCheckIcon,
      color: "blue"
    },
    { 
      label: "Active Assets", 
      value: "156", 
      change: "+5.2%", 
      isPositive: true,
      icon: BuildingOfficeIcon,
      color: "emerald"
    },
    { 
      label: "Low Stock Items", 
      value: "23", 
      change: "-8.1%", 
      isPositive: false,
      icon: ExclamationTriangleIcon,
      color: "amber"
    },
    { 
      label: "Monthly Orders", 
      value: "89", 
      change: "+18.7%", 
      isPositive: true,
      icon: ClipboardIcon,
      color: "violet"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCartIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Store Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Comprehensive inventory and asset management system
                </p>
              </div>
            </div>
          
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.isPositive ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
              
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className={`w-5 h-5 text-${stat.color}-500`} />
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.isPositive 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <TrendIcon className="w-3 h-3" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="pb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Inventory Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your store inventory across different categories
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, sectionIndex) => {
              const IconComponent = section.icon;
              const colorClasses = {
                indigo: {
                  bg: 'bg-indigo-50 dark:bg-indigo-900/20',
                  border: 'border-indigo-200 dark:border-indigo-800',
                  icon: 'bg-indigo-500',
                  badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                },
                teal: {
                  bg: 'bg-teal-50 dark:bg-teal-900/20',
                  border: 'border-teal-200 dark:border-teal-800',
                  icon: 'bg-teal-500',
                  badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300'
                },
                rose: {
                  bg: 'bg-rose-50 dark:bg-rose-900/20',
                  border: 'border-rose-200 dark:border-rose-800',
                  icon: 'bg-rose-500',
                  badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                }
              };
              
              const colors = colorClasses[section.color];
              
              return (
                <div key={sectionIndex} className={`${colors.bg} ${colors.border} border rounded-2xl p-8`}>
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center shadow-md`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 ${colors.badge} rounded-full text-sm font-semibold`}>
                      {section.count} items
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link key={itemIndex} href={item.href} className="group">
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group-hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center shadow-sm`}>
                                <ItemIcon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {item.count}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
