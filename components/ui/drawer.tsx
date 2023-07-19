import React, {FC, useState} from 'react';
import {useBasket} from "@/context/BasketContext";
import {formatDateTime, formatPrice} from "@/lib/utils";
import Image from 'next/image'
import axios, {AxiosError} from 'axios';
import {useUser} from "@/context/UserContext";
import Modal from "@/components/ui/modal";
import {Button} from "@/components/ui/button";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({isOpen, onClose}) => {
    const {products, removeProduct, clearBasket, total} = useBasket();
    const {docNumber, setDocNumber} = useUser();
    const [isDocModalOpen, setDocModalOpen] = useState<boolean>(false);

    const handleFinalizePurchaseClick = async () => {
        if (docNumber) {
            await finalizePurchase();
        } else {
            setDocModalOpen(true);
        }
    };

    const finalizePurchase = async () => {
        setDocModalOpen(false);
        const now = new Date();
        const expires = new Date();
        expires.setDate(now.getDate() + 2);

        try {
            const res = await axios.post('/api/v1/debts', {
                debt: {
                    docId: docNumber, amount: {currency: 'PYG', value: total}, label: 'Basket', validPeriod: {
                        start: formatDateTime(now), end: formatDateTime(expires),
                    },
                },
            }, {
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_ADAMS_PAY_API_KEY,
                    'Content-Type': 'application/json',
                    'x-if-exists': 'update',
                },
            });

            const data = res.data;

            if (data && data.debt && data.debt.payUrl) {
                window.location.href = data.debt.payUrl;
            } else {
                console.error("No se encontró la URL de pago en la respuesta");
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Failed to fetch data', axiosError);
        }
    };

    if (!isOpen) return null;

    return (<div className="fixed inset-0 flex justify-end bg-black bg-opacity-50">
        <div className="w-80 h-full bg-white p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Tu carrito</h2>
                <button onClick={onClose} className="text-black">X</button>
            </div>
            <ul className="text-black space-y-4">
                {products.map(product => (<li key={product.id} className="flex items-center space-x-2">
                    <Image className="w-12 h-12 object-cover" src={product.imgSrc} alt={product.description}
                           width="48" height="48"/>
                    <div className="flex-1 text-xs">
                        <h3 className="font-bold">{product.description}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs">₲{formatPrice(product.price)}</span>
                        <button onClick={() => removeProduct(product.id)} className="text-black text-xs">🗑️
                        </button>
                    </div>
                </li>))}
            </ul>
            <div className="text-black mt-6 mb-4 text-xs">Total: ₲{formatPrice(total)}</div>
            <div className="flex justify-between">
                <button onClick={clearBasket}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-700 whitespace-nowrap">Vaciar
                    Cesto
                </button>
                <button onClick={handleFinalizePurchaseClick}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-700 whitespace-nowrap">Finalizar
                    compra
                </button>
                {isDocModalOpen && <Modal onClose={() => setDocModalOpen(false)}>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="mb-4 text-blue-600">Ingresa tu número de documento</h2>
                        <input type="text" onChange={(e) => setDocNumber(e.target.value)}
                               className="mb-4 text-black border border-gray-400 shadow"/>
                        <div className="flex space-x-4">
                            <Button variant="default" size="default"
                                    onClick={async () => docNumber ? await finalizePurchase() : null}>Confirmar</Button>
                            <Button variant="default" size="default"
                                    onClick={() => setDocModalOpen(false)}>Cerrar</Button>
                        </div>
                    </div>
                </Modal>}
            </div>
        </div>
    </div>);
};

export default Drawer;
