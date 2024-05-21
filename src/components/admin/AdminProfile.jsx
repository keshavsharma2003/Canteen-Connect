import React, { useState } from "react";

const AdminProfile = (props) => {
    const [tempProfile, setTempProfile] = useState({ ...props.profile });
    const [isOTPSent, setIsOTPSent] = useState(false);
    const closeProfile = () => {
        props.setShowCurrentOrders(!props.showCurrentOrders);
        props.setShowProfile(!props.showProfile);
        props.setShowTabs(!props.showTabs);
    }

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setTempProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfile((prevProfile) => ({
                    ...prevProfile,
                    photo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
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
        props.setProfile({ ...tempProfile });
        updateLocalStorage();
        alert('Profile updated successfully.');
    };
    const updateLocalStorage = () => {
        const adminDetails = {
            AdminName: props.profile.name,
            AdminEmail: props.profile.email,
            AdminPassword: props.profile.password,
        };
        localStorage.setItem(
            "LOGGED_IN",
            JSON.stringify({
                ROLE: "ADMIN",
                payload: adminDetails,
            })
        );
    };

    return (
        <React.Fragment>
            <div className="w-full md:w-3/4 lg:w-1/2 text-[#6b240c] mx-auto py-3 my-14 backdrop-blur md:border-2 md:rounded-lg">
                <div className="absolute right-3 top-0 w-4 h-4">
                    <button className="font-extrabold text-[#6b240c] text-4xl w-full h-full" onClick={closeProfile}>&times;</button>
                </div>
                <h2 className="text-xl text-center font-bold underline">Your Profile</h2>
                <div className="p-6 rounded-lg w-full space-y-2">

                    <div className="flex flex-col items-center w-full">
                        <img src={tempProfile.photo} alt="User" className="w-2/3 md:w-1/2 lg:w-1/3 h-auto rounded-3xl mb-3 border-2 border-[#6b240c] bg-[#994D1C] p-2" />
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
                            className="w-2/3 md:w-1/2 lg:w-1/3 px-3 py-2 bg-[#e48f45] rounded-full text-[#6b240c] hover:text-white text-lg font-semibold hover:bg-[#6B240C] border-2 border-[#6b240c]"
                        >
                            Upload Photo
                        </button>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <label className="block w-1/3 font-semibold text-lg">Username :</label>
                        <input
                            type="text"
                            name="username"
                            value={tempProfile.name}
                            onChange={handleProfileChange}
                            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"

                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <label className="block w-1/3 font-semibold text-lg">Email :</label>
                        <input
                            type="email"
                            name="email"
                            value={tempProfile.email}
                            onChange={handleProfileChange}
                            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        {isOTPSent ? (
                            <>
                                <label htmlFor="otp" className="block w-1/3 font-semibold text-lg">OTP :</label>
                                <div className="w-full flex flex-row justify-between">
                                    <input
                                        type="text"
                                        name="otp"
                                        id="otp"
                                        value={tempProfile.otp}
                                        onChange={handleProfileChange}
                                        placeholder="Enter OTP"
                                        className="w-2/5 p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                                    />
                                    <button
                                        onClick={validateOTP}
                                        className="w-2/5 px-3 py-2 bg-[#e48f45] rounded-full text-[#6b240c] hover:text-white text-lg font-semibold hover:bg-[#6B240C] border-2 border-[#6b240c]"
                                    >
                                        Validate OTP
                                    </button>
                                </div>
                            </>
                        ) : (
                            <button
                                onClick={sendOTP}
                                className="w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-3 py-2 bg-[#e48f45] rounded-full text-[#6b240c] hover:text-white text-lg font-semibold hover:bg-[#6B240C] border-2 border-[#6b240c]"
                            >
                                Send OTP
                            </button>
                        )}
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <label className="block w-1/3 font-semibold text-lg">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={tempProfile.password}
                            onChange={handleProfileChange}
                            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <label className="block w-1/3 font-semibold text-lg">Address :</label>
                        <input
                            type="text"
                            name="permanentAddress"
                            value={tempProfile.permanentAddress}
                            onChange={handleProfileChange}
                            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"

                        />
                    </div>
                    <button
                        onClick={handleProfileUpdate}
                        className="block w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-3 py-2 bg-[#e48f45] rounded-full text-[#6b240c] hover:text-white text-xl font-semibold hover:bg-[#6B240C] border-2 border-[#6b240c]"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </React.Fragment >
    );
};

export default AdminProfile;