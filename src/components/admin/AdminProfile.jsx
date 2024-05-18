import React, { useState, useEffect } from "react";

const AdminProfile = (props) => {
    const [profile, setProfile] = useState({
        photo: '',
        username: '',
        email: '',
        password: '',
        otp: '',
    });
    const [isOTPSent, setIsOTPSent] = useState(false);
    const closeProfile = () => {
        props.setShowCurrentOrders(!props.showCurrentOrders);
        props.setShowProfile(!props.showProfile);
        props.setShowTabs(!props.showTabs);
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

    return (
        <React.Fragment>
            <div className="w-full md:w-3/4 lg:w-1/2 text-[#6b240c] mx-auto py-3 my-14 backdrop-blur md:border-2 md:rounded-lg">
                <div className="absolute right-1 top-0 w-4 h-4">
                    <button className="font-extrabold text-white text-2xl w-full h-full" onClick={closeProfile}>&times;</button>
                </div>
                <h2 className="text-xl text-center font-bold underline">Your Profile</h2>
                <div className="p-6 rounded-lg w-full">
                    <div>
                        <label className="block mb-2">Change Profile Photo</label>
                        <input
                            type="file"
                            onChange={handlePhotoChange}
                            className="mb-4"
                        />
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
                </div>
            </div>
        </React.Fragment >
    );
};

export default AdminProfile;