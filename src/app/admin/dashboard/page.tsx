import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import Market from '@/lib/models/Market'
import Inquiry from '@/lib/models/Inquiry'
import Product from '@/lib/models/Product'
import Resource from '@/lib/models/Resource'
import AdminSidebar from '@/components/admin/AdminSidebar'
import {
  Briefcase,
  Building2,
  Mail,
  ShoppingBag,
  FileDown,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'

async function getDashboardStats() {
  await connectDB()

  const [
    totalServices,
    totalMarkets,
    newInquiries,
    totalProducts,
    totalResources,
    publishedServices,
    recentInquiries,
  ] = await Promise.all([
    Service.countDocuments(),
    Market.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Product.countDocuments({ status: 'published' }),
    Resource.countDocuments({ status: 'published' }),
    Service.countDocuments({ status: 'published' }),
    Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])

  return {
    totalServices,
    totalMarkets,
    newInquiries,
    totalProducts,
    totalResources,
    publishedServices,
    recentInquiries: JSON.parse(JSON.stringify(recentInquiries)),
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="flex min-h-screen bg-soft-ice">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-graphite mb-2">Dashboard</h1>
            <p className="text-graphite/60">Welcome to your admin portal</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-profile-blue/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-profile-blue" />
                </div>
                <TrendingUp className="w-5 h-5 text-electric-cyan" />
              </div>
              <div className="text-3xl font-bold text-graphite mb-1">
                {stats.publishedServices}/{stats.totalServices}
              </div>
              <div className="text-sm text-graphite/60">Services Published</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-electric-cyan" />
                </div>
              </div>
              <div className="text-3xl font-bold text-graphite mb-1">{stats.totalMarkets}</div>
              <div className="text-sm text-graphite/60">Market Segments</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-warm-amber/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-warm-amber" />
                </div>
                {stats.newInquiries > 0 && (
                  <AlertCircle className="w-5 h-5 text-warm-amber" />
                )}
              </div>
              <div className="text-3xl font-bold text-graphite mb-1">{stats.newInquiries}</div>
              <div className="text-sm text-graphite/60">New Inquiries</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-electric-cyan" />
                </div>
              </div>
              <div className="text-3xl font-bold text-graphite mb-1">{stats.totalProducts}</div>
              <div className="text-sm text-graphite/60">Products Active</div>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-graphite">Recent Inquiries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-soft-ice">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-graphite/60 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-graphite/60 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-graphite/60 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-graphite/60 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-graphite/60 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.recentInquiries.map((inquiry: any) => (
                    <tr key={inquiry._id} className="hover:bg-soft-ice/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-graphite">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite/70">
                        {inquiry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite/70">
                        {inquiry.service || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            inquiry.status === 'new'
                              ? 'bg-warm-amber/10 text-warm-amber'
                              : inquiry.status === 'read'
                              ? 'bg-profile-blue/10 text-profile-blue'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite/70">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <a
              href="/admin/services"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Briefcase className="w-8 h-8 text-profile-blue mb-4" />
              <h3 className="font-semibold text-graphite mb-2">Manage Services</h3>
              <p className="text-sm text-graphite/60">
                Edit service pages and content
              </p>
            </a>

            <a
              href="/admin/inquiries"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail className="w-8 h-8 text-warm-amber mb-4" />
              <h3 className="font-semibold text-graphite mb-2">View Inquiries</h3>
              <p className="text-sm text-graphite/60">
                Respond to customer inquiries
              </p>
            </a>

            <a
              href="/admin/settings"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AlertCircle className="w-8 h-8 text-electric-cyan mb-4" />
              <h3 className="font-semibold text-graphite mb-2">Settings</h3>
              <p className="text-sm text-graphite/60">
                Update contact info and integrations
              </p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
