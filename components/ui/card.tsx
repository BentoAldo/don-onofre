import {FC} from 'react';
import Image from 'next/image'
import {formatPrice} from "@/lib/utils";


interface CardProps {
    imgSrc: string;
    price: number;
    description: string;
    onClick: (data: any) => void;
}

const Card: FC<CardProps> = ({imgSrc, price, description, onClick}) => {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg max-w-xs m-3" onClick={onClick}>
            <div className="flex-shrink-0">
                <Image className="h-48 w-full object-cover" src={imgSrc} alt={description} width="64" height="64"/>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{description}</div>
                <div className="font-bold text-xl">₲{formatPrice(price)}</div>
            </div>
        </div>
    );
}

export default Card;
