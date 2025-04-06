import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age) {
      alert("Please fill all fields!");
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:5000/api/users/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/users", formData);
    }
    setFormData({ name: "", email: "", age: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, age: user.age });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center mb-0">{editId ? "Edit User" : "Add New User"}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-success">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4 card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">User List</h4>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-3">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
