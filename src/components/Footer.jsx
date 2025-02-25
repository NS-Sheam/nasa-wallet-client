import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <Logo
                    textClassName="text-4xl font-bold text-white"
                    tagLineClassName="text-sm text-gray-400"
                />

                <p className="text-gray-400">&copy; 2024 Money Wallet. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;