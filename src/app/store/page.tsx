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
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export default function StoreDashboard() {
 

  const sections = [
    {
      title: "Stationary",
      description: "Manage office supplies and daily consumables",
      icon: PencilSquareIcon,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
      items: [
        {
          title: "Regular Usage",
          description: "Daily office supplies and consumables",
          href: "/store/stationary/regular",
          icon: BookOpenIcon
        },
        {
          title: "Fixed Items",
          description: "Permanent stationary items",
          href: "/store/stationary/fixed",
          icon: ArchiveBoxIcon
        },
        {
          title: "In/Out Details",
          description: "Track stationary movement",
          href: "/store/stationary/inventory",
          icon: DocumentArrowUpIcon
        }
      ]
    },
    {
      title: "Lab Materials",
      description: "Laboratory equipment and supplies management",
      icon: BeakerIcon,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20",
      items: [
        {
          title: "Instruments",
          description: "Lab equipment and tools",
          href: "/store/lab/instruments",
          icon: PaintBrushIcon
        },
        {
          title: "Components",
          description: "Lab parts and components",
          href: "/store/lab/components",
          icon: WrenchScrewdriverIcon
        },
        {
          title: "Materials",
          description: "Lab consumables and materials",
          href: "/store/lab/materials",
          icon: CubeTransparentIcon
        },
        {
          title: "In/Out Details",
          description: "Track lab items movement",
          href: "/store/lab/inventory",
          icon: ChartBarIcon
        }
      ]
    },
    {
      title: "Fixed Office Assets",
      description: "Manage permanent office equipment and furniture",
      icon: BuildingOfficeIcon,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20",
      items: [
        {
          title: "Furniture",
          description: "Office furniture and fixtures",
          href: "/store/assets/furniture",
          icon: TableCellsIcon
        },
        {
          title: "Systems",
          description: "Computers and electronic systems",
          href: "/store/assets/systems",
          icon: CpuChipIcon
        },
        {
          title: "Printers & Equipment",
          description: "Printers and other office equipment",
          href: "/store/assets/printers",
          icon: PrinterIcon
        },
       
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <ShoppingCartIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
            Store Management
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive inventory management system for all your business needs
          </p>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { 
              label: "Total Items", 
              value: "2,847", 
              change: "+12%", 
              color: "blue",
              icon: ClipboardDocumentCheckIcon
            },
            { 
              label: "Active Assets", 
              value: "156", 
              change: "+5%", 
              color: "emerald",
              icon: BuildingOfficeIcon
            },
            { 
              label: "Low Stock Alerts", 
              value: "23", 
              change: "-8%", 
              color: "amber",
              icon: ExclamationTriangleIcon
            },
            { 
              label: "Monthly Requests", 
              value: "89", 
              change: "+18%", 
              color: "purple",
              icon: ClipboardIcon
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 text-${stat.color}-500`} />
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`text-sm font-semibold ${
                    stat.change.startsWith('+') 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <div key={sectionIndex} className="group">
                <div className={`${section.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm transform hover:-translate-y-1`}>
                  {/* Section Header */}
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${section.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                        {section.title}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Section Items */}
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link 
                          key={itemIndex}
                          href={item.href} 
                          className="group/item block"
                        >
                          <div className="bg-white/70 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 border border-white/50 dark:border-slate-600/30 hover:shadow-md hover:scale-[1.02]">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${section.gradient} flex items-center justify-center shadow-sm transform group-hover/item:scale-110 transition-transform duration-300`}>
                                  <ItemIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover/item:text-slate-900 dark:group-hover/item:text-slate-100 transition-colors">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 group-hover/item:translate-x-1 transition-all duration-200" />
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