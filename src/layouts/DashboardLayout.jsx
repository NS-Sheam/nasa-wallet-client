import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import { logOut, selectCurrentUser } from "../redux/features/auth.Slice";
import logout from "../utils/logout";
import { useGetMyInfoQuery } from "../redux/api/auth.api";
import { useDispatch } from "react-redux";

const DashboardLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(false); // State for balance visibility
    const user = useAppSelector(selectCurrentUser);

    const { data } = useGetMyInfoQuery();
    const dispatch = useDispatch();
    const myInfo = data?.data;

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = () => {
        logout();
        dispatch(logOut());
        window.location.reload();
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
                { label: "Cash In", path: "/customer/cash-in" },
                { label: "Transactions", path: "/customer/transactions" },
            ]
            : []),
        ...(user?.role === "agent"
            ? [
                { label: "Dashboard", path: "/agent/dashboard" },
                { label: "Cash In", path: "/agent/cash-in" },
                { label: "Cash Out", path: "/agent/cash-out" },
                { label: "Balance Request", path: "/agent/balance-request" },
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
            ]
            : []),
        { label: "Profile", path: "/dashboard/profile" },
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
                    <div className="flex flex-col items-end space-x-2">
                        <span className="text-gray-700">Balance</span>
                        <button
                            onClick={toggleBalanceVisibility}
                            className="font-bold text-blue-600"
                        >
                            {user?.role === "admin" ? (
                                // Admin: Always show balance and total system money
                                <>
                                    <span>{myInfo?.income?.toFixed(2) || 0} Taka (Income)</span>
                                    <span className="ml-2">
                                        {myInfo?.totalSystemMoney?.toFixed(2) || 0} Taka (Total)
                                    </span>
                                </>
                            ) : (
                                // User or Agent: Blur balance initially
                                <span
                                    className={`${isBalanceVisible ? "" : "filter blur-sm"}`}
                                >
                                    {myInfo?.balance?.toFixed(2) || 0} Taka
                                </span>
                            )}
                        </button>
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

                    <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
                        Money Wallet
                    </h1>

                    {/* Balance Display in Sidebar */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">Your Balance</p>
                        <button
                            onClick={toggleBalanceVisibility}
                            className="text-xl font-bold text-blue-600 text-left"
                        >
                            {user?.role === "admin" ? (
                                // Admin: Always show balance and total system money
                                <>
                                    <span>{myInfo?.income?.toFixed(2) || 0} Taka (Income)</span>
                                    <span className="ml-2">
                                        {myInfo?.totalSystemMoney?.toFixed(2) || 0} Taka (Total)
                                    </span>
                                </>
                            ) : (
                                // User or Agent: Blur balance initially
                                <span
                                    className={`${isBalanceVisible ? "" : "filter blur-sm"}`}
                                >
                                    {myInfo?.balance?.toFixed(2) || 0} Taka
                                </span>
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