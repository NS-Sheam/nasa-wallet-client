import { useToggleUserStatusMutation, useVerifyUserMutation } from "../../../redux/api/user.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGetAllCustomersQuery } from "../../../redux/api/customer.api";
import CommonLoaderError from "../../../components/CommonLoaderError";
import CommonModal from "../../../components/CommonModal";
import { useGetAllTransactionsQuery } from "../../../redux/api/transaction.api";


const AdminUsers = () => {
    const { data, isLoading, isError, error } = useGetAllCustomersQuery();
    const [verifyUser] = useVerifyUserMutation();
    const [toggleUserStatus] = useToggleUserStatusMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const searchQuery = selectedUser ? [{ name: "userId", value: selectedUser?.user._id }] : [];
    const { data: transactionData, isLoading: transactionIsLoading, isError: transactionIsError, error: transactionError } = useGetAllTransactionsQuery(searchQuery);
    if (isLoading || isError) {
        return <CommonLoaderError title="Users" isLoading={isLoading} isError={isError} error={error} />;
    }

    const users = data?.data;

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

    const handleViewTransactions = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Users</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                        <thead className="text-gray-700 bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Balance</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{user._id}</td>
                                    <td className="py-2 px-4 text-gray-800">{user.name}</td>
                                    <td className="py-2 px-4 text-gray-600">{user.email}</td>
                                    <td className="py-2 px-4 text-gray-800">{user.balance} Taka</td>
                                    <td className="py-2 px-4">
                                        {user.isVerified ? (
                                            <span className="text-green-500">Verified</span>
                                        ) : (
                                            <span className="text-yellow-500">Pending</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {
                                            !user.isVerified && (
                                                <button
                                                    onClick={() => handleVerifyUser(user._id)}
                                                    className="text-blue-500 hover:underline mr-4"
                                                >
                                                    Verify
                                                </button>
                                            )
                                        }
                                        <button
                                            onClick={() => handleToggleUserStatus(user?._id)}

                                            className="text-red-500 hover:underline mr-4"
                                        >
                                            {user.isActive ? "Block" : "Unblock"}
                                        </button>
                                        <button
                                            onClick={() => handleViewTransactions(user)}
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
            {isModalOpen && selectedUser && (
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

export default AdminUsers;
