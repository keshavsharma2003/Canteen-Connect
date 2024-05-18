import React, { useState } from "react";
import {
  validateUserName,
  validateUserId,
  validateUserPassword,
} from "../../validation/validators";

function AuthAdmin(props) {
  const [adminUserName, setAdminUserName] = useState(null);
  const [adminUserId, setAdminUserId] = useState(null);
  const [adminLoginDisabledForName, setAdminLoginDisabledForName] = useState(true);
  const [adminLoginDisabledForId, setAdminLoginDisabledForId] = useState(true);
  const [adminLoginDisabledForPassword, setAdminLoginDisabledForPassword] = useState(true);
  const [adminPassword, setAdminPassword] = useState(null);

  const onAdminUserNameInput = (event) => {
    if (
      validateUserName(event.target.value)
    ) {
      setAdminLoginDisabledForName(false);
    } else {
      setAdminLoginDisabledForName(true);
    }
    setAdminUserName(event.target.value);
  };
  const onAdminUserIdInput = (event) => {
    if (
      validateUserId(event.target.value)
    ) {
      setAdminLoginDisabledForId(false);
    } else {
      setAdminLoginDisabledForId(true);
    }
    setAdminUserId(event.target.value);
  };
  const onAdminPasswordInput = (event) => {
    if (validateUserPassword(event.target.value)) {
      setAdminLoginDisabledForPassword(false);
    } else {
      setAdminLoginDisabledForPassword(true);
    }
    setAdminPassword(event.target.value);
  };

  const onAdminLogin = () => {
    const adminDetails = {
      AdminName: adminUserName,
      AdminEmail: adminUserId,
      AdminPassword: adminPassword,
    };
    localStorage.setItem(
      "LOGGED_IN",
      JSON.stringify({
        ROLE: "ADMIN",
        payload: adminDetails,
      })
    );
    props.setAdminLoggedIn(true);
    props.setAdminProfile("ADMIN");
  };

  return (
    <React.Fragment>
      {props.designation === null && (
        <div className="w-2/3 md:w-1/3 lg:w-1/4 h-16 mx-auto md:mx-0 my-2 md:my-0 text-center text-[#6B240C] hover:text-white bg-[#E48F45] hover:bg-[#994D1C] rounded-lg border-2 border-[#6B240C]">
          <button
            className="font-bold text-2xl w-full h-full "
            onClick={() => {
              props.onRoleClicked("Admin");
            }}
          >
            Proceed As Admin
          </button>
        </div>
      )}
      {props.designation === "Admin" && (
        <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 px-2 md:px-6 py-4 mt-20 mx-auto backdrop-blur-md rounded-xl border-2">
          <div className=" text-center font-bold text-2xl" >
            <h2>Admin</h2>
            <hr className="border-[#E48F45]"/>
          </div>
          <div className="">
            <div className="mt-5">
              <h5 className="text-center">
                Please enter your credentials
              </h5>
            </div>
            <div className="">
              <div className="">
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Enter User Name"
                    onKeyUp={onAdminUserNameInput}
                    id=""
                    className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                  />
                </div>
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Enter Email-id"
                    onKeyUp={onAdminUserIdInput}
                    id=""
                    className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                  />
                </div>
                <div className="my-4">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onKeyUp={onAdminPasswordInput}
                    id=""
                    className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-evenly">
                <div className="w-2/5">
                  <button
                    className="w-full py-1 border-2 text-lg rounded-xl bg-[#994d1c] hover:bg-[#6b240c] text-white enabled:bg-[#6b240c]"
                    disabled={adminLoginDisabledForId || adminLoginDisabledForName || adminLoginDisabledForPassword}
                    onClick={onAdminLogin}
                  >
                    Login
                  </button>
                </div>  
                <div className="w-2/5">
                  <button
                    className="w-full py-1 border-2 text-lg rounded-xl bg-[#994d1c] hover:bg-[#6b240c] text-white"
                    onClick={props.onBackClicked}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default AuthAdmin;