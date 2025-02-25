
const CommonLoaderError = ({ title, isLoading, isError, error }) => {
    if (isLoading) {
        return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-semibold text-gray-800 mb-6">{title}</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-red-500">Error: {error?.message}</p>
                </div>
            </div>
        );
    }
};

export default CommonLoaderError;