
import testimonialImg1 from '../assets/images/testimonial-1.jpeg';
import testimonialImg2 from '../assets/images/testimonial-2.png';


const Testimonial = () => {
    return (
        <div id="testimonials" className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">User Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <img src={testimonialImg1} alt="User 1" className="w-32 h-32 object-cover rounded-full" />
                        </div>
                        <p className="text-gray-600 mb-4 text-center">
                            "The best financial app I've ever used. Transfers are instant and the interface is beautiful."
                        </p>
                        <p className="font-bold text-gray-900 text-center">- Jhankar Mahbub</p>
                    </div>


                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-gray-500">
                                <img src={testimonialImg2} alt="User 2" className="w-32 h-32 object-cover rounded-full" />
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4 text-center">
                            "Finally a banking app that doesn't make me feel like I need a finance degree to use it!"
                        </p>
                        <p className="font-bold text-gray-900 text-center">- Haris Ali Khan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;