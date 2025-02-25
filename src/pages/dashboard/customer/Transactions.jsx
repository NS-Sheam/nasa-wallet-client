const Transactions = () => {
    const transactions = [
        { id: 1, type: "Send Money", amount: 100, date: "2023-10-01" },
        { id: 2, type: "Cash Out", amount: 50, date: "2023-10-02" },
        { id: 3, type: "Cash In", amount: 200, date: "2023-10-03" },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.amount} Taka</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;