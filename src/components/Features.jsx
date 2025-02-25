import { FaMoneyCheckAlt, FaShieldAlt } from "react-icons/fa";
import moneyTransferImage from "../assets/images/money-transfer.jpg";
import securityImage from "../assets/images/security-image.jpg";
const Features = () => {
    return (
        <div id="features" className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Feature 1 with Image */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">

                            <img src={moneyTransferImage} alt="Money Transfer" className="h-64 w-full object-cover rounded-lg" />
                        </div>
                        <FaMoneyCheckAlt className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Transfers</h3>
                        <p className="text-gray-600">Send money to anyone in seconds with bank-level security.</p>
                    </div>


                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                            <img src={securityImage} alt="Security" className="h-64 w-full object-cover rounded-lg" />
                        </div>
                        <FaShieldAlt className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Security</h3>
                        <p className="text-gray-600">Military-grade encryption protects your transactions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;