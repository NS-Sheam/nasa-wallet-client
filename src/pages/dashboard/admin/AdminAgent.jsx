import { useGetAllAgentsQuery } from "../../../redux/api/agent.api";

const AdminAgents = () => {
    const { data } = useGetAllAgentsQuery();

    const agents = data?.data;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Agents</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                        <thead className="text-gray-700 bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Mobile Number</th>
                                <th className="py-2 px-4 text-left">Balance</th>
                                <th className="py-2 px-4 text-left">Income</th>
                                <th className="py-2 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents?.map((agent) => (
                                <tr key={agent._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{agent._id}</td>
                                    <td className="py-2 px-4 text-gray-800">{agent.name}</td>
                                    <td className="py-2 px-4 text-gray-600">{agent.user.mobileNumber}</td>
                                    <td className="py-2 px-4 text-gray-800">{agent.balance} Taka</td>
                                    <td className="py-2 px-4 text-gray-800">{agent.income} Taka</td>
                                    <td className="py-2 px-4">
                                        {agent.user.isVerified ? (
                                            <span className="text-green-500">Verified</span>
                                        ) : (
                                            <span className="text-yellow-500">Pending</span>
                                        )}
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

export default AdminAgents;
