import React from "react";

const UserTable = ({ users, selectedUsers, selectUser, deleteUser, setUserToEdit, setIsFormVisible }) => {
  return (
    <table className="min-w-full bg-transparent">
      <thead>
        <tr>
          <th className="py-2">Select</th>
          <th className="py-2">ID</th>
          <th className="py-2">Name</th>
          <th className="py-2">Phone Number</th>
          <th className="py-2">Email</th>
          <th className="py-2">Hobbies</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="">
        {users.map((user, index) => (
          <tr key={user._id}>
            <td className=" px-4 py-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user)}
                onChange={() => selectUser(user)}
              />
            </td>
            <td className=" px-4 py-6 text-center">{index + 1}</td>
            <td className=" px-4 py-6 text-center">{user.name}</td>
            <td className=" px-4 py-6 text-center">{user.phone}</td>
            <td className=" px-4 py-6 text-center">{user.email}</td>
            <td className=" px-4 py-6 text-center">{user.hobbies}</td>
            <td className=" px-4 py-6">
              <div className="flex items-center justify-center h-4 box-border div-col">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 btn"
                  onClick={() => {
                    setUserToEdit(user);
                    setIsFormVisible(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded btn"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
