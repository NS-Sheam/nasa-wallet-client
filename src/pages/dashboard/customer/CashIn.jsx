import { useForm } from "react-hook-form";
import { useCashInMutation } from "../../../redux/api/transaction.api";
import { toast } from "react-toastify";
import { useGetMyInfoQuery } from "../../../redux/api/auth.api";

const CashIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [cashIn] = useCashInMutation();
    const { data } = useGetMyInfoQuery();

    const myInfo = data?.data;

    const onSubmit = async (data) => {
        const toastId = toast.loading("Processing cash-in...");
        const { amount, password } = data;

        if (parseFloat(amount) < 50) {
            toast.error("Minimum cash-in amount is 50 Taka!");
            return;
        }

        try {
            const payload = {
                agentMobile: myInfo?.user?.mobileNumber,
                amount: parseFloat(amount),
                password
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
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600">Money Wallet</h1>
                    <p className="text-gray-600 mt-2">Fast and Secure Cash-In</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            {...register("amount", { required: true, min: 50 })}
                            placeholder="Enter amount"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.amount && (
                            <span className="text-sm text-red-600">
                                {errors.amount.type === "required"
                                    ? "This field is required"
                                    : "Minimum amount is 50 Taka"}
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
            </div>
        </div>
    );
};

export default CashIn;