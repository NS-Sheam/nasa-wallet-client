import CommonLoaderError from "../../../components/CommonLoaderError";
import { useGetAllTransactionsQuery } from "../../../redux/api/transaction.api";

const AdminTransactions = () => {
    const { data, isLoading, isError, error } = useGetAllTransactionsQuery();

    // Format date to a readable string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

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
                                <th className="py-2 px-4 text-left">Transaction ID</th>
                                <th className="py-2 px-4 text-left">Type</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Fee</th>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.transactionId} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{transaction.transactionId}</td>
                                    <td className="py-2 px-4 text-gray-800 capitalize">{transaction.type}</td>
                                    <td className="py-2 px-4 text-gray-800">{transaction.amount} Taka</td>
                                    <td className="py-2 px-4 text-gray-800">{transaction.fee} Taka</td>
                                    <td className="py-2 px-4">{formatDate(transaction.date)}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`${transaction.status === "completed"
                                                ? "text-green-500"
                                                : transaction.status === "pending"
                                                    ? "text-yellow-500"
                                                    : "text-red-500"
                                                }`}
                                        >
                                            {transaction.status}
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

export default AdminTransactions;


