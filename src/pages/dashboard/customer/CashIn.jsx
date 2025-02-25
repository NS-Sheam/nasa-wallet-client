const CashIn = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Cash In</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">
                                Agent's Mobile Number
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter agent's mobile number"
                            className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">
                                Amount
                            </span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 rounded transition"
                    >
                        Cash In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CashIn;
