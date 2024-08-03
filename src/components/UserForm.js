import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./UserForm.css";
const UserForm = ({ addUser, updateUser, userToEdit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hobbies: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        hobbies: "",
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      updateUser(formData);
    } else {
      addUser(formData);
    }
    setFormData({
      name: "",
      phone: "",
      email: "",
      hobbies: "",
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className=" shadow-md rounded mb-4 card"
    >
      <div className=" bg-white p-4 rounded shadow-lg userform-inner-conatiner">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="sangharsh"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="0123456789"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="s@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hobbies</label>
            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Playing Games, Reading"

            />
          </div>
          <div className="flex justify-center align-center gap-4 flex-col">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded "
              style={{ width: "100%" }}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded "
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UserForm;
