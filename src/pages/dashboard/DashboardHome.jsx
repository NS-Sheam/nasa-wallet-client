import { useGetMyInfoQuery } from "../../redux/api/auth.api";
import { useGetCustomerDashboardDataQuery } from "../../redux/api/dashboard.api";


const DashboardHome = () => {
    const { data: myData, isLoading: myDataLoading } = useGetMyInfoQuery();
    const { data: dashboardData, isLoading: isDashboardDataLoading } = useGetCustomerDashboardDataQuery();

    if (myDataLoading || isDashboardDataLoading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    const stats = {
        totalCashInRequests: dashboardData?.totalCashInRequests || 0,
        totalCashOutRequests: dashboardData?.totalCashOutRequests || 0,
        totalTransactions: dashboardData?.totalTransactions || 0,
        customerBalance: dashboardData?.customerBalance || 0,
        pendingRequests: dashboardData?.pendingRequests || 0,
        approvedRequests: dashboardData?.approvedRequests || 0,
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Customer Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Transactions */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Transactions</h3>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</p>
                    </div>
                    <span className="text-blue-500 text-3xl">🔄</span>
                </div>

                {/* Total Cash In Requests */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Cash In Requests</h3>
                        <p className="text-2xl font-bold text-green-600">{stats.totalCashInRequests}</p>
                    </div>
                    <span className="text-green-500 text-3xl">💵</span>
                </div>

                {/* Total Cash Out Requests */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Cash Out Requests</h3>
                        <p className="text-2xl font-bold text-red-600">{stats.totalCashOutRequests}</p>
                    </div>
                    <span className="text-red-500 text-3xl">💰</span>
                </div>

                {/* Customer Balance */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Customer Balance</h3>
                        <p className="text-2xl font-bold text-purple-600">{stats.customerBalance} Taka</p>
                    </div>
                    <span className="text-purple-500 text-3xl">💳</span>
                </div>

                {/* Pending Requests */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
                        <p className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</p>
                    </div>
                    <span className="text-orange-500 text-3xl">⏳</span>
                </div>

                {/* Approved Requests */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Approved Requests</h3>
                        <p className="text-2xl font-bold text-green-600">{stats.approvedRequests}</p>
                    </div>
                    <span className="text-green-500 text-3xl">✅</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
