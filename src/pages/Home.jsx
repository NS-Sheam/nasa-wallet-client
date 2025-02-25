import { FaWallet, FaMoneyCheckAlt, FaShieldAlt, FaMobileAlt, FaArrowRight } from "react-icons/fa";
import Logo from "../components/Logo";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWork from "../components/HowItWork";
import Testimonial from "../components/Testimonial";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">

            <Header />
            <Hero />
            <Features />
            <HowItWork />
            <Testimonial />
            <CTA />
            <Footer />
        </div>
    );
};

export default Home;