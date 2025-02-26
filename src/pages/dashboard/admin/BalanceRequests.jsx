import { useGetAllCashInRequestsQuery, useUpdateCashInRequestMutation } from "../../../redux/api/cashInRequest.api";
import { useState } from "react";
import { toast } from "react-toastify";
import CommonLoaderError from "../../../components/CommonLoaderError";

const AdminBalanceRequests = () => {
    const { data, isLoading, isError, error } = useGetAllCashInRequestsQuery();
    const requests = data?.data;

    const [updateCashInStatus] = useUpdateCashInRequestMutation();


    if (isLoading || isError) {
        return <CommonLoaderError title="Balance Requests" isLoading={isLoading} isError={isError} error={error} />;
    }

    const handleStatusUpdate = async (id, status) => {
        const toastId = toast.loading("Updating request status...");

        try {
            const res = await updateCashInStatus({ id, status });
            console.log(res);

            if (res.error) {
                toast.update(toastId, {
                    render: res.error.data?.message || "Failed to update status",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }
            toast.update(toastId, {
                render: `Request ${status} successfully!`,
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to update status",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Balance Requests</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                        <thead className="text-gray-700 bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Agent Name</th>
                                <th className="py-2 px-4 text-left">Mobile Number</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests?.map((request) => (
                                <tr key={request.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{request._id}</td>
                                    <td className="py-2 px-4 text-gray-800">{request.agent.name}</td>
                                    <td className="py-2 px-4">{request?.agent?.user?.mobileNumber}</td>
                                    <td className="py-2 px-4 text-gray-800">{request.amount} Taka</td>
                                    <td className="py-2 px-4">{new Date(request.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">
                                        <span className={`${request.status === "completed"
                                            ? "text-green-500"
                                            : request.status === "pending"
                                                ? "text-yellow-500"
                                                : "text-red-500"}`}>{request.status}</span>
                                    </td>
                                    <td className="py-2 px-4">
                                        {request.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(request._id, "completed")}
                                                    className="text-green-500 hover:underline mr-4"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(request._id, "rejected")}
                                                    className="text-red-500 hover:underline mr-4"
                                                >
                                                    Reject
                                                </button>



                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBalanceRequests;
