import React from 'react';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({children, onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-between items-start">
                    <div className="w-full">
                        {children}
                    </div>
                    <button onClick={onClose}
                            className="ml-4 text-lg font-bold text-gray-600 hover:text-gray-800 transition-colors">X
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Modal;
