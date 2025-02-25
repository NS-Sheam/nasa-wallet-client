import { FaWallet } from "react-icons/fa";
import Logo from "./Logo";

const Header = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Logo
                        isTagline={false}
                        textClassName="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        iconClassName="w-8 h-8 text-blue-600"

                    />
                    <div className="hidden md:flex space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
                        <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</a>
                        <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
                    </div>
                    <a href="/login" className="bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition duration-300 ">
                        Get Started
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Header;