import AdminSidebar from '@/components/admin/AdminSidebar'

interface AdminShellProps {
  children: React.ReactNode
  title: string
  description?: string
  actions?: React.ReactNode
}

export default function AdminShell({ children, title, description, actions }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-soft-ice">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-graphite">{title}</h1>
              {description && <p className="text-graphite/60 mt-1">{description}</p>}
            </div>
            {actions}
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
