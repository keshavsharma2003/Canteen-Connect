import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
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

  const fetchInventories = async () => {
    try {
      const response = await axios.get('/data/inventory.json');
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
      await axios.post('/data/inventory', data);
    } catch (error) {
      console.error('Error creating inventory', error);
    }
  };

  const updateInventory = async (id, data) => {
    try {
      await axios.put(`/data/inventory/${id}`, data);
    } catch (error) {
      console.error('Error updating inventory', error);
    }
  };

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`/data/inventory/${id}`);
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
      <div className="w-full text-[#6b240c] my-14 p-4">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <form onSubmit={handleFormSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            name="picture"
            placeholder="Picture URL"
            value={formData.picture}
            onChange={handleInputChange}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength="40"
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex space-x-2 md:space-x-4">
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
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {editingId ? 'Update' : 'Add'} Product
          </button>
        </form>
        <table className="min-w-full text-center bg-[#F5CCA0]">
          <thead>
            <tr>
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
                <td className="py-2 border-2 border-[#994D1C]"><img src={inventory.picture} alt={inventory.name} className="w-16 h-12 object-cover mx-auto" /></td>
                <td className="py-2 border-2 border-[#994D1C]">{inventory.name}</td>
                <td className="py-2 border-2 border-[#994D1C]">&#8377;{inventory.price}</td>
                <td className="py-2 border-2 border-[#994D1C]">{inventory.description}</td>
                <td className="py-2 border-2 border-[#994D1C]">{inventory.category}</td>
                <td className="py-2 border-2 border-[#994D1C]">
                  <div className='flex flex-row justify-evenly'>
                    <button
                    onClick={() => handleEditClick(inventory)}
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
      </div>
    </React.Fragment>
  );
};

export default Inventory;