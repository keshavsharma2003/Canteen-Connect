import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkersList = () => {
  const [showForm, setShowForm] = useState(false);
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

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('/api/workers');
      setWorkers(response.data);
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
      await axios.post('/api/workers', data);
    } catch (error) {
      console.error('Error creating worker', error);
    }
  };

  const updateWorker = async (id, data) => {
    try {
      await axios.put(`/api/workers/${id}`, data);
    } catch (error) {
      console.error('Error updating worker', error);
    }
  };

  const deleteWorker = async (id) => {
    try {
      await axios.delete(`/api/workers/${id}`);
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
          <label className="block w-1/3 font-semibold text-lg">Photo URL :</label>
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
          />
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
            <input
              type="text"
              name="bloodGroup"
              id='bloodGroup'
              placeholder="Blood Group"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
            />
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
              <button className='px-4 py-2 bg-[#994D1C] hover:bg-[#6b240c] text-white rounded-md' onClick={toggleForm}>Add Worker</button>
            </div>
            <div className="flex flex-wrap -mx-2">
              {workers.map((worker) => (
                <div key={worker.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                  <div className="border rounded p-4">
                    <img src={worker.photo} alt={worker.name} className="w-full h-48 object-cover mb-4 rounded" />
                    <h2 className="text-xl font-bold">{worker.name}</h2>
                    <p>Email: {worker.email}</p>
                    <p>Phone: {worker.phone}</p>
                    <p>DOB: {worker.dob}</p>
                    <p>Blood Group: {worker.bloodGroup}</p>
                    <p>Address: {worker.address}</p>
                    <p>Gender: {worker.gender}</p>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleEditClick(worker)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteWorker(worker.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
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