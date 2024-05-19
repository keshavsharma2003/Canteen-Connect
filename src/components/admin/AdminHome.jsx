import React, { useState} from "react";
import Inventory from "./Inventory";
import WorkersList from "./WorkersList";
import SellHistory from "./SellHistory";
import AdminProfile from "./AdminProfile";
import CurrentOrders from "./CurrentOrders";

const AdminHome = (props) => {
  const [showTabs, setShowTabs] = useState(true);
  const [showInventory, setShowInventory] = useState(false);
  const [showWorkersList, setShowWorkersList] = useState(false);
  const [showSellHistory, setShowSellHistory] = useState(false);
  const [showCurrentOrders, setShowCurrentOrders] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({
    photo: '',
    username: '',
    email: '',
    password: ''
  });
  const toggleCurrentOrders = () => {
    setShowCurrentOrders(true);
    setShowInventory(false);
    setShowProfile(false);
    setShowWorkersList(false);
    setShowSellHistory(false);
  };
  const toggleInventory = () => {
    setShowCurrentOrders(false);
    setShowInventory(true);
    setShowProfile(false);
    setShowWorkersList(false);
    setShowSellHistory(false);
  };
  const toggleProfile = () => {
    setShowTabs(!showTabs);
    setShowCurrentOrders(!showCurrentOrders);
    setShowInventory(false);
    setShowProfile(!showProfile);
    setShowWorkersList(false);
    setShowSellHistory(false);
  };
  const toggleWorkersList = () => {
    setShowCurrentOrders(false);
    setShowInventory(false);
    setShowProfile(false);
    setShowWorkersList(true);
    setShowSellHistory(false);
  };
  const toggleSellHistory = () => {
    setShowCurrentOrders(false);
    setShowInventory(false);
    setShowProfile(false);
    setShowWorkersList(false);
    setShowSellHistory(true);
  };

  const loggedInAdmin = JSON.parse(localStorage.getItem("LOGGED_IN"))?.payload
    ?.AdminName;

  const onAdminLogout = () => {
    props.didLoginHappen(false);
    props.setLoggedInProfile(null);
    localStorage.clear();
  };

  return (
    <React.Fragment>
      <div className="w-full h-full">
        <div className="fixed w-full flex flex-row justify-between py-1 bg-[#994D1C] text-base md:text-lg lg:text-xl">
          <div className="px-4 my-auto flex flex-row items-center">
            <button onClick={toggleProfile}>
              <img
                src={profile.photo || 'Assets/Icons/user.svg'}
                alt="Profile"
                className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-[#994D1C] mr-3 md:mr-6"
              />
            </button>
            <h5 className="font-extrabold text-white">
              Hi  {loggedInAdmin}
            </h5>
          </div>
          <div>
            <div className="mr-2 text-center text-[#6B240C] hover:text-white bg-[#E48F45] hover:bg-[#994D1C] rounded-lg border-2 border-[#6B240C]">
              <button
                className="font-bold w-fit h-full px-2 md:px-4 py-1"
                onClick={onAdminLogout}
                disabled={props.disabled}
              >
                Logout &rarr;
              </button>
            </div>
          </div>
        </div>
        <hr className="border-[#E48F45]" />
        {showTabs && (<div className="w-full mx-auto py-1 mt-14 ">
          <div className="text-center font-semibold text-4xl mb-3 text-[#6B240C]">
            <h2>
              Admin Portal
            </h2>
          </div>
          <div className="w-fit mx-auto rounded-lg flex flex-row justify-center bg-[#E48F45] font-semibold">
            <div className="">
              <button
                className={`${showCurrentOrders === true ? 'bg-[#6b240c] text-white' : 'bg-trasparent text-[#6b240c]'} w-full py-1 px-2 text-lg rounded-lg`}
                onClick={toggleCurrentOrders}
              >
                Current Orders
              </button>
            </div>
            <div className="">
              <button
                className={`${showInventory === true ? 'bg-[#6b240c] text-white' : 'bg-trasparent text-[#6b240c]'} w-full py-1 px-2 text-lg rounded-lg`}
                onClick={toggleInventory}
              >
                Inventory
              </button>
            </div>
            <div className="">
              <button
                className={`${showWorkersList === true ? 'bg-[#6b240c] text-white' : 'bg-trasparent text-[#6b240c]'} w-full py-1 px-2 text-lg rounded-lg`}
                onClick={toggleWorkersList}
              >
                Workers List
              </button>
            </div>
            <div className="">
              <button
                className={`${showSellHistory === true ? 'bg-[#6b240c] text-white' : 'bg-trasparent text-[#6b240c]'} w-full py-1 px-2 text-lg rounded-lg`}
                onClick={toggleSellHistory}
              >
                Orders History
              </button>
            </div>
          </div>
        </div>)}

        {showCurrentOrders && (<CurrentOrders />

        )}

        {showProfile && (<AdminProfile
          showCurrentOrders={showCurrentOrders}
          setShowCurrentOrders={setShowCurrentOrders}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          showTabs={showTabs}
          setShowTabs={setShowTabs}
        />
        )}

        {showInventory && (<Inventory

        />
        )}

        {showWorkersList && (<WorkersList

        />
        )}

        {showSellHistory && (<SellHistory

        />
        )}
        
      </div>
    </React.Fragment>
  );
};

export default AdminHome;