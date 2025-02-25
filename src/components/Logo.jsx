import { FaWallet } from "react-icons/fa";

const Logo = ({
    textClassName = "text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
    iconClassName = "w-12 h-12 text-blue-600",
    isTagline = true,
    tagLine = "Secure and Fast Transactions",
    tagLineClassName = "text-sm text-gray-600"
}) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
                <FaWallet className={iconClassName} />
                <h1 className={textClassName}>
                    NaSa Wallet
                </h1>
            </div>
            {
                isTagline &&
                <p className={tagLineClassName}>{tagLine}</p>}
        </div>
    );
};

export default Logo;