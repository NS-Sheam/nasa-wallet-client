const AgentBalanceRequest = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Balance Request</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Request Amount</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300"
                    >
                        Request Balance
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    Need help? <a href="#" className="text-blue-500 hover:underline">Contact support</a>
                </p>
            </div>
        </div>
    );
};

export default AgentBalanceRequest;
