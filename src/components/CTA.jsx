
import ctaImage from '../assets/images/register.webp';
const CTA = () => {
    return (
        <div className="bg-blue-600 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                        <img src={ctaImage} alt="Register" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to Join?</h2>
                        <p className="text-xl text-gray-200 mb-8">Start your financial journey today</p>
                        <a href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
                            Create Free Account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;