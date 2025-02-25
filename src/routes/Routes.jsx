import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/user/Login";
import Register from "../pages/user/Registration";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AgentCashIn from "../pages/dashboard/agent/AgentCashIn";
import AgentCashOut from "../pages/dashboard/agent/AgentCashOut";
import AgentBalanceRequest from "../pages/dashboard/agent/BalanceRequest";
import AdminUsers from "../pages/dashboard/admin/AdminUser";
import AdminAgents from "../pages/dashboard/admin/AdminAgent";
import AdminBalanceRequests from "../pages/dashboard/admin/BalanceRequests";
import AdminWithdrawRequests from "../pages/dashboard/admin/WithDrawRequests";
import AdminTransactions from "../pages/dashboard/admin/Adminransactions";
import AgentDashboard from "../pages/dashboard/agent/AgentDashboard";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import SendMoney from "../pages/dashboard/customer/SendModey";
import CashOut from "../pages/dashboard/customer/CashOut";
import CashIn from "../pages/dashboard/customer/CashIn";
import Transactions from "../pages/dashboard/customer/Transactions";


function ApplicationRoutes() {
    return (
        <div className="bg-white min-h-screen">
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Customer Routes */}
                    <Route element={<ProtectedRoute roles={["customer"]} />}>
                        <Route path="/customer" element={<DashboardLayout />}>
                            <Route path="/customer/dashboard" element={<DashboardHome />} />
                            <Route path="/customer/send-money" element={<SendMoney />} />
                            <Route path="/customer/cash-out" element={<CashOut />} />
                            <Route path="/customer/cash-in" element={<CashIn />} />
                            <Route path="/customer/transactions" element={<Transactions />} />
                        </Route>
                    </Route>

                    {/* Agent Routes */}
                    <Route element={<ProtectedRoute roles={["agent"]} />}>
                        <Route path="/agent" element={<DashboardLayout />}>
                            <Route path="/agent/dashboard" element={<AgentDashboard />} />
                            <Route path="/agent/cash-in" element={<AgentCashIn />} />
                            <Route path="/agent/cash-out" element={<AgentCashOut />} />
                            <Route
                                path="/agent/balance-request"
                                element={<AgentBalanceRequest />}
                            />
                        </Route>
                    </Route>

                    {/* Admin Routes */}
                    <Route element={<ProtectedRoute roles={["admin"]} />}>
                        <Route path="/admin" element={<DashboardLayout />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<AdminUsers />} />
                            <Route path="/admin/agents" element={<AdminAgents />} />
                            <Route path="/admin/transactions" element={<AdminTransactions />} />
                            <Route
                                path="/admin/balance-requests"
                                element={<AdminBalanceRequests />}
                            />
                            <Route
                                path="/admin/withdraw-requests"
                                element={<AdminWithdrawRequests />}
                            />

                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default ApplicationRoutes;