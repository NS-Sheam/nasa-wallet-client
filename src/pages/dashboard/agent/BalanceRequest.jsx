import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CommonModal from "../../../components/CommonModal";
import Logo from "../../../components/Logo";
import { useAddCashInRequestMutation } from "../../../redux/api/cashInRequest.api";

const AgentBalanceRequest = () => {
    const [addCashInRequest, { isLoading, isError, error }] = useAddCashInRequestMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async () => {
        const toastId = toast.loading("Your request is being processed...");
        try {
            const res = await addCashInRequest();

            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Request failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            toast.update(toastId, {
                render: "Request submitted successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            setIsModalOpen(true);
        } catch (error) {
            toast.update(toastId, {
                render: "Something went wrong. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <Logo tagLine="You will receive 1,00,000 taka when your request is approved" />

                <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300 disabled:bg-gray-400"
                        disabled={isLoading || isSubmitting}
                    >
                        {isLoading || isSubmitting ? "Requesting..." : "Request Balance"}
                    </button>
                </form>

                {isError && (
                    <p className="text-red-600 text-center mt-2">
                        {error?.data?.message || "Something went wrong"}
                    </p>
                )}

                <p className="text-center text-gray-600 text-sm mt-4">
                    Need help?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Contact support
                    </a>
                </p>
            </div>

            <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold text-green-600 text-center">
                    ✅ Request Submitted
                </h2>
                <p className="text-gray-600 text-center mt-2">
                    Your balance request has been submitted successfully.
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

export default AgentBalanceRequest;
