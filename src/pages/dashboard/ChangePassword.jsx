import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useChangePasswordMutation } from "../../redux/api/auth.api";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth.Slice";
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";


const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [changePassword] = useChangePasswordMutation();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const toastId = toast.loading("Changing password...");

        try {

            const res = await changePassword(data);


            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Failed to change password",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            toast.update(toastId, {
                render: "Password changed successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            logout();
            navigate("/login");
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to change password",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-2xl bg-white border border-gray-200">
                <Logo />

                {/* Change Password Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Old Password
                        </label>
                        <input
                            type="password"
                            {...register("oldPassword", { required: true })}
                            placeholder="Enter your old password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.oldPassword && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            {...register("newPassword", { required: true, minLength: 6 })}
                            placeholder="Enter your new password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.newPassword && (
                            <span className="text-sm text-red-600">
                                {errors.newPassword.type === "required"
                                    ? "This field is required"
                                    : "Password must be at least 6 characters long"}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;