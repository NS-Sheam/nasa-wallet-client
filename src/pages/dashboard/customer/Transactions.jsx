import { useGetAllTransactionsQuery } from "../../../redux/api/transaction.api";
import CommonLoaderError from "../../../components/CommonLoaderError";

const Transactions = () => {
    const { data, isLoading, isError, error } = useGetAllTransactionsQuery();

    if (isLoading || isError) {
        return <CommonLoaderError title="Transactions" isLoading={isLoading} isError={isError} error={error} />;
    }

    const transactions = data?.data || [];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Transactions</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                        <thead className="text-gray-700 bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Type</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-800">{transaction?.transactionId}</td>
                                    <td className="py-2 px-4 text-gray-800">{transaction.type}</td>
                                    <td className="py-2 px-4 text-gray-600">{transaction.amount} Taka</td>
                                    <td className="py-2 px-4 text-gray-800">{new Date(transaction?.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">
                                        {transaction.status === "completed" ? (
                                            <span className="text-green-500">Completed</span>
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

export default Transactions;