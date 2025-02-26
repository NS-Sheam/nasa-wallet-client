import CommonLoaderError from "../../components/CommonLoaderError";
import { useGetMyInfoQuery } from "../../redux/api/auth.api";
import { selectCurrentUser } from "../../redux/features/auth.Slice";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { FaUser, FaMobileAlt, FaEnvelope, FaShieldAlt, FaCalendarAlt, FaWallet, FaMoneyBillAlt, FaIdCard } from "react-icons/fa";

const Profile = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data, isLoading, isError, error } = useGetMyInfoQuery();
    const [isBalanceVisible, setIsBalanceVisible] = useState(false); // State for balance visibility

    if (isLoading || isError) {
        return <CommonLoaderError title="Profile" isLoading={isLoading} isError={isError} error={error} />;
    }

    const userInfo = data?.data;

    // Determine the role-specific data
    const roleData = user?.role === "admin"
        ? userInfo.admin
        : user?.role === "agent"
            ? userInfo.agent
            : userInfo?.customer;

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Profile</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                {/* General User Information */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <FaUser className="mr-2 text-blue-600" />
                        General Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <FaUser className="w-5 h-5 text-gray-600" />
                            <p><span className="font-semibold">Name:</span> {userInfo?.name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaMobileAlt className="w-5 h-5 text-gray-600" />
                            <p><span className="font-semibold">Mobile Number:</span> {userInfo?.user?.mobileNumber}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="w-5 h-5 text-gray-600" />
                            <p><span className="font-semibold">Email:</span> {userInfo?.user?.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaShieldAlt className="w-5 h-5 text-gray-600" />
                            <p><span className="font-semibold">Role:</span> {user?.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaShieldAlt className="w-5 h-5 text-gray-600" />
                            <p><span className="font-semibold">Status:</span> {userInfo?.user?.isActive ? "Active" : "Inactive"}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaShieldAlt className="w-5 h-5 text-gray-600" />
                            <p><span className="font-semibold">Verified:</span> {userInfo?.user?.isVerified ? "Yes" : "No"}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="w-5 h-5 text-gray-600" />
                            <p><span className="font-semibold">Last Login:</span> {new Date(userInfo?.user?.lastLogin).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Role-Specific Information */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <FaWallet className="mr-2 text-blue-600" />
                        Role-Specific Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user?.role === "admin" && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <FaMoneyBillAlt className="w-5 h-5 text-gray-600" />
                                    <p><span className="font-semibold">Total System Money:</span> {userInfo?.totalSystemMoney.toFixed(2)} Taka</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaMoneyBillAlt className="w-5 h-5 text-gray-600" />
                                    <p><span className="font-semibold">Income:</span> {userInfo?.income.toFixed(2)} Taka</p>
                                </div>
                            </>
                        )}
                        {user?.role === "agent" && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <FaWallet className="w-5 h-5 text-gray-600" />
                                    <button onClick={toggleBalanceVisibility} className="font-semibold">
                                        <span className={`${isBalanceVisible ? "" : "filter blur-sm"}`}>
                                            {userInfo?.balance} Taka
                                        </span>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaMoneyBillAlt className="w-5 h-5 text-gray-600" />
                                    <p><span className="font-semibold">Income:</span> {userInfo?.income} Taka</p>
                                </div>
                            </>
                        )}
                        {user?.role === "customer" && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <FaWallet className="w-5 h-5 text-gray-600" />
                                    <button onClick={toggleBalanceVisibility} className="font-semibold">
                                        <span className={`${isBalanceVisible ? "" : "filter blur-sm"}`}>
                                            {userInfo?.balance} Taka
                                        </span>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaIdCard className="w-5 h-5 text-gray-600" />
                                    <p><span className="font-semibold">NID:</span> {userInfo?.nid}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;