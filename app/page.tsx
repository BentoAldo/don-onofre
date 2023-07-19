'use client';
import Header from "@/components/Header/";
import {HEADER_TITLE} from "@/constants";
import Card from "@/components/ui/card";
import {useState} from "react";
import Modal from "@/components/ui/modal";
import {useBasket} from "@/context/BasketContext";
import {Product} from "@/models/Product";
import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils";

export default function Home() {
    const products: Product[] = [
        {id: '1', imgSrc: "/assets/images/cellphone.jpg", price: 9990000, description: "Celular"},
        {id: '2', imgSrc: "/assets/images/tv.jpg", price: 14990000, description: "TV"},
        {id: '3', imgSrc: "/assets/images/pc2.jpg", price: 19990000, description: "PC"},
        {id: '4', imgSrc: "/assets/images/laptop.jpg", price: 15990000, description: "Laptop"},
        {id: '5', imgSrc: "/assets/images/smartwatch.jpg", price: 3990000, description: "Smartwatch"},
        {id: '6', imgSrc: "/assets/images/tablet.jpg", price: 5990000, description: "Tablet"},
        {id: '7', imgSrc: "/assets/images/headphones.jpg", price: 1990000, description: "Auriculares"},
        {id: '8', imgSrc: "/assets/images/printer.jpg", price: 2990000, description: "Impresora"},
        {id: '9', imgSrc: "/assets/images/camera.jpg", price: 7990000, description: "Cámara"},
    ];

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [basketItems, setBasketItems] = useState<Product[]>([]);
    const {addProduct} = useBasket();
    const handleCardClick = (product: Product) => {
        setIsModalOpen(true);
        setSelectedProduct(product);
    }

    const handleAddToBasket = () => {
        if (selectedProduct !== null) {
            addProduct(selectedProduct);
            setIsModalOpen(false);
        }
    }

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    }

    return (
        <div className="flex flex-col h-screen justify-start p-4">
            <Header title={HEADER_TITLE}/>
            <div className="text-left mt-4">
                <h1 className="text-4xl mb-4 text-blue-600">Bienvenido a Mi Tienda de Tecnología</h1>
                <p className="text-xl mb-4 text-gray-700">Encuentra los mejores productos tecnológicos aquí.</p>
                <div className="flex flex-wrap justify-start">
                    {products.map((product, index) => (
                        <Card key={index} imgSrc={product.imgSrc} price={product.price}
                              description={product.description} onClick={() => handleCardClick(product)}/>
                    ))}
                </div>
                {isModalOpen && selectedProduct !== null &&
                    <Modal onClose={handleClose}>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="mb-4">{selectedProduct.description}</h2>
                            <p className="mb-4">₲{formatPrice(selectedProduct.price)}</p>
                            <Button variant="default" size="default" onClick={handleAddToBasket}>Agregar a la
                                cesta</Button>
                        </div>
                    </Modal>
                }
            </div>
        </div>
    );
}

