import React, { useState } from 'react';

const DietPlanPage = () => {
  // Initial sample data for users
  const usersData = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 28, weight: 75, height: 175, gender: 'Male', isDietPlanSent: false, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 32, weight: 65, height: 165, gender: 'Female', isDietPlanSent: false, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, firstName: 'Sam', lastName: 'Wilson', age: 40, weight: 85, height: 180, gender: 'Male', isDietPlanSent: false, image: 'https://randomuser.me/api/portraits/men/2.jpg' }
  ];

  // State for selected user, message input, and whether the modal is open
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(usersData);

  // Handle row click to select a user
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open modal to show user details and send message
  };

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle checkbox change (mark diet plan as sent or unsent)
  const handleCheckboxChange = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isDietPlanSent: !user.isDietPlanSent } : user
      )
    );
  };

  // Simulate sending the diet plan (You would typically make an API call here)
  const handleSendDietPlan = () => {
    if (!message.trim()) {
      alert('Please enter a message before sending the diet plan.');
      return;
    }
    alert(`Diet plan sent to ${selectedUser.firstName} ${selectedUser.lastName} with message: "${message}"`);
    setIsModalOpen(false); // Close modal after sending
    setMessage(''); // Clear message input
    handleCheckboxChange(selectedUser.id); // Mark as sent
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1504634921197-1b59b465e2ba?fit=crop&w=500&h=500&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Page Content */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto bg-opacity-80">
        <h2 className="text-3xl font-semibold text-center text-green-600 mb-8">Diet Plan Assignment</h2>

        {/* Table displaying the users' data */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-6 text-left">Profile</th> {/* New Profile Image Column */}
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Age</th>
                <th className="py-3 px-6 text-left">Gender</th>
                <th className="py-3 px-6 text-left">Diet Plan Sent</th> {/* New Column */}
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b cursor-pointer hover:bg-gray-50 transition duration-300"
                  onClick={() => handleRowClick(user)}
                >
                  <td className="py-3 px-6">
                    <img src={user.image} alt="User Profile" className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="py-3 px-6">{user.firstName}</td>
                  <td className="py-3 px-6">{user.lastName}</td>
                  <td className="py-3 px-6">{user.age}</td>
                  <td className="py-3 px-6">{user.gender}</td>
                  <td className="py-3 px-6">
                    <input
                      type="checkbox"
                      checked={user.isDietPlanSent}
                      onChange={() => handleCheckboxChange(user.id)}
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                  </td>
                  <td className="py-3 px-6 text-blue-600 font-semibold">View Details</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal to show selected user's details and send a message */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all duration-500 ease-in-out scale-105">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">User Details</h3>
                <img
                  src={selectedUser.image}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <p><strong>First Name:</strong> {selectedUser.firstName}</p>
              <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Weight:</strong> {selectedUser.weight} kg</p>
              <p><strong>Height:</strong> {selectedUser.height} cm</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p>

              {/* Message input */}
              <div className="mt-4">
                <label className="block text-gray-700">Message to User</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter message..."
                  value={message}
                  onChange={handleMessageChange}
                  rows="4"
                ></textarea>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                >
                  Close
                </button>
                <button
                  onClick={handleSendDietPlan}
                  className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
                >
                  Send Diet Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlanPage;
