import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [showForm, setShowForm] = useState(false);
  const [showInventory, setShowInventory] = useState(true);
  const [inventories, setInventories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    picture: '',
    name: '',
    price: '',
    description: '',
    category: ''
  });
  useEffect(() => {
    fetchInventories();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowInventory(!showInventory);
  }
  const fetchInventories = async () => {
    try {
      const response = await axios.get('/data/Inventory.json');
      setInventories(response.data);
    } catch (error) {
      console.error('Error fetching inventories', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateInventory(editingId, formData);
    } else {
      await createInventory(formData);
    }
    setFormData({ picture: '', name: '', price: '', description: '', category: ''});
    setEditingId(null);
    fetchInventories();
  };

  const createInventory = async (data) => {
    try {
      await axios.post('/data/Inventory.json', data);
    } catch (error) {
      console.error('Error creating inventory', error);
    }
  };

  const updateInventory = async (id, data) => {
    try {
      await axios.put(`/data/Inventory.json/${id}`, data);
    } catch (error) {
      console.error('Error updating inventory', error);
    }
  };

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`/data/Inventory.json/${id}`);
      fetchInventories();
    } catch (error) {
      console.error('Error deleting inventory', error);
    }
  };

  const handleEditClick = (inventory) => {
    setEditingId(inventory.id);
    setFormData({
      picture: inventory.picture,
      name: inventory.name,
      price: inventory.price,
      description: inventory.description,
      category: inventory.category
    });
  };

  return (
    <React.Fragment>
      <div className="p-2 w-full text-[#6b240c]">
        {showForm && (<form onSubmit={handleFormSubmit} className="w-full md:w-3/4 lg:w-1/2 mb-6 p-3 space-y-2 backdrop-blur-lg mx-auto md:rounded-xl">
          <div className="absolute right-3 top-0 w-4 h-4">
            <button className="font-extrabold text-[#6b240c] text-4xl w-full h-full" onClick={toggleForm}>&times;</button>
          </div>
          <h2 className="text-xl font-bold pb-2 underline text-center">Inventory Form</h2>
          <label htmlFor="picture" className="block">Picture</label>
          <input
            type="text"
            name="picture"
            placeholder="Picture URL"
            value={formData.picture}
            onChange={handleInputChange}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
          <div className='flex flex-row justify-between items-center'>
          <label htmlFor="name" className="block w-1/3 font-semibold text-lg">Name :</label>
          <input
            type="text"
            name="name"
            id='name'
            placeholder="Enter Item's Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
          />
          </div>
          <div className='flex flex-row justify-between items-center'>
          <label htmlFor="price" className="block w-1/3 font-semibold text-lg">Price :</label>
          <input
            type="number"
            name="price"
            id='price'
            placeholder="Enter Items's Price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
          />
          </div>
          <div className='flex flex-row justify-between items-center'>
          <label htmlFor="description" className="block w-1/3 font-semibold text-lg">Description :</label>
          <textarea
            name="description"
            id='description'
            placeholder="Enter Item's Description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength="40"
            required
            className="w-full p-3 bg-transparent rounded-xl border-2 hover:border-[#e48f45] placeholder-[#6B240C] focus:border-[#6B240C] focus:outline-none"
          />
          </div>
          <div className='flex flex-row justify-between items-center'>
          <label htmlFor="category" className="block w-1/3 font-semibold text-lg">Category :</label>
          <div className="flex space-x-2 md:space-x-4 justify-center">
            <label>
              <input
                type="radio"
                name="category"
                value="dish"
                                checked={formData.category === "dish"}
                onChange={handleInputChange}
                className="mr-1"
              />
              Dish
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="beverage"
                checked={formData.category === "beverage"}
                onChange={handleInputChange}
                className="mr-1"
              />
              Beverage
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="snack"
                checked={formData.category === "snack"}
                onChange={handleInputChange}
                className="mr-1"
              />
              Snack
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="dessert"
                checked={formData.category === "dessert"}
                onChange={handleInputChange}
                className="mr-1"
              />
              Dessert
            </label>
          </div>
          </div>
          <button type="submit" className="block mx-auto px-4 py-2 bg-[#994D1C] hover:bg-[#6b240c] text-white rounded-md" onClick={toggleForm}>
            {editingId ? 'Update' : 'Add'} Product
          </button>
        </form>)}
        {showInventory && (<div className='w-full'>
          <div className='flex flex-row justify-between my-2'>
            <h1 className="text-2xl font-bold">Inventory List</h1>
            <button className='px-4 py-2 bg-[#994D1C] hover:bg-[#6b240c] text-white rounded-md' onClick={toggleForm}>Add Item</button>
          </div>
        <table className="min-w-full text-center bg-[#F5CCA0]">
          <thead>
            <tr>
            <th className="py-2 border-2 border-[#994D1C]">Id</th>
              <th className="py-2 border-2 border-[#994D1C]">Picture</th>
              <th className="py-2 border-2 border-[#994D1C]">Name</th>
              <th className="py-2 border-2 border-[#994D1C]">Price</th>
              <th className="py-2 border-2 border-[#994D1C]">Description</th>
              <th className="py-2 border-2 border-[#994D1C]">Category</th>
              <th className="py-2 border-2 border-[#994D1C]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory) => (
              <tr key={inventory.id} className="hover:bg-[#994D1C] hover:text-white">
                <td className="py-2 border-2 border-[#994D1C]">{inventory.id}</td>
                <td className="py-2 border-2 border-[#994D1C]"><img src={inventory.picture} alt={inventory.name} className="w-16 h-12 object-cover mx-auto" /></td>
                <td className="py-2 border-2 border-[#994D1C]">{inventory.name}</td>
                <td className="py-2 border-2 border-[#994D1C]">&#8377;{inventory.price}</td>
                <td className="py-2 border-2 border-[#994D1C]">{inventory.description}</td>
                <td className="py-2 border-2 border-[#994D1C]">{inventory.category}</td>
                <td className="py-2 border-2 border-[#994D1C]">
                  <div className='flex flex-row justify-evenly'>
                    <button
                    onClick={() => {handleEditClick(inventory); toggleForm()}}
                    className=""
                  >
                    <img src="/Assets/Icons/pencil.svg" alt="edit" className='w-5'/>
                  </button>
                  <button
                    onClick={() => deleteInventory(inventory.id)}
                    className=""
                  >
                    <img src="/Assets/Icons/delete.svg" alt="delete"  className='w-5'/>
                  </button></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>)}
        </div>
    </React.Fragment>
  );
};

export default Inventory;