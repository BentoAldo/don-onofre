import {FC, useState} from 'react';
import Drawer from "@/components/ui/drawer";

interface HeaderProps {
    title: string;
}

const Header: FC<HeaderProps> = ({title}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="w-full bg-blue-500 text-white text-3xl sticky top-0 z-10 p-4 flex justify-between items-center shadow-md">
            <h1>{title}</h1>
            <div>
                <button onClick={() => setIsOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M3 3h2l.001 2H21l2 12H6a2 2 0 01-2-2V7a1 1 0 00-1-1zm5 12a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                </button>
                <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            </div>
        </div>
    );
}

export {Header as default};
