import React, { useState } from "react";
import AuthAdmin from "../admin/AuthAdmin";
import AuthEmployee from "../employee/AuthEmployee";
const currentYear = new Date().getFullYear();
function Authenticate(props) {
  const [designation, setDesignation] = useState(null);

  const onRoleClicked = (role) => {
    setDesignation(role);
    window.localStorage.setItem("ROLE", JSON.stringify(role));
  };

  const onBackClicked = () => {
    setDesignation(null);
  };

  return (
    <React.Fragment>
      <div className="container w-full h-full mx-auto">
        <div className="w-full ">
          <h5 className="text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Canteen Connect
          </h5>
        </div>
        <hr className="border-[#E48F45] w-full" />
        <div className="flex flex-col">
          <div className="w-full">
          {!designation && (
            <img
              src="/Assets/Pictures/smart-bite-logo.webp"
              alt="Chef"
              className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto my-24 animate-bounce ..."
            />
          )}
          </div>
          <div className="flex flex-col md:flex-row justify-evenly">
            <AuthAdmin
              designation={designation}
              onRoleClicked={onRoleClicked}
              onBackClicked={onBackClicked}
              setAdminLoggedIn={props.setLoginAction}
              setAdminProfile={props.setLoggedInProfile}
            />
            <AuthEmployee
              designation={designation}
              onRoleClicked={onRoleClicked}
              onBackClicked={onBackClicked}
              setEmployeeLoggedIn={props.setLoginAction}
              setEmployeeProfile={props.setLoggedInProfile}
            />
          </div>
        </div>
        <footer className="absolute w-full bottom-0">
          <h6 className="text-center text-lg font-semibold">
            <small>
              Copyright &copy; Smart Bite {currentYear} | All Rights Reserved
            </small>
          </h6>
        </footer>
      </div>
    </React.Fragment >
  );
}

export default Authenticate;