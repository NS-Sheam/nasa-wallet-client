import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/auth.api";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../redux/features/auth.Slice";
import { useDispatch } from "react-redux";
import Logo from "../../components/Logo";

const testUsers = [
    { role: "Admin", email: "admin@gmail.com", password: "123456" },
    { role: "Agent", email: "sakib@gmail.com", password: "123456" },
    { role: "User", email: "customer3@gmail.com", password: "123456" },
];

const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [deviceId, setDeviceId] = useState("");

    useEffect(() => {
        let storedDeviceId = localStorage.getItem("deviceId");
        if (!storedDeviceId) {
            storedDeviceId = `device_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem("deviceId", storedDeviceId);
        }
        setDeviceId(storedDeviceId);
    }, []);

    const handleTestUserClick = (user) => {
        setValue("mobileNumberOrEmail", user.email);
        setValue("password", user.password);
    };

    const onSubmit = async (data) => {
        const toastId = toast.loading("Logging in...");

        try {
            const payload = { ...data, deviceId };
            const res = await login(payload);

            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Login failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            if (res?.data?.data?.accessToken) {
                const decoded = jwtDecode(res?.data?.data?.accessToken);
                dispatch(setUser({ user: decoded, token: res?.data?.data?.accessToken }));

                toast.update(toastId, {
                    render: "Logged in successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });

                switch (decoded.role) {
                    case "customer":
                        navigate("/customer/dashboard");
                        break;
                    case "agent":
                        navigate("/agent/dashboard");
                        break;
                    case "admin":
                        navigate("/admin/dashboard");
                        break;
                    default:
                        navigate("/login");
                }
            }
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to login. Please check your credentials.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-2xl bg-white">
                <Logo />

                {/* Test Users Table */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-center mb-2">Test Credentials</h3>
                    <table className="w-full border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 border">Role</th>
                                <th className="py-2 border">Email</th>
                                <th className="py-2 border">Password</th>
                                <th className="py-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testUsers.map((user, index) => (
                                <tr key={index} className="text-center hover:bg-gray-100">
                                    <td className="py-2 border">{user.role}</td>
                                    <td className="py-2 border">{user.email}</td>
                                    <td className="py-2 border">{user.password}</td>
                                    <td className="py-2 border">
                                        <button
                                            onClick={() => handleTestUserClick(user)}
                                            className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Use
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mobile Number or Email
                        </label>
                        <input
                            type="text"
                            {...register("mobileNumberOrEmail", { required: true })}
                            placeholder="Enter your mobile number or email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.mobileNumberOrEmail && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
