import React, { useState, useEffect } from "react";

const EmployeeProfile = (props) => {
    const [profile, setProfile] = useState({
        photo: '/Assets/Icons/user.svg',
        username: '',
        email: '',
        password: '',
        otp: '',
    });
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');
    const closeProfile = () => {
        props.setShowMenu(!props.showMenu);
        props.setShowProfile(!props.showProfile);
    }
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile((prevProfile) => ({ ...prevProfile, photo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const sendOTP = () => {
        setIsOTPSent(true);
        alert('OTP sent to your email.');
    };

    const validateOTP = () => {
        alert('Email validated successfully.');
        setIsOTPSent(false);
    };

    const handleProfileUpdate = () => {
        if (isOTPSent) {
            alert('Please validate your OTP first.');
            return;
        }
        alert('Profile updated successfully.');
    };
    useEffect(() => {
        const fetchPreviousOrders = async () => {
            try {
                const response = await fetch('previousOrders.json');
                const data = await response.json();
                setPreviousOrders(data);
            } catch (error) {
                console.error('Error fetching previous orders: ', error);
            }
        };
        fetchPreviousOrders();
        try {
            switch (activeTab) {
                case 'profile':
                    handleTabChange('profile');
                    break;
                case 'previousOrders':
                    handleTabChange('previousOrders');
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }, [activeTab]);

    return (
        <React.Fragment>
            <div className="w-full md:w-3/4 lg:w-1/2 text-[#6b240c] mx-auto py-3 my-14 backdrop-blur md:border-2 md:rounded-lg">
                <div className="absolute right-3 top-0 w-4 h-4">
                    <button className="font-extrabold text-[#6b240c] text-4xl w-full h-full" onClick={closeProfile}>&times;</button>
                </div>
                <div className="flex flex-row justify-center">
                    <button
                        onClick={() => handleTabChange('profile')}
                        className={`${activeTab === 'profile' ? 'bg-[#6B240C]' : 'bg-[#E48F45]'} text-white px-4 py-2 w-2/5 rounded-l-2xl`} >
                        Your Profile
                    </button>
                    <button
                        onClick={() => handleTabChange('previousOrders')}
                        className={`${activeTab === 'previousOrders' ? 'bg-[#6B240C]' : 'bg-[#E48F45]'} text-white px-4 py-2 w-2/5 rounded-r-2xl`} >
                        View Previous Orders
                    </button>
                </div>
                {activeTab === 'profile' && (<div className="p-6 rounded-lg w-full">
                <div className="flex flex-col items-center w-full mt-3">
                        <label className="block w-full font-semibold text-lg mb-2">Photo:</label>
                        <img src={profile.photo} alt="User Photo" className="w-full h-auto rounded-xl mb-3" />
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            id="photo-upload"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById('photo-upload').click()}
                            className="w-full p-3 bg-[#e48f45] rounded-xl text-white font-semibold hover:bg-[#6B240C]"
                        >
                            Change Photo
                        </button>
                    </div>
                    <div>
                        <label className="block mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleProfileChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"

                        />
                    </div>
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                        />
                        {isOTPSent ? (
                            <>
                                <input
                                    type="text"
                                    name="otp"
                                    value={profile.otp}
                                    onChange={handleProfileChange}
                                    placeholder="Enter OTP"
                                    className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
                                />
                                <button
                                    onClick={validateOTP}
                                    className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full"
                                >
                                    Validate OTP
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={sendOTP}
                                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full"
                            >
                                Send OTP
                            </button>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={profile.password}
                            onChange={handleProfileChange}
                            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
                        />
                    </div>
                    <button
                        onClick={handleProfileUpdate}
                        className="bg-[#994D1C] text-white px-4 py-2 rounded m-2 w-1/2 md:w-1/3 lg:w-2/5"
                    >
                        Update Profile
                    </button>
                </div>)}
                {activeTab === 'previousOrders' && (
                    <div className="p-6 rounded-lg w-full">
                        {previousOrders.map((order, index) => (
                            <div key={index} className="border-b py-2">
                                <h3 className="font-bold">Order #{order.id}</h3>
                                <p>Date: {order.date}</p>
                                <p>Total: ${order.total}</p>
                                <ul>
                                    {order.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {item.name} - {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </React.Fragment >
    );
};

export default EmployeeProfile;