import { useForm } from "react-hook-form";
import { useCashOutMutation } from "../../../redux/api/transaction.api";
import { toast } from "react-toastify";
import { useGetMyInfoQuery } from "../../../redux/api/auth.api";

const CashOut = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [cashOut] = useCashOutMutation();
    const { data } = useGetMyInfoQuery();

    const myInfo = data?.data;

    const onSubmit = async (data) => {
        const toastId = toast.loading("Processing cash-out...");
        const { agentMobile, amount } = data;

        if (parseFloat(amount) <= 0) {
            toast.error("Amount must be greater than 0!");
            return;
        }

        try {
            const payload = {
                customerNumber: myInfo?.user?.mobileNumber,
                agentMobile: agentMobile,
                amount: parseFloat(amount).toFixed(2),
                password: data.password,
            };

            const res = await cashOut(payload);
            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Cash-out failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }
            toast.update(toastId, {
                render: "Cash-out successful!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to process cash-out",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-2xl bg-white border border-gray-200">
                {/* Logo or App Name */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600">Money Wallet</h1>
                    <p className="text-gray-600 mt-2">Secure and Fast Transactions</p>
                </div>

                {/* Cash Out Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Agent's Mobile Number
                        </label>
                        <input
                            type="text"
                            {...register("agentMobile", { required: true })}
                            placeholder="Enter agent's mobile number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.agentMobile && (
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
                        {/* Add a note about the fee */}
                        <p className="text-sm text-gray-500 mt-1">
                            A fee of 1.5% will be charged for cash-out transactions.
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            {...register("password", { required: true, min: 1 })}
                            placeholder="Enter password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && (
                            <span className="text-sm text-red-600">
                                {errors.password.type === "required"
                                    ? "This field is required"
                                    : "Password must be greater than 0"}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cash Out
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CashOut;