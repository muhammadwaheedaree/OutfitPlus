import type React from "react";
import {
  FiUsers,
  FiUserCheck,
  FiShoppingBag,
  FiSettings,
} from "react-icons/fi";
import Link from "next/link";
import { useAdminData } from "@/app/hooks/useAdminData";

const AdminDashboard: React.FC = () => {
  const { totalUsers, activeUsers } = useAdminData();

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<FiUsers className="h-8 w-8 text-blue-500" />}
          title="Total Users"
          value={totalUsers.toString()}
          description="Registered users on the platform"
        />
        <DashboardCard
          icon={<FiUserCheck className="h-8 w-8 text-green-500" />}
          title="Active Users"
          value={activeUsers.toString()}
          description="Currently active users"
        />
        <DashboardCard
          icon={<FiShoppingBag className="h-8 w-8 text-purple-500" />}
          title="Manage Products"
          description="Add, edit, or remove products"
          link="/admin/products"
        />
        <DashboardCard
          icon={<FiSettings className="h-8 w-8 text-gray-500" />}
          title="Site Settings"
          description="Configure website settings"
          link="/admin/settings"
        />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
  description: string;
  link?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  description,
  link,
}) => {
  const content = (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {value && (
              <p className="mt-1 text-2xl font-bold text-indigo-600">{value}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return link ? <Link href={link}>{content}</Link> : content;
};

export default AdminDashboard;
