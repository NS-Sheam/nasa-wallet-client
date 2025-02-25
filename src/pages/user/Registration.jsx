import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../redux/api/auth.api";
import Logo from "../../components/Logo";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [createUser, { isLoading }] = useCreateUserMutation();
    const accountType = watch("accountType"); // Watch account type selection

    const onSubmit = async (data) => {
        const toastId = toast.loading("Registering...");
        try {
            const updatedData = {
                password: data.password,
            };

            if (data.accountType === "user") {
                updatedData.customer = {
                    name: data.name,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    nid: data.nid, // Include NID if user
                    role: "customer",
                };
            } else if (data.accountType === "agent") {
                updatedData.agent = {
                    name: data.name,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    role: "agent",
                };
            }

            const res = await createUser(updatedData);

            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data.message,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            toast.update(toastId, {
                render: `Registered successfully! ${accountType === "user" ? "Please login to continue." : "Your account is under review."}`,
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            navigate("/login");

        } catch (error) {
            toast.update(toastId, {
                render: "Failed to register. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-600 py-4 md:py-12">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-2xl bg-white">
                <div className="text-center">
                    <Logo />

                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Enter your name"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && <span className="text-sm text-red-600">This field is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            {...register("mobileNumber", { required: true })}
                            placeholder="Enter your mobile number"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.mobileNumber && <span className="text-sm text-red-600">This field is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && <span className="text-sm text-red-600">This field is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && <span className="text-sm text-red-600">This field is required</span>}
                    </div>

                    {/* Account Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account Type</label>
                        <select
                            {...register("accountType", { required: true })}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select account type</option>
                            <option value="user">User</option>
                            <option value="agent">Agent</option>
                        </select>
                        {errors.accountType && <span className="text-sm text-red-600">This field is required</span>}
                    </div>

                    {/* Conditional NID Field for Users */}
                    {accountType === "user" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">NID</label>
                            <input
                                type="text"
                                {...register("nid", { required: true })}
                                placeholder="Enter your NID"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.nid && <span className="text-sm text-red-600">This field is required</span>}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
