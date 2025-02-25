import { useGetAllAgentsQuery } from "../../../redux/api/agent.api";
import { toast } from "react-toastify";
import { useState } from "react";
import CommonLoaderError from "../../../components/CommonLoaderError";
import { useToggleUserStatusMutation, useVerifyUserMutation } from "../../../redux/api/user.api";
import { useGetAllTransactionsQuery } from "../../../redux/api/transaction.api";
import CommonModal from "../../../components/CommonModal";

const AdminAgents = () => {
    const [verifyUser] = useVerifyUserMutation();
    const [toggleUserStatus] = useToggleUserStatusMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [selectedAgent, setSelectedAgent] = useState(null);
    const userSearchQuery = []

    if (mobileNumber) {
        userSearchQuery.push({ name: "mobileNumber", value: mobileNumber });
    }
    const { data, isLoading, isError, error } = useGetAllAgentsQuery(userSearchQuery);
    const searchQuery = selectedAgent ? [{ name: "userId", value: selectedAgent.user._id }] : [];

    const { data: transactionData, isLoading: transactionIsLoading, isError: transactionIsError, error: transactionError } = useGetAllTransactionsQuery(searchQuery);

    if (isLoading || isError) {
        return <CommonLoaderError title="Users" isLoading={isLoading} isError={isError} error={error} />;
    }

    const agents = data?.data;


    const handleVerifyUser = async (id) => {
        const toastId = toast.loading("Verifying user...");
        try {
            const res = await verifyUser(id);
            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Failed to verify user",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }
            toast.update(toastId, {
                render: "User verified successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to verify user",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const handleToggleUserStatus = async (id) => {
        const toastId = toast.loading("Updating user status...");
        try {
            const res = await toggleUserStatus(id);
            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Failed to update user status",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }
            toast.update(toastId, {
                render: "User status updated successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to update user status",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const handleViewTransactions = (agent) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Agents</h1>
            <input type="text" placeholder="Search under contraction" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="p-1 mb-4 border outline-none border-gray-200 w-56 bg-white" />
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
                                <th className="py-2 px-4 text-left">Actions</th>
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
                                    <td className="py-2 px-4">
                                        {
                                            !agent.user.isVerified && (
                                                <button
                                                    onClick={() => handleVerifyUser(agent.user?._id)}
                                                    className="text-blue-500 hover:underline mr-4"
                                                >
                                                    Verify
                                                </button>
                                            )
                                        }
                                        <button
                                            onClick={() => handleToggleUserStatus(agent?.user?._id)}
                                            className="text-red-500 hover:underline mr-4"
                                        >
                                            {agent.user.isActive ? "Block" : "Unblock"}
                                        </button>
                                        <button
                                            onClick={() => handleViewTransactions(agent)}
                                            className="text-gray-500 hover:underline"
                                        >
                                            View Transactions
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && selectedAgent && (
                <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
                    {transactionIsLoading ? (
                        <p>Loading transactions...</p>
                    ) : transactionIsError ? (
                        <p className="text-red-500">Failed to load transactions: {transactionError.message}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-sm">
                                <thead className="text-gray-700 bg-gray-200">
                                    <tr>
                                        <th className="py-2 px-4 text-left">Transaction ID</th>
                                        <th className="py-2 px-4 text-left">Amount</th>
                                        <th className="py-2 px-4 text-left">Date</th>
                                        <th className="py-2 px-4 text-left">Type</th>
                                        <th className="py-2 px-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionData?.data?.map((transaction) => (
                                        <tr key={transaction?._id} className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-4">{transaction?.transactionId}</td>
                                            <td className="py-2 px-4">{transaction?.amount} Taka</td>
                                            <td className="py-2 px-4">{new Date(transaction?.createdAt).toLocaleDateString()}</td>
                                            <td className="py-2 px-4">{transaction?.type}</td>
                                            <td className="py-2 px-4">{transaction?.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CommonModal>
            )}
        </div>
    );
};



export default AdminAgents;