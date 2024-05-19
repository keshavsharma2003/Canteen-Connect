import React, { useState} from "react";

const Cart = (props) => {

  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [orderTime, setOrderTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const adjustedMinutes = minutes < 30 ? '00' : '30';
    return `${hours}:${adjustedMinutes}`;
  });
const closeCart = () => {
  props.setShowMenu(!props.showMenu);
  props.setShowCart(!props.showCart);
}
  const handleAddToCart = (item) => {
    const existingItem = props.cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      props.setCartItems(props.cartItems.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      props.setCartItems([...props.cartItems, { ...item, quantity: 1 }]);
    }
  };
  

  const handleRemoveFromCart = (item) => {
    const existingItem = props.cartItems.find(cartItem => cartItem.name === item.name);
      if (existingItem.quantity > 1) {
        props.setCartItems(
          props.cartItems.map(cartItem =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      } else {
        props.setCartItems(
          props.cartItems.filter(cartItem => cartItem.name !== item.name)
        );
      }
      };
  
  const totalAmount = props.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getDateOptions = () => {
    const options = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      options.push(date.toISOString().split('T')[0]);
    }
    return options;
  };

  const getTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
      options.push(`${hour}:00`, `${hour}:30`);
    }
    return options;
  };


  const handlePreOrder = () => {
    if (!orderDate || !orderTime) {
      alert('Please select a valid date and time.');
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(`${orderDate}T${orderTime}:00`);
    if (selectedDateTime < now) {
      alert('Selected date and time must be in the future.');
      return;
    }

    alert(`Order scheduled for ${orderDate} at ${orderTime}`);
    props.setCartItems([]);
    setOrderDate('');
    setOrderTime('');
  };

  return (
    <React.Fragment>
      <div className="w-full md:w-3/4 lg:w-1/2 text-[#6b240c] mx-auto py-3 my-14 backdrop-blur md:border-2 md:rounded-lg">
        <div className="absolute right-3 top-0 w-4 h-4">
          <button className="font-extrabold text-[#6b240c] text-4xl w-full h-full" onClick={closeCart}>&times;</button>
        </div>
        <h1 className="text-center font-semibold text-lg md:text-xl lg:text-2xl underline">Your Orders List</h1>
        <div className="w-full font-semibold mx-auto">
          {props.cartItems.map((item, index) => (
            <div key={index} className="w-full flex flex-row justify-between items-center px-4 py-2 border-b-2 border-[#6b240c]">
              <div className="">
              {item.name} ({item.quantity}) - &#8377;{item.price.toFixed(2)}
              </div>
              <div>
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="bg-[#E48F45] w-8 text-white p-1 rounded-full ml-2"
                >
                  -
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#6b240c] w-8 text-white p-1 rounded-full ml-2"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 w-full font-semibold mx-auto">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="order-date" className="mr-2">Date:</label>
            <select
              id="order-date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {getDateOptions().map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="order-time" className="mr-2">Time:</label>
            <select
              id="order-time"
              value={orderTime}
              onChange={(e) => setOrderTime(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {getTimeOptions().map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total: &#8377;{totalAmount.toFixed(2)}</span>
            <button
              className="bg-[#994D1C] hover:bg-[#6b240c] text-white px-4 py-2 rounded"
              onClick={handlePreOrder}
            >
              Schedule Order
            </button>
          </div>
        </div>
      </div>
    </React.Fragment >
  );
};

export default Cart;