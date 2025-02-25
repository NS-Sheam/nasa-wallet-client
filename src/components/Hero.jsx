
import heroImg from '../assets/images/heroImg.jpg';

const Hero = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Your Modern <span className="text-blue-600">Wallet</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Manage your finances securely from anywhere in the world with our intuitive platform.
                        </p>
                        <div className="space-x-4">
                            <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                                Get Started
                            </a>
                        </div>
                    </div>

                    {/* Image Placeholder */}
                    <div className="md:w-1/2 w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                        <img src={heroImg} alt="Hero" className="w-full h-full object-cover rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;