import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkersList = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showWorkers, setShowWorkers] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    photo: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    bloodGroup: '',
    address: '',
    gender: ''
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowWorkers(!showWorkers);
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('/data/workers.json');
      const data = response.data;
      let filteredWorkers = [];
      filteredWorkers = Object.values(data).flat();
      setWorkers(filteredWorkers);
    } catch (error) {
      console.error('Error fetching workers', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateWorker(editingId, formData);
    } else {
      await createWorker(formData);
    }
    setFormData({
      photo: '',
      name: '',
      email: '',
      phone: '',
      dob: '',
      bloodGroup: '',
      address: '',
      gender: ''
    });
    setEditingId(null);
    fetchWorkers();
  };

  const createWorker = async (data) => {
    try {
      await axios.post('/data/workers.json', data);
    } catch (error) {
      console.error('Error creating worker', error);
    }
  };

  const updateWorker = async (id, data) => {
    try {
      await axios.put(`/data/workers.json/${id}`, data);
    } catch (error) {
      console.error('Error updating worker', error);
    }
  };

  const deleteWorker = async (id) => {
    try {
      await axios.delete(`/data/workers.json/${id}`);
      fetchWorkers();
    } catch (error) {
      console.error('Error deleting worker', error);
    }
  };

  const handleEditClick = (worker) => {
    setEditingId(worker.id);
    setFormData({
      photo: worker.photo,
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      dob: worker.dob,
      bloodGroup: worker.bloodGroup,
      address: worker.address,
      gender: worker.gender
    });
  };

  return (
    <React.Fragment>
      <div className="p-2 w-full text-[#6b240c]">
        {showForm && (<form onSubmit={handleFormSubmit} className="w-full md:w-3/4 lg:w-1/2 mb-6 p-3 space-y-2 backdrop-blur-lg mx-auto md:rounded-xl">
          <div className="absolute right-3 top-0 w-4 h-4">
            <button className="font-extrabold text-[#6b240c] text-4xl w-full h-full" onClick={toggleForm}>&times;</button>
          </div>
          <h2 className="text-xl font-bold pb-2 underline text-center">Worker Form</h2>
          <div className="flex flex-col items-center w-full">
            <img src={formData.photo} alt="worker" className="w-2/3 md:w-1/2 lg:w-1/3 h-auto rounded-3xl mb-3 border-2 border-[#6b240c] bg-[#994D1C] p-2" />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
              id="photo-upload"
              className="hidden"
              required
            />
            <button
              type="button"
              onClick={() => document.getElementById('photo-upload').click()}
              className="w-2/3 md:w-1/2 lg:w-1/3 px-3 py-2 bg-[#e48f45] rounded-full text-[#6b240c] hover:text-white text-lg font-semibold hover:bg-[#6B240C] border-2 border-[#6b240c]"
            >
              Upload Photo
            </button>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <label htmlFor='name' className="block w-1/3 font-semibold text-lg">Name :</label>
            <input
              type="text"
              name="name"
              id='name'
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            />
          </div>
          <div className='flex flex-row justify-between items-center'>
            <label htmlFor='email' className="block w-1/3 font-semibold text-lg">Email :</label>
            <input
              type="email"
              name="email"
              id='email'
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            />
          </div>
          <div className='flex flex-row justify-between items-center'>
            <label htmlFor='phone' className="block w-1/3 font-semibold text-lg">Phone :</label>
            <input
              type="text"
              name="phone"
              id='phone'
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            />
          </div>
          <div className='flex flex-row justify-between items-center'>
            <label htmlFor='dob' className="block w-1/3 font-semibold text-lg">Date of Birth :</label>
            <input
              type="date"
              name="dob"
              id='dob'
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            />
          </div>
          <div className='flex flex-row justify-between items-center'>
            <label htmlFor='bloodGroup' className="block w-1/3 font-semibold text-lg">Blood Group :</label>
            <select
              name="bloodGroup"
              id='bloodGroup'
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            >
              <option value="" disabled>Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <label htmlFor='address' className="block w-1/3 font-semibold text-lg">Address :</label>
            <textarea
              name="address"
              placeholder="Address"
              id='address'
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            />
          </div >
          <div className='flex flex-row justify-between items-center'>
            <label htmlFor="gender" className="block w-1/3 font-semibold text-lg">Gender :</label>
            <select
              name="gender"
              id='gender'
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            >
              <option value="" disabled className='text-[#6b240c] font-semibold'>Select Gender</option>
              <option value="Male" className='text-[#6b240c] font-semibold'>Male</option>
              <option value="Female" className='text-[#6b240c] font-semibold'>Female</option>
              <option value="Other" className='text-[#6b240c] font-semibold'>Other</option>
            </select>
          </div>
          <button type="submit" className="block mx-auto px-4 py-2 bg-[#994D1C] hover:bg-[#6b240c] text-white rounded-md" onClick={toggleForm}>
            {editingId ? 'Update' : 'Add'} Worker
          </button>
        </form >)
        }
        {
          showWorkers && (<div className='w-full'>
            <div className='flex flex-row justify-between my-2'>
              <h1 className="text-2xl font-bold">Workers List</h1>
              <div className="px-4 w-full md:w-3/6 my-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-[#994D1C] bg-[#F5CCA0] rounded-md h-full px-4 py-2 w-full placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
              />
            </div>
              <button className='px-4 py-2 bg-[#994D1C] hover:bg-[#6b240c] text-white rounded-md' onClick={toggleForm}>Add Worker</button>
            </div>
            <div className="flex flex-row justify-center flex-wrap">
              {filteredWorkers.map((worker) => (
                <div key={worker.id} className="w-72 border-2 rounded-lg p-2 m-2 bg-[#E48F45] hover:bg-[#994D1C] hover:text-white border-[#6b240c]">
                  <img src={worker.photo} alt={worker.name} className="w-36 h-36 mx-auto object-cover rounded-md border border-[#6b240c]" />
                  <h2 className="text-xl font-bold text-center">{worker.name}</h2>
                  <p><b>Email : </b>{worker.email}</p>
                  <p><b>Phone : </b>{worker.phone}</p>
                  <p><b>DOB : </b>{worker.dob}</p>
                  <p><b>Blood group : </b>{worker.bloodGroup}</p>
                  <p><b>Address : </b>{worker.address}</p>
                  <p><b>Gender : </b>{worker.gender}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {handleEditClick(worker); toggleForm() }}
                      className="px-2 py-1 bg-amber-600 hover:bg-amber-900 text-white rounded-lg font-bold text-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWorker(worker.id)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-900 text-white rounded-lg font-bold text-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>)
        }
      </div >
    </React.Fragment >
  );
};

export default WorkersList;