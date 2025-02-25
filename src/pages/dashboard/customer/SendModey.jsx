import { useForm } from "react-hook-form";
import { useSendMoneyMutation } from "../../../redux/api/transaction.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetMyInfoQuery } from "../../../redux/api/auth.api";

const SendMoney = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [sendMoney] = useSendMoneyMutation();
    const { data } = useGetMyInfoQuery();

    const myInfo = data?.data;

    const onSubmit = async (data) => {
        const toastId = toast.loading("Sending money...");
        const { recipientMobile, amount } = data;

        if (parseFloat(amount) < 50) {
            toast.error("Minimum amount is 50 Taka!");
            return;
        }

        try {
            const payload = {
                senderMobile: myInfo?.user?.mobileNumber,
                receiverMobile: recipientMobile,
                amount: parseFloat(amount),
            };

            const res = await sendMoney(payload);
            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Login failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }
            toast.update(toastId, {
                render: "Money sent successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to send money",
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

                {/* Send Money Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Recipient's Mobile Number
                        </label>
                        <input
                            type="text"
                            {...register("recipientMobile", { required: true })}
                            placeholder="Enter recipient's mobile number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.recipientMobile && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>

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
                        {/* Add a note about the 5 taka fee */}
                        <p className="text-sm text-gray-500 mt-1">
                            A fee of 5 taka will be deducted for transactions over 100 taka.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Send Money
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMoney;