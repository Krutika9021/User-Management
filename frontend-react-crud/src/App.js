import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "", address: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/api/users/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/users", form);
    }
    setForm({ name: "", contact: "", address: "", email: "" });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <button onClick={handleSubmit}>{editingId ? "Update" : "Add"} User</button>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email}) - {user.contact}, {user.address}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;