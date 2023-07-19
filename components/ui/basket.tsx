import React from 'react';

interface BasketProps {
    count: number;
}

const Basket: React.FC<BasketProps> = ({count}) => {
    return (
        <div>
            <span>Cesta: {count}</span>
        </div>
    );
}

export default Basket;
