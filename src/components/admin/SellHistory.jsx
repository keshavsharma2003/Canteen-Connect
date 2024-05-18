import React, { useState, useEffect } from 'react';

const SellHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/path/to/your/json/file.json')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Previous Orders</h1>
            {orders.map(order => (
                <div key={order.id}>
                    <h2>{order.customerName}</h2>
                    <p>Orders: {order.orders}</p>
                    <p>Price: {order.price}</p>
                    <p>Date: {order.date}</p>
                    <p>Time: {order.time}</p>
                </div>
            ))}
        </div>
    );
};

export default SellHistory;