import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaWallet, FaMoneyBillAlt, FaCoins } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth.Slice";
import logout from "../utils/logout";
import { useGetMyInfoQuery } from "../redux/api/auth.api";
import { useDispatch } from "react-redux";
import Logo from "../components/Logo";
import { toast } from "react-toastify";

const DashboardLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);
    const user = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();
    const { data, refetch, isError, error } = useGetMyInfoQuery();
    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Session Expired");
            handleLogout();
            navigate("/login");
        }
    }, [error]);
    useEffect(() => {
        if (user) {
            refetch();
        }
    }, [user, refetch]);



    const myInfo = data?.data;




    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = () => {
        logout();

    };

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };



    const menuItems = [
        ...(user?.role === "customer"
            ? [
                { label: "Home", path: "/customer/dashboard" },
                { label: "Send Money", path: "/customer/send-money" },
                { label: "Cash Out", path: "/customer/cash-out" },
                // { label: "Cash In", path: "/customer/cash-in" },
                { label: "Transactions", path: "/customer/transactions" },
                { label: "Change Password", path: "/customer/change-password" },
                { label: "Profile", path: "/customer/profile" },
            ]
            : []),
        ...(user?.role === "agent"
            ? [
                { label: "Dashboard", path: "/agent/dashboard" },
                { label: "Cash In", path: "/agent/cash-in" },
                { label: "Cash Out", path: "/agent/cash-out" },
                { label: "Balance Request", path: "/agent/balance-request" },
                { label: "Change Password", path: "/agent/change-password" },
                { label: "Profile", path: "/agent/profile" },
            ]
            : []),
        ...(user?.role === "admin"
            ? [
                { label: "Admin Dashboard", path: "/admin/dashboard" },
                { label: "Users", path: "/admin/users" },
                { label: "Agents", path: "/admin/agents" },
                { label: "Transactions", path: "/admin/transactions" },
                { label: "Balance Requests", path: "/admin/balance-requests" },
                { label: "Withdraw Requests", path: "/admin/withdraw-requests" },
                { label: "Change Password", path: "/admin/change-password" },
                { label: "Profile", path: "/admin/profile" },
            ]
            : []),
        { label: "Logout", path: "/login", action: handleLogout },
    ];




    return (
        <div className="drawer">
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={isDrawerOpen}
                onChange={toggleDrawer}
            />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="flex items-center justify-between px-6 py-4 bg-white shadow-lg">
                    <button
                        onClick={toggleDrawer}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <FaBars className="w-6 h-6 text-blue-600" />
                    </button>

                    {/* Balance Display */}
                    <div className="flex items-center space-x-4">
                        {(user?.role === "admin"
                            || user?.role === "agent"

                        ) ? (
                            // Admin: Show income and total system money
                            <>
                                <div className="flex items-center space-x-2">
                                    <FaMoneyBillAlt className="w-5 h-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Income</p>
                                        <p className="font-bold text-blue-600">
                                            {myInfo?.income?.toFixed(2) || 0} Taka
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaCoins className="w-5 h-5 text-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Total Money</p>
                                        <p className="font-bold text-blue-600">
                                            {
                                                myInfo?.balance?.toFixed(2)
                                                || myInfo?.totalSystemMoney?.toFixed(2)
                                                || 0
                                            } Taka
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (

                            <div className="flex items-center space-x-2">
                                <FaWallet className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Balance</p>
                                    <button
                                        onClick={toggleBalanceVisibility}
                                        className="font-bold text-blue-600"
                                    >
                                        <span
                                            className={`${isBalanceVisible ? "" : "filter blur-sm"}`}
                                        >
                                            {myInfo?.balance?.toFixed(2) || 0} Taka
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar (Drawer) */}
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    className="drawer-overlay"
                    onClick={toggleDrawer}
                ></label>
                <div className="w-64 bg-white p-4 shadow-lg">
                    {/* Close Button */}
                    <div className="flex justify-end">
                        <button onClick={toggleDrawer} className="btn btn-ghost btn-sm">
                            <FaTimes className="w-4 h-4 text-blue-600" />
                        </button>
                    </div>


                    <Logo
                        textClassName="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        iconClassName="w-8 h-8 text-blue-600"
                        isTagline={false}
                    />

                    {/* Balance Display in Sidebar */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">Your Balance</p>
                        <button
                            onClick={toggleBalanceVisibility}
                            className="font-bold text-blue-600 text-left"
                        >
                            {(user?.role === "admin" ||
                                user?.role === "agent"
                            ) ? (

                                <>
                                    <div className="flex items-center space-x-2">
                                        <FaMoneyBillAlt className="w-5 h-5 text-green-500" />
                                        <span>{myInfo?.income?.toFixed(2) || 0} Taka (Income)</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <FaCoins className="w-5 h-5 text-purple-500" />
                                        <span>
                                            {myInfo?.balance?.toFixed(2)
                                                || myInfo?.totalSystemMoney?.toFixed(2)
                                                || 0} Taka (Total)
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <FaWallet className="w-5 h-5 text-blue-500" />
                                    <span
                                        className={`${isBalanceVisible ? "" : "filter blur-sm"}`}
                                    >
                                        {myInfo?.balance?.toFixed(2) || 0} Taka
                                    </span>
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Menu Items */}
                    <ul className="menu rounded-box text-blue-600 font-bold">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={() => {
                                        toggleDrawer();
                                        if (item.action) item.action();
                                    }}
                                    className={`block px-4 py-2 rounded-md transition duration-200 ${location.pathname === item.path
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-blue-100 hover:text-blue-800"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;