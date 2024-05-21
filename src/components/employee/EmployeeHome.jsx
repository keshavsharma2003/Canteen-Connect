import React, { useState, useEffect } from "react";
import axios from 'axios';
import EmployeeProfile from "./EmployeeProfile";
import Cart from "./Cart";
import Collab from "./Collab";
const EmployeeHome = (props) => {

  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showCollab, setShowCollab] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    photo: '/Assets/Icons/user.svg',
    name: '',
    email: '',
    password: '',
    permanantAddress: '',
    tempAddress: '',
    otp: '',
  });
  const [previousOrders, setPreviousOrders] = useState([]);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowCart(false);
    setShowMenu(!showMenu);
    setShowCollab(false);
  };

  const toggleCart = () => {
    setShowProfile(false);
    setShowCart(true);
    setShowMenu(false);
    setShowCollab(false);
  };

  const toggleCollab = () => {
    setShowProfile(false);
    setShowCart(false);
    setShowMenu(false);
    setShowCollab(true);
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data/Inventory.json');
        const data = response.data;
        let filteredItems = [];

        switch (activeTab) {
          case 'all':
            filteredItems = Object.values(data).flat();
            break;
          case 'fastfoods':
            filteredItems = data.filter(item => item.category === "dish");
            break;
          case 'beverages':
            filteredItems = data.filter(item => item.category === "beverage");
            break;
          case 'snacks':
            filteredItems = data.filter(item => item.category === "snack");
            break;
          case 'desserts':
            filteredItems = data.filter(item => item.category === "dessert");
            break;
          default:
            break;
        }
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [activeTab]);

  const onEmployeeLogout = () => {
    props.didLoginHappen(false);
    props.setLoggedInProfile(null);
    localStorage.clear();
  };

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("LOGGED_IN"))?.payload;
    if (storedProfile) {
      setProfile(prevProfile => ({
        ...prevProfile,
        name: storedProfile.EmployeeName || '',
        email: storedProfile.EmployeeEmail || '',
        password: storedProfile.EmployeePassword || '',
        permanantAddress: storedProfile.EmployeeAddress || '',
      }));
    }
  }, []);

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
              Hi  {profile.name}
            </h5>
          </div>
          <div>
            <div className="flex flex-row">
              <button
                className="px-4 py-2 rounded flex flex-row text-white"
                onClick={toggleCart}
              >
                <img src="/Assets/Icons/cart.svg" alt="cart" className="w-5 md:w-7 mr-2" />
                ({cartItems.length})
              </button>
              <div className="mr-2 text-center text-[#6B240C] hover:text-white bg-[#E48F45] hover:bg-[#994D1C] rounded-lg border-2 border-[#6B240C]">
                <button
                  className="font-bold w-fit h-full px-2 md:px-4 py-1"
                  onClick={onEmployeeLogout}
                  disabled={props.disabled}
                >
                  Logout &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-[#E48F45]" />
        {showCart && (<Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          handleAddToCart={handleAddToCart}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          showCart={showCart}
          setShowCart={setShowCart}
          profile={profile}
          setProfile={setProfile}
        />)}
        {showProfile && (<EmployeeProfile
          profile={profile}
          setProfile={setProfile}
          previousOrders={previousOrders}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
        )}
        {showCollab && (<Collab
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          showCollab={showCollab}
          setShowCollab={setShowCollab}
        />
        )}
        {showMenu && (<div className="w-full mx-auto py-3 my-14">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="px-4 w-full md:w-3/6 my-1">
              <button onClick={toggleCollab} className="px-4 py-1 w-full h-full text-center text-lg text-[#6B240C] hover:text-white bg-[#E48F45] hover:bg-[#994D1C] rounded-md border-2 border-[#6B240C]">
                Collaborate Order
              </button>
            </div>
            <div className="px-4 w-full md:w-3/6 my-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-[#994D1C] bg-[#F5CCA0] rounded-md h-full px-4 py-2 w-full placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
              />
            </div>
          </div>
          <div className="text-sm md:text-base flex flex-row justify-center space-x-1 md:space-x-2 lg:space-x-4 p-2">
            <button
              onClick={() => handleTabChange('all')}
              className={`${activeTab === 'all' ? 'bg-[#6B240C] text-white' : 'bg-[#E48F45] text-[#6B240C]'
                } px-3 py-2 rounded font-semibold`}
            >
              <h3>All</h3>
            </button>
            <button
              onClick={() => handleTabChange('fastfoods')}
              className={`${activeTab === 'fastfoods' ? 'bg-[#6B240C] text-white' : 'bg-[#E48F45] text-[#6B240C]'
                } px-3 py-2 rounded font-semibold`}
            >
              <div className="flex flex-row">
                <img src={`${activeTab === 'fastfoods' ? "/Assets/Icons/fastfoodActive.svg" : "/Assets/Icons/fastfood.svg"}`} alt="fastfood" className="w-3 h-3 md:w-5 md:h-5 mr-2" />
                <h3>Dishes</h3>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('beverages')}
              className={`${activeTab === 'beverages' ? 'bg-[#6B240C] text-white' : 'bg-[#E48F45] text-[#6B240C]'
                } px-3 py-2 rounded font-semibold`}
            >
              <div className="flex flex-row">
                <img src={`${activeTab === 'beverages' ? "/Assets/Icons/beverageActive.svg" : "/Assets/Icons/beverage.svg"}`} alt="beverage" className="w-3 h-3 md:w-5 md:h-5 mr-2" />
                <h3>Beverages</h3>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('snacks')}
              className={`${activeTab === 'snacks' ? 'bg-[#6B240C] text-white' : 'bg-[#E48F45] text-[#6B240C]'
                } px-3 py-2 rounded font-semibold`}
            >
              <div className="flex flex-row">
                <img src={`${activeTab === 'snacks' ? "/Assets/Icons/snackActive.svg" : "/Assets/Icons/snack.svg"}`} alt="snack" className="w-3 h-3 md:w-5 md:h-5 mr-2" />
                <h3>Snacks</h3>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('desserts')}
              className={`${activeTab === 'desserts' ? 'bg-[#6B240C] text-white' : 'bg-[#E48F45] text-[#6B240C]'
                } px-3 py-2 rounded font-semibold`}
            >
              <div className="flex flex-row">
                <img src={`${activeTab === 'desserts' ? "/Assets/Icons/dessertActive.svg" : "/Assets/Icons/dessert.svg"}`} alt="dessert" className="w-3 h-3 md:w-5 md:h-5 mr-2" />
                <h3>Desserts</h3>
              </div>
            </button>
          </div>
          <div className="w-full flex flex-row justify-center flex-wrap">
            {filteredItems.map((item, index) => (

              <div key={index} className="text-[#6B240C] w-48 m-2 p-2 border-2 border-[#6B240C] rounded-lg bg-[#F5CCA0] hover:bg-[#E48F45]">
                <img
                  src={item.picture}
                  alt={item.name}
                  className=" w-32 h-24 my-2 rounded-lg mx-auto"
                />
                <h3 className="text-center font-bold text-xl">{item.name}</h3>
                <p className="my-1">{item.description}</p>
                <h3 className="font-semibold my-1">Price : &#8377;{item.price}</h3>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`${cartItems.some(cartItem => cartItem.name === item.name) ? 'bg-transparent' : 'bg-[#E48F45]'
                    } border-2 border-[#6B240C] w-full text-center px-4 py-2 rounded my-2`}
                >
                  {cartItems.some(cartItem => cartItem.name === item.name) ? 'Added' : 'Add to Order'}
                </button>
              </div>
            ))}
          </div>
        </div>)}

      </div>
    </React.Fragment >
  );
};

export default EmployeeHome;