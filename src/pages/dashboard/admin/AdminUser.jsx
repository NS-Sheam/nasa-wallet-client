import CommonLoaderError from "../../../components/CommonLoaderError";
import { useGetAllCustomersQuery } from "../../../redux/api/customer.api";

const AdminUsers = () => {
    const { data, isLoading, isError, error } = useGetAllCustomersQuery();

    if (isLoading || isError) {
        return <CommonLoaderError title="Users" isLoading={isLoading} isError={isError} error={error} />;
    }

    const users = data?.data;

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
                                <th className="py-2 px-4 text-left">Mobile Number</th>
                                <th className="py-2 px-4 text-left">Balance</th>
                                <th className="py-2 px-4 text-left">Transactions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((customer) => (
                                <tr key={customer._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{customer._id}</td>
                                    <td className="py-2 px-4 text-gray-800">{customer.name}</td>
                                    <td className="py-2 px-4 text-gray-600">{customer.user.mobileNumber}</td>
                                    <td className="py-2 px-4 text-gray-800">{customer.balance} Taka</td>
                                    <td className="py-2 px-4">
                                        {customer.transactions.length > 0 ? (
                                            customer.transactions.slice(0, 3).map((transaction, index) => (
                                                <div key={index} className="text-gray-700">
                                                    {transaction.amount} Taka ({transaction.type})
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">No transactions</span>
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

export default AdminUsers;
