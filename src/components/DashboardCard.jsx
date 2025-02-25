const DashboardCard = ({ title, value, color, icon }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
            </div>
            <span className={`text-${color}-500 text-3xl`}>{icon}</span>
        </div>
    );
};


export default DashboardCard;