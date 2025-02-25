import { useState } from "react";
import CommonModal from "../../../components/CommonModal";
import Logo from "../../../components/Logo";


const AgentBalanceRequest = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <Logo
                    tagLine="Agent Balance Request"
                />
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Request Amount
                        </label>
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
                    Need help?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Contact support
                    </a>
                </p>
            </div>

            <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold text-red-600 text-center">
                    🚧 Under Construction 🚧
                </h2>
                <p className="text-gray-600 text-center mt-2">
                    This feature is not available yet. Stay tuned!
                </p>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </CommonModal>
        </div>
    );
};

export default AgentBalanceRequest;
