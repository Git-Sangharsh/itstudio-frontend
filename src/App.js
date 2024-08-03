import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { AnimatePresence } from "framer-motion";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://itstudio-backend-w55f.onrender.com/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post("https://itstudio-backend-w55f.onrender.com/api/users", user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (user) => {
    try {
      const response = await axios.put(`https://itstudio-backend-w55f.onrender.com/api/users/${user._id}`, user);
      setUsers(users.map((u) => (u._id === user._id ? response.data : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://itstudio-backend-w55f.onrender.com/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const selectUser = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const sendSelectedUsers = async () => {
    try {
      await axios.post("https://itstudio-backend-w55f.onrender.com/api/send", { selectedUsers });
      setSelectedUsers([]);
      alert("Data Sent Successfully");
    } catch (error) {
      console.error("Error sending users:", error);
    }
  };

  return (
    <div className="p-4 app-container">
      <div className="app-inner-container">

        <AnimatePresence>
          {isFormVisible && (
            <UserForm
              addUser={addUser}
              updateUser={updateUser}
              userToEdit={userToEdit}
              onClose={() => setIsFormVisible(false)}
            />
          )}
        </AnimatePresence>
        <UserTable
          users={users}
          selectedUsers={selectedUsers}
          selectUser={selectUser}
          deleteUser={deleteUser}
          setUserToEdit={setUserToEdit}
          setIsFormVisible={setIsFormVisible}
        />
        <button
          className="bg-blue-500 text-white px-4 py-4 rounded my-2"
          onClick={() => {
            setUserToEdit(null);
            setIsFormVisible(true);
          }}
          style={{ width: "100%" }}
        >
          Add New Data
        </button>
        <button
          className="bg-green-500 text-white px-4 py-4 rounded my-2"
          onClick={sendSelectedUsers}
          style={{ width: "100%" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
