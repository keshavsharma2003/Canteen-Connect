import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkersList = () => {
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
            <div className="p-4 w-full text-[#6b240c] my-14">
      <h1 className="text-2xl font-bold mb-4">Workers</h1>
      <form onSubmit={handleFormSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {editingId ? 'Update' : 'Add'} Worker
        </button>
      </form>
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
    </div>
    </React.Fragment>
  );
};

export default WorkersList;