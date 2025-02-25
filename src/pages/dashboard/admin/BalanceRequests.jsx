const AdminBalanceRequests = () => {
    const requests = [
        { id: 1, agentName: "Agent 1", amount: 1000, date: "2023-10-01", status: "pending" },
        { id: 2, agentName: "Agent 2", amount: 2000, date: "2023-10-02", status: "approved" },
        { id: 3, agentName: "Agent 3", amount: 1500, date: "2023-10-03", status: "rejected" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Balance Requests</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                        <thead className="text-gray-700 bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Agent Name</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{request.id}</td>
                                    <td className="py-2 px-4 text-gray-800">{request.agentName}</td>
                                    <td className="py-2 px-4 text-gray-800">{request.amount} Taka</td>
                                    <td className="py-2 px-4">{request.date}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`${request.status === "approved"
                                                    ? "text-green-500"
                                                    : request.status === "pending"
                                                        ? "text-yellow-500"
                                                        : "text-red-500"
                                                }`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBalanceRequests;
