import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetMyInfoQuery } from "../../../redux/api/auth.api";
import Logo from "../../../components/Logo";
import { useAddCashOutRequestMutation } from "../../../redux/api/cashOutRequest.api";
import CommonModal from "../../../components/CommonModal";
import { useState } from "react";

const AgentCashOut = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [cashOutRequest] = useAddCashOutRequestMutation();


    const onSubmit = async (data) => {
        const toastId = toast.loading("Processing cash-out request...");
        data.amount = parseFloat(data.amount);


        try {

            const res = await cashOutRequest(data);
            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Cash-out request failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }
            toast.update(toastId, {
                render: "Cash-out request sent successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            setIsModalOpen(true);
            reset();
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to send cash-out request",
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
                    tagLine="You will received your money after admin approval"
                />

                {/* Send Money Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


                    <label className="block text-sm font-medium text-gray-700">
                        Withdraw Amount
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


                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Request Withdraw
                    </button>
                </form>
            </div>
            <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold text-green-600 text-center">
                    ✅ Request Submitted
                </h2>
                <p className="text-gray-600 text-center mt-2">
                    Your withdraw request has been submitted successfully.
                </p>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </CommonModal>
        </div>
    );
};

export default AgentCashOut;