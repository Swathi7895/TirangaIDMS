'use client';





export default function FinanceManagerLayout({ children }: { children: React.ReactNode }) {



 

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 