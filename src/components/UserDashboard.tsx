import type React from "react"
import { useAuth } from "@/context/AuthContext"
import { FiUser, FiMail, FiCalendar, FiHeart, FiShoppingBag } from "react-icons/fi"
import Link from "next/link"

const UserDashboard: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h3 className="text-xl font-semibold text-white">User Profile</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UserProfileItem
              icon={<FiUser className="text-indigo-500" />}
              label="Name"
              value={user.displayName || "Not set"}
            />
            <UserProfileItem
              icon={<FiMail className="text-indigo-500" />}
              label="Email address"
              value={user.email || "Not set"}
            />
            <UserProfileItem
              icon={<FiCalendar className="text-indigo-500" />}
              label="Member since"
              value={
                user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Not available"
              }
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          icon={<FiHeart className="h-8 w-8 text-pink-500" />}
          title="Wishlist"
          description="View and manage your wishlist"
          link="/wishlist"
        />
        <DashboardCard
          icon={<FiShoppingBag className="h-8 w-8 text-green-500" />}
          title="Recent Purchases"
          description="Check your recent order history"
          link="/purchases"
        />
      </div>
    </div>
  )
}

interface UserProfileItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

const UserProfileItem: React.FC<UserProfileItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  </div>
)

interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, description, link }) => (
  <Link href={link}>
    <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
)

export default UserDashboard

