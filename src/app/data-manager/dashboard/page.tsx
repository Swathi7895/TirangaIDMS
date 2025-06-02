'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  CurrencyDollarIcon, 
  BuildingLibraryIcon, 
  BuildingOffice2Icon, 
  ReceiptPercentIcon, 
  TruckIcon, 
  DocumentTextIcon, 
  ScaleIcon, 
  PresentationChartLineIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function DataManagerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const dataManagerSections = [
    {
      title: 'Sales & Purchase',
      icon: CurrencyDollarIcon,
      description: 'Manage sales orders, invoices, and vendor relationships',
      color: 'from-blue-500 to-blue-600',
      features: [
        { name: 'Sales Orders', link: '/data-manager/sales-purchase/sales-orders' },
        { name: 'Invoices', link: '/data-manager/sales-purchase/invoices' },
        { name: 'Quotations', link: '/data-manager/sales-purchase/quotations' },
        { name: 'Purchase Orders', link: '/data-manager/sales-purchase/purchase-orders' },
        { name: 'Vendor Invoices', link: '/data-manager/sales-purchase/vendor-invoices' },
        { name: 'Receipts', link: '/data-manager/sales-purchase/receipts' },
        { name: 'Customer Contracts & Agreements', link: '/data-manager/sales-purchase/customer-contracts' },
        { name: 'Vendor Agreements & Terms', link: '/data-manager/sales-purchase/vendor-agreements' },
      ],
    },
    {
      title: 'Logistics Documents',
      icon: TruckIcon,
      description: 'Track shipments, deliveries, and warehouse operations',
      color: 'from-emerald-500 to-emerald-600',
      features: [
        { name: 'Shipping Documents', link: '/data-manager/logistics/shipping-documents' },
        { name: 'Delivery Receipts', link: '/data-manager/logistics/delivery-receipts' },
        { name: 'Transportation Contracts', link: '/data-manager/logistics/transportation-contracts' },
        { name: 'Freight Bills', link: '/data-manager/logistics/freight-bills' },
        { name: 'Warehouse Records', link: '/data-manager/logistics/warehouse-records' },
        { name: 'Inventory Movements', link: '/data-manager/logistics/inventory-movements' },
        { name: 'Import/Export Documentation', link: '/data-manager/logistics/import-export' },
      ],
    },
    {
      title: 'Company Registration & Certification',
      icon: DocumentTextIcon,
      description: 'Business licenses, certifications, and compliance records',
      color: 'from-purple-500 to-purple-600',
      features: [
        { name: 'Business Registration Certificates', link: '/data-manager/registration-certification/business-registration' },
        { name: 'Trade Licenses', link: '/data-manager/registration-certification/trade-licenses' },
        { name: 'GST Registration', link: '/data-manager/registration-certification/gst-registration' },
        { name: 'Industry Certifications', link: '/data-manager/registration-certification/industry-certifications' },
        { name: 'Quality Certificates', link: '/data-manager/registration-certification/quality-certificates' },
        { name: 'Renewal Documents & Compliance Records', link: '/data-manager/registration-certification/renewal-compliance' },
      ],
    },
    {
      title: 'Banking Documents',
      icon: BuildingLibraryIcon,
      description: 'Bank guarantees, loans, and financial instruments',
      color: 'from-indigo-500 to-indigo-600',
      features: [
        { name: 'Bank Guarantees', link: '/data-manager/banking/bank-guarantees' },
        { name: 'Performance Bonds', link: '/data-manager/banking/performance-bonds' },
        { name: 'Loan Agreements', link: '/data-manager/banking/loan-agreements' },
        { name: 'Overdraft Facilities', link: '/data-manager/banking/overdraft-facilities' },
        { name: 'Stock Statements', link: '/data-manager/banking/stock-statements' },
        { name: 'Financial Guarantees', link: '/data-manager/banking/financial-guarantees' },
        { name: 'Banking Correspondence & Statements', link: '/data-manager/banking/correspondence-statements' },
      ],
    },
    {
      title: 'Billing & Booking Management',
      icon: ReceiptPercentIcon,
      description: 'Customer billing, bookings, and payment tracking',
      color: 'from-orange-500 to-orange-600',
      features: [
        { name: 'Customer Billing Records', link: '/data-manager/billing-booking/customer-billing' },
        { name: 'Booking Confirmations & Schedules', link: '/data-manager/billing-booking/booking-confirmations' },
        { name: 'Payment Tracking & Receipts', link: '/data-manager/billing-booking/payment-tracking' },
        { name: 'Credit Notes & Adjustments', link: '/data-manager/billing-booking/credit-notes' },
      ],
    },
    {
      title: 'CA Documents',
      icon: ScaleIcon,
      description: 'Tax returns, audits, and statutory compliance',
      color: 'from-red-500 to-red-600',
      features: [
        { name: 'Tax Returns', link: '/data-manager/ca-documents/tax-returns' },
        { name: 'Audit Reports', link: '/data-manager/ca-documents/audit-reports' },
        { name: 'Financial Statements & Balance Sheets', link: '/data-manager/ca-documents/financial-statements' },
        { name: 'GST Filings', link: '/data-manager/ca-documents/gst-filings' },
        { name: 'TDS Certificates', link: '/data-manager/ca-documents/tds-certificates' },
        { name: 'Statutory Compliance Documents', link: '/data-manager/ca-documents/statutory-compliance' },
      ],
    },
    {
      title: 'Tender Management',
      icon: BuildingOffice2Icon,
      description: 'Tender documents, bids, and contract awards',
      color: 'from-teal-500 to-teal-600',
      features: [
        { name: 'Tender Documents & Proposals', link: '/data-manager/tender-management/tender-documents' },
        { name: 'Bid Submissions & Technical Specifications', link: '/data-manager/tender-management/bid-submissions' },
        { name: 'Contract Awards & Performance Guarantees', link: '/data-manager/tender-management/contract-awards' },
        { name: 'Tender Correspondence & Evaluations', link: '/data-manager/tender-management/correspondence-evaluations' },
      ],
    },
    {
      title: 'Finance Reports',
      icon: PresentationChartLineIcon,
      description: 'Financial reporting, cash flow, and budget analysis',
      color: 'from-pink-500 to-pink-600',
      features: [
        { name: 'Monthly/Quarterly Financial Reports', link: '/data-manager/finance-reports/monthly-quarterly' },
        { name: 'Cash Flow Statements', link: '/data-manager/finance-reports/cash-flow' },
        { name: 'Profit & Loss', link: '/data-manager/finance-reports/profit-loss' },
        { name: 'Budget Reports & Variance Analysis', link: '/data-manager/finance-reports/budget-variance' },
        { name: 'Management Information Reports', link: '/data-manager/finance-reports/management-information' },
      ],
    },
  ];

  const filteredSections = dataManagerSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.features.some(feature => 
      feature.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Data Manager Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Centralized document management and business operations
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search sections or documents..."
                className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSections.map((section) => (
            <div
              key={section.title}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
            >
              {/* Section Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} shadow-lg`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 gap-2">
                  {section.features.map((feature, index) => (
                    <Link
                      key={feature.name}
                      href={feature.link}
                      className="group/item flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <span className="text-slate-700 dark:text-slate-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors font-medium">
                        {feature.name}
                      </span>
                      <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 group-hover/item:translate-x-1 transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Section Footer */}
              <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {section.features.length} document types
                  </span>
                  <div className="flex space-x-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.color} opacity-60`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredSections.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or browse all sections above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}