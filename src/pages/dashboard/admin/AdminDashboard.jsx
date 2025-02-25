import DashboardCard from "../../../components/DashboardCard";
import { useGetMyInfoQuery } from "../../../redux/api/auth.api";
import { useGetAdminDashboardDataQuery } from "../../../redux/api/dashboard.api";

const AdminDashboard = () => {
    const { data: myData, isLoading: myDataLoading } = useGetMyInfoQuery();
    const { data: dashboardData, isLoading: isDashboardDataLoading } = useGetAdminDashboardDataQuery();

    const myInfo = myData?.data;
    const stats = {
        totalUsers: dashboardData?.totalUsers || 0,
        totalAgents: dashboardData?.totalAgents || 0,
        totalBalance: dashboardData?.totalBalance || 0,
        totalIncome: dashboardData?.totalIncome || 0,
        pendingRequests: dashboardData?.pendingRequests || 0,
        approvedRequests: dashboardData?.approvedRequests || 0,
        rejectedRequests: dashboardData?.totalSystemMoneyRequests - (dashboardData?.approvedRequests || 0) - (dashboardData?.pendingRequests || 0) || 0,
    };

    if (isDashboardDataLoading) {
        return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Users */}
                <DashboardCard title="Total Users" value={stats.totalUsers} color="blue" icon="👥" />

                {/* Total Agents */}
                <DashboardCard title="Total Agents" value={stats.totalAgents} color="green" icon="🕵️‍♂️" />

                {/* Total Balance */}
                <DashboardCard title="Total Balance" value={`${stats.totalBalance} Taka`} color="purple" icon="💰" />

                {/* Total Income */}
                <DashboardCard title="Total Income" value={`${stats.totalIncome} Taka`} color="yellow" icon="📈" />

                {/* Pending Requests */}
                <DashboardCard title="Pending Requests" value={stats.pendingRequests} color="orange" icon="⏳" />

                {/* Approved Requests */}
                <DashboardCard title="Approved Requests" value={stats.approvedRequests} color="green" icon="✅" />

                {/* Rejected Requests */}
                <DashboardCard title="Rejected Requests" value={stats.rejectedRequests} color="red" icon="❌" />
            </div>
        </div>
    );
};



export default AdminDashboard;
