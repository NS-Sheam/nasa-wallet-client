const AdminDashboard = () => {

    const stats = {
        totalUsers: 1200,
        totalAgents: 150,
        totalBalance: 500000,
        totalIncome: 200000,
        pendingRequests: 12,
        approvedRequests: 85,
        rejectedRequests: 10,
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Users */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                    </div>
                    <span className="text-blue-500 text-3xl">👥</span>
                </div>

                {/* Total Agents */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Agents</h3>
                        <p className="text-2xl font-bold text-green-600">{stats.totalAgents}</p>
                    </div>
                    <span className="text-green-500 text-3xl">🕵️‍♂️</span>
                </div>

                {/* Total Balance */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Balance</h3>
                        <p className="text-2xl font-bold text-purple-600">{stats.totalBalance} Taka</p>
                    </div>
                    <span className="text-purple-500 text-3xl">💰</span>
                </div>

                {/* Total Income */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Income</h3>
                        <p className="text-2xl font-bold text-yellow-600">{stats.totalIncome} Taka</p>
                    </div>
                    <span className="text-yellow-500 text-3xl">📈</span>
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

                {/* Rejected Requests */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Rejected Requests</h3>
                        <p className="text-2xl font-bold text-red-600">{stats.rejectedRequests}</p>
                    </div>
                    <span className="text-red-500 text-3xl">❌</span>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
