import React, { useState } from "react";
import {
  validateUserName,
  validateUserId,
  validateUserPassword,
} from "../../validation/validators";

function AuthEmployee(props) {
  const [employeeUserName, setEmployeeUserName] = useState(null);
  const [employeePassword, setEmployeePassword] = useState(null);
  const [employeeUserId, setEmployeeUserId] = useState(null);
  const [employeeLoginDisabledForName, setEmployeeLoginDisabledForName] = useState(true);
  const [employeeLoginDisabledForId, setEmployeeLoginDisabledForId] = useState(true);
  const [employeeLoginDisabledForPassword, setEmployeeLoginDisabledForPassword] = useState(true);

  const onEmployeeUserNameInput = (event) => {
    if (
      validateUserName(event.target.value)

    ) {
      setEmployeeLoginDisabledForName(false);
    } else {
      setEmployeeLoginDisabledForName(true);
    }
    setEmployeeUserName(event.target.value);
  };
  const onEmployeeUserIdInput = (event) => {
    if (
      validateUserId(event.target.value)
    ) {
      setEmployeeLoginDisabledForId(false);
    } else {
      setEmployeeLoginDisabledForId(true);
    }
    setEmployeeUserId(event.target.value);
  };

  const onEmployeePasswordInput = (event) => {
    if (validateUserPassword(event.target.value)) {
      setEmployeeLoginDisabledForPassword(false);
    } else {
      setEmployeeLoginDisabledForPassword(true);
    }
    setEmployeePassword(event.target.value);
  };

  const onEmployeeLogin = () => {
    const employeeDetails = {
      EmployeeName: employeeUserName,
      EmployeeEmail: employeeUserId,
      EmployeePassword: employeePassword,
    };
    localStorage.setItem(
      "LOGGED_IN",
      JSON.stringify({
        ROLE: "EMPLOYEE",
        payload: employeeDetails,
      })
    );
    props.setEmployeeLoggedIn(true);
    props.setEmployeeProfile("EMPLOYEE");
  };
  
  return (
    <React.Fragment>
      {/* When Designation Is Null */}
      {props.designation === null && (
        <div className="w-2/3 md:w-1/3 lg:w-1/4 h-16 mx-auto md:mx-0 my-2 md:my-0 text-center text-[#6B240C] hover:text-white bg-[#E48F45] hover:bg-[#994D1C] rounded-lg border-2 border-[#6B240C]">
          <button
            className="font-bold text-2xl w-full h-full "
            onClick={() => {
              props.onRoleClicked("Employee");
            }}
          >
            Proceed As Employee
          </button>
        </div>
      )}
      {props.designation === "Employee" && (
        <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 px-2 md:px-6 py-4 mt-20 mx-auto backdrop-blur-md rounded-xl border-2">
          <div className=" text-center font-bold text-2xl" >
            <h2>Employee</h2>
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
                    onKeyUp={onEmployeeUserNameInput}
                    id=""
                    className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                  />
                </div>
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Enter Email-id"
                    onKeyUp={onEmployeeUserIdInput}
                    id=""
                    className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                  />
                </div>
                <div className="my-4">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onKeyUp={onEmployeePasswordInput}
                    id=""
                    className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-evenly">
                <div className="w-2/5">
                  <button
                    className="w-full py-1 border-2 text-lg rounded-xl bg-[#994d1c] hover:bg-[#6b240c] text-white enabled:bg-[#6b240c]"
                    disabled={employeeLoginDisabledForId || employeeLoginDisabledForName || employeeLoginDisabledForPassword}
                    onClick={onEmployeeLogin}
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

export default AuthEmployee;