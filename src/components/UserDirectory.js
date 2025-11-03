import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterUsers = useCallback(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h1>Annuaire d'utilisateurs</h1>
      {/* <p>
        <strong>Page 1 (avec Hooks)</strong> |{" "}
        <Link to="/page2">Aller à Page 2 (avec Classes)</Link>
      </p> */}

      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Société</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && <p>Aucun utilisateur trouvé.</p>}
    </div>
  );
}

export default UserDirectory;
