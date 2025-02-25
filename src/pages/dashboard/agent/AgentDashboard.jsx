import { useGetAgentDashboardDataQuery } from "../../../redux/api/dashboard.api";
import { useGetMyInfoQuery } from "../../../redux/api/auth.api";
import DashboardCard from "../../../components/DashboardCard";

const AgentDashboard = () => {
    const { data: myData } = useGetMyInfoQuery();
    const userId = myData?.data?._id;
    const { data: dashboardData, isLoading } = useGetAgentDashboardDataQuery(userId, { skip: !userId });

    const stats = {
        totalCashInRequests: dashboardData?.totalCashInRequests || 0,
        totalCashOutRequests: dashboardData?.totalCashOutRequests || 0,
        totalTransactions: dashboardData?.totalTransactions || 0,
        agentBalance: dashboardData?.agentBalance.toFixed(2) || 0,
        agentIncome: dashboardData?.agentIncome.toFixed(2) || 0,
        pendingRequests: dashboardData?.pendingRequests || 0,
        approvedRequests: dashboardData?.approvedRequests || 0,
    };

    if (isLoading) {
        return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Agent Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard title="Total Cash In Requests" value={stats.totalCashInRequests} color="blue" icon="💵" />
                <DashboardCard title="Total Cash Out Requests" value={stats.totalCashOutRequests} color="red" icon="💸" />
                <DashboardCard title="Total Transactions" value={stats.totalTransactions} color="purple" icon="🔄" />
                <DashboardCard title="Agent Balance" value={`${stats.agentBalance} Taka`} color="green" icon="💰" />
                <DashboardCard title="Agent Income" value={`${stats.agentIncome} Taka`} color="yellow" icon="📈" />
                <DashboardCard title="Pending Requests" value={stats.pendingRequests} color="orange" icon="⏳" />
                <DashboardCard title="Approved Requests" value={stats.approvedRequests} color="green" icon="✅" />
            </div>
        </div>
    );
};

export default AgentDashboard;