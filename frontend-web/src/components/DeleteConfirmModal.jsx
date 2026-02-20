const DeleteConfirmModal = ({onClose, onConfirm}) => {
    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-white p-10">
                <h1>Are you sure you want to delete this?</h1>
                <div className="flex justify-between mt-6">
                    <button className="bg-green-600 px-4 py-1"
                    onClick={onConfirm}>
                        <span>Yes</span>
                    </button>
                    <button className="bg-red-600 px-4 py-1" onClick={onClose}>
                        <span>Cancel</span>
                    </button>
                </div>

            </div>
            
        </div>
        
    )
};

export default DeleteConfirmModal