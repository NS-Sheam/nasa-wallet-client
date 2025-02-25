import { useForm } from "react-hook-form";
import { useCashInMutation } from "../../../redux/api/transaction.api";
import { toast } from "react-toastify";
import { useGetMyInfoQuery } from "../../../redux/api/auth.api";
import Logo from "../../../components/Logo";

const AgentCashIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [cashIn] = useCashInMutation();
    const { data } = useGetMyInfoQuery();

    const myInfo = data?.data;

    const onSubmit = async (data) => {

        const toastId = toast.loading("Processing cash-in...");
        const { customerMobile, amount, password } = data;

        if (parseFloat(amount) <= 0) {
            toast.error("Amount must be greater than 0!");
            return;
        }

        try {
            const payload = {
                agentMobile: myInfo?.user?.mobileNumber,
                customerMobile,
                amount: parseFloat(amount),
                password,
            };

            const res = await cashIn(payload);
            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Cash-in failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }
            toast.update(toastId, {
                render: "Cash-in successful!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            reset();
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to process cash-in",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-2xl bg-white border border-gray-200">
                <Logo
                    tagLine="Fast and Secure Cash-In"
                />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Customer's Mobile Number
                        </label>
                        <input
                            type="text"
                            {...register("customerMobile", { required: true })}
                            placeholder="Enter customer's mobile number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.customerMobile && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            {...register("amount", { required: true, min: 1 })}
                            placeholder="Enter amount"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.amount && (
                            <span className="text-sm text-red-600">
                                {errors.amount.type === "required"
                                    ? "This field is required"
                                    : "Amount must be greater than 0"}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Agent's Password
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
                    >
                        Cash In
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    Need help? <a href="#" className="text-blue-500 hover:underline">Contact support</a>
                </p>
            </div>
        </div>
    );
};

export default AgentCashIn;