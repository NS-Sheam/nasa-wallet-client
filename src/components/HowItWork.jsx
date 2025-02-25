
import howItWorkImage1 from "../assets/images/how-it-work-1.png";
import howItWorkImage2 from "../assets/images/how-it-work-2.png";
import howItWorkImage3 from "../assets/images/how-it-work-3.png";

const HowItWork = () => {
    return (
        <div id="how-it-works" className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="text-center">
                        <div className="h-48 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                            <img src={howItWorkImage1} alt="Step 1" className="h-48 w-full object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Create Account</h3>
                        <p className="text-gray-600">Sign up in 2 minutes with basic details</p>
                    </div>


                    <div className="text-center">
                        <div className="h-48 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                            <span className="text-gray-500">
                                <img src={howItWorkImage2} alt="Step 2" className="h-48 w-full object-cover rounded-lg" />
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Send Money</h3>
                        <p className="text-gray-600">
                            Start sending money to friends and family
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="h-48 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                            <span className="text-gray-500">
                                <img src={howItWorkImage3} alt="Step 3" className="h-48 w-full object-cover rounded-lg" />
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Monitor Transactions
                        </h3>
                        <p className="text-gray-600">
                            Keep track of all your transactions in one place
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWork;