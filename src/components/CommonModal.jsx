const CommonModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <div className="flex justify-end">
                    <button onClick={onClose}>&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
};


export default CommonModal;