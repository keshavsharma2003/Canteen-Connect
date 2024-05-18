import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div>
            <h1>Current Orders</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>{order.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentOrders;