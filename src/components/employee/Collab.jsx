import React, { useState } from 'react';

const Collab = (props) => {
  const [randomCode, setRandomCode] = useState('');
const [employeeName, setEmployeeName] = useState('');
const [employeeEmail, setEmployeeEmail] = useState('');
  const closeCollab = () => {
    props.setShowMenu(!props.showMenu);
    props.setShowCollab(!props.showCollab);
  }

  const joinCollab = () => {
    setEmployeeName(JSON.parse(localStorage.getItem("LOGGED_IN"))?.payload
      ?.EmployeeName)
    setEmployeeEmail(JSON.parse(localStorage.getItem("LOGGED_IN"))?.payload
      ?.EmployeeEmail)
  }

  const collabCodeChange = (e) => {
    setRandomCode(e.target.value);
  }

  const generateRandomCode = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    setRandomCode(code);
  };

  return (
    <React.Fragment>
      <div className="w-full md:w-3/4 lg:w-1/2 text-[#6b240c] mx-auto p-3 my-14 backdrop-blur md:border-2 md:rounded-lg">
        <div className="absolute right-1 top-0 w-4 h-4">
          <button className="font-extrabold text-white text-2xl w-full h-full" onClick={closeCollab}>&times;</button>
        </div>
        <h1 className="text-center font-semibold text-lg md:text-xl lg:text-2xl underline">Collaborate Ordering</h1>
        <div className='flex flex-row justify-evenly my-4'>
          <input
            type="text"
            value={randomCode}
            onChange={collabCodeChange}
            className='border border-[#994D1C] rounded px-2 py-1 bg-[#F5CCA0] text-[#6b240c] w-3/5 focus:border-[#6B240C] focus:outline-none'
          />
          <button onClick={generateRandomCode} className='bg-[#994D1C] hover:bg-[#6b240c] text-white px-4 py-2 rounded border-2 border-[#6b240c] w-1/5'>Generate a Code</button>
        </div>
        <div>
          <p>{employeeName} {employeeEmail}</p>
          {/* {users.map((user, index) => (
            <div key={index} className="flex items-center my-2">
              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
              <span className="ml-2">{user.name}</span>
            </div>
          ))} */}
        </div>
        <div className='flex flex-row justify-evenly'>
          <button onClick={joinCollab} className='w-2/5 bg-[#994D1C] hover:bg-[#6b240c] text-white px-4 py-2 rounded border-2 border-[#6b240c]'>Join Collaboration</button>
          <button className='w-2/5 bg-[#994D1C] hover:bg-[#6b240c] text-white px-4 py-2 rounded border-2 border-[#6b240c]'>Continue Order</button>
        </div>
      </div>
    </React.Fragment >
  );
};

export default Collab;
