import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentOrders = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCompletedOrders();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = completedOrders.filter((item) =>
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchCompletedOrders = async () => {
        try {
            const response = await axios.get('/data/completedOrders.json');
            const data = response.data;
            let filteredItems = [];
            filteredItems = Object.values(data).flat();
            setCompletedOrders(filteredItems);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className='w-full'>
            <div className='flex flex-row justify-between my-2'>
                <h1 className="text-2xl font-bold">Orders & Sell History</h1>
                <div className="px-4 w-full md:w-3/6">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border-2 border-[#994D1C] bg-[#F5CCA0] rounded-md h-full px-4 py-2 w-full placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                    />
                </div>
            </div>
            <table className="min-w-full text-center bg-[#F5CCA0]">
                <thead>
                    <tr>
                        <th className="py-2 border-2 border-[#994D1C]">Id</th>
                        <th className="py-2 border-2 border-[#994D1C]">Customer</th>
                        <th className="py-2 border-2 border-[#994D1C]">Address</th>
                        <th className="py-2 border-2 border-[#994D1C]" colSpan={2}>Items</th>
                        <th className="py-2 border-2 border-[#994D1C]">Total Prize</th>
                        <th className="py-2 border-2 border-[#994D1C]">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((order) => (
                        <tr key={order.id} className="hover:bg-[#994D1C] hover:text-white">
                            <td className="py-2 border-2 border-[#994D1C]">{order.id}</td>
                            <td className="py-2 border-2 border-[#994D1C]">
                            <div className='flex flex-col'>
                                    <div>
                                        {order.user.name}
                                    </div>
                                    <div>
                                        {order.user.email}
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 border-2 border-[#994D1C]">{order.user.address}</td>
                            <td className="py-2 border-2 border-[#994D1C]">
                                {order.items.map((item) =>
                                    <div className='flex flex-col'>
                                        <p>{item.name}</p>
                                        <hr className='border-[#6B240C]' />
                                    </div>
                                )}
                            </td>
                            <td className="py-2 border-2 border-[#994D1C]">
                                {order.items.map((item) =>
                                    <div className='flex flex-col'>
                                        <p>{item.quantity}</p>
                                        <hr className='border-[#6B240C]' />
                                    </div>
                                )}
                            </td>
                            <td className="py-2 border-2 border-[#994D1C]">&#8377;{order.totalPrice}</td>
                            <td className="py-2 border-2 border-[#994D1C]">
                                <div className='flex flex-col'>
                                    <div>
                                        {order.date}
                                    </div>
                                    <div>
                                        {order.time}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrentOrders;